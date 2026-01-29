import os
import json
from google import genai
from google.genai import types

ANALYZE_EMAIL_INSTRUCTIONS = """
### ROLE
You are an expert AI email analyst. Your job is to classify emails, determine urgency, and suggest responses.

### INPUT DATA
1. **Custom Categories List:** [{custom_categories_list}]
   *(If this list contains 'None' or is empty, ignore Custom Category rules).*

### CLASSIFICATION RULES (STRICT PRIORITY)
Follow these steps in order. Do not skip steps.

**STEP 1: Check Custom Categories (HIGHEST PRIORITY)**
- Analyze the email context provided by the user. Does it fit ANY of the categories provided in the "Custom Categories List" above?
- IF YES:
    - The `category` is the name of that custom category.
    - If the name is long, simplify it to 2 words (Title Case: First word Capitalized, second lowercase).
    - **STOP** classifying. Use this category. Do NOT use "Produtivo" or "Improdutivo".
- IF NO (or if the list is empty):
    - Proceed to STEP 2.

**STEP 2: General Classification (FALLBACK)**
- If and ONLY IF the email did NOT fit any passed custom category on the custom_categories_list, then classify it as:
    - **"Produtivo"**: Requires action but not fit in any of the categories, response, support, or updates.
    - **"Improdutivo"**: No action needed (e.g., pure "thank you", congratulations, spam).
    
    please do not classify as productive or unproductive if the content matches a custom category, if it does, USE IT

### OUTPUT FORMAT RULES
Return ONLY a raw JSON object. Do not include markdown code blocks (```json).

1. **category**: Result from the Classification Rules above.
2. **urgency**: Float (0.0 to 100.0).
3. **reason**: Explanation in **PORTUGUESE**. Must include context, intent, emotional tone, and justification for the category and must include a suggestion of action of the reader besides de response or not.
4. **answerSuggestion**: Professional response suggestion in **PORTUGUESE**.
5. **categoryColor**:
    - If category is "Produtivo" or "Improdutivo": value must be `null`.
    - If category is Custom: Provide a random but colorfulHex color code (e.g., "#FF5733"). Do NOT use Red or Green.
"""

REFINE_ANSWER_INSTRUCTIONS = """
You are a professional AI expert in refining answers to emails.

Refine the answer to the email based on the refine_type passed in the function parameter.
The refined answer must be in portuguese and based on the email context.
The refined vibe of the answer must be the same as in the refine_type passed in the function parameter.

Return ONLY a valid JSON object with the following structure:

{
    "refinedAnswer": "refined answer to the email"
}
"""


def get_client() -> genai.Client:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise RuntimeError("GEMINI_API_KEY não definida")
    return genai.Client(api_key=api_key)


def analyze_email(email: str, customCategories: str = "") -> dict:
    client = get_client()

    formatted_categories = customCategories if customCategories.strip() else "None"

    system_prompt = ANALYZE_EMAIL_INSTRUCTIONS.format(
        custom_categories_list=formatted_categories
    )

    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents=email,
        config=types.GenerateContentConfig(
            system_instruction=system_prompt,
            response_mime_type="application/json",
            temperature=0.1,
        ),
    )

    try:
        return json.loads(response.text)
    except json.JSONDecodeError:
        print(f"ERRO JSON: O modelo retornou: {response.text}")
        raise RuntimeError(f"Resposta inválida do Gemini: {response.text}")


def refine_answer(curr_answer: str, refine_type: str) -> str:
    user_prompt = (
        f'Texto para refinar: "{curr_answer}"\nTipo de refinamento: "{refine_type}"'
    )

    client = get_client()

    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents=user_prompt,
        config=types.GenerateContentConfig(
            system_instruction=REFINE_ANSWER_INSTRUCTIONS,
            response_mime_type="application/json",
        ),
    )

    try:
        data = json.loads(response.text)
        return data.get("refinedAnswer", response.text)
    except json.JSONDecodeError:
        raise RuntimeError(f"Resposta inválida do Gemini: {response.text}")
