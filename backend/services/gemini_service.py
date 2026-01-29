import os
import json
from google import genai
from google.genai import types

# Prompt para análise de email
ANALYZE_EMAIL_INSTRUCTIONS = """
### ROLE
You are an expert AI email analyst for a corporate recruitment challenge. Your goal is to classify emails strictly according to specific rules, determine the necessity of a reply (urgency), and suggest professional responses.

### INPUT DATA
1. **Custom Categories List:** [{custom_categories_list}]
   *(If this list contains 'None' or is empty, ignore Custom Category rules).*

### CLASSIFICATION PROTOCOL (EXECUTE IN ORDER)

**STEP 1: Custom Category Check (PRIORITY 1)**
- Read the email content. Does it strictly match any topic in the "Custom Categories List"?
- **IF YES:**
  - `category`: Use the exact name from the custom list (Simplify to Title Case if too long).
  - Determine `urgency` based on the content's need for a reply (0.0 to 100.0).
  - **STOP** and generate output.
- **IF NO:** Proceed to STEP 2.

**STEP 2: Binary Classification (Produtivo vs Improdutivo)**
- Apply the following definitions STRICTLY from the job specification:
  - **Produtivo**: Emails that REQUIRE a specific action or response (e.g., tech support requests, updates on open cases, system questions, scheduling).
  - **Improdutivo**: Emails that DO NOT require immediate action or are merely informational/social (e.g., thank you notes, congratulations, simple receipts, spam).

**STEP 3: Urgency Calculation (Synchronization Rule)**
- You must calculate `urgency` (float 0.0 - 100.0) based EXCLUSIVELY on the necessity of sending a reply email.
- **RULE FOR 'Improdutivo':** If category is 'Improdutivo', `urgency` MUST be **0.0**. (No reply needed = No urgency).
- **RULE FOR 'Produtivo':** If category is 'Produtivo', `urgency` must be between **10.0 and 100.0**, depending on the tone:
  - Low priority question: 10.0 - 40.0
  - Standard request: 40.0 - 70.0
  - Critical/ASAP/Angry client: 70.0 - 100.0

### OUTPUT FORMAT RULES
Return ONLY a raw JSON object. No markdown.

1. **category**: String. Either a Custom Category name, "Produtivo", or "Improdutivo".
2. **urgency**: Float (0.0 to 100.0). Follow the Synchronization Rule in Step 3.
3. **reason**: String in **PORTUGUESE**. Explain clearly why it fits the category. Explicitly mention if a reply is necessary or not.
4. **answerSuggestion**: String in **PORTUGUESE**. A professional response draft. If 'Improdutivo' and no reply is needed, return "Nenhuma resposta necessária." or a very brief polite acknowledgment.
5. **categoryColor**:
    - If category is "Produtivo" or "Improdutivo": value must be `null`.
    - If category is Custom: Provide a random colorful Hex color code (e.g., "#FF5733"). Do NOT use Red or Green.
"""

REFINE_ANSWER_INSTRUCTIONS = """
You are a professional AI expert in refining answers to emails.

Refine the answer to the email based on the refine_type passed in the function parameter.
The refined answer must be in PORTUGUESE and based on the email context.
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

    formatted_categories = (
        customCategories if customCategories and customCategories.strip() else "None"
    )

    system_prompt = ANALYZE_EMAIL_INSTRUCTIONS.format(
        custom_categories_list=formatted_categories
    )

    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents=email,
        config=types.GenerateContentConfig(
            system_instruction=system_prompt,
            response_mime_type="application/json",
            temperature=0.0,
        ),
    )

    try:
        return json.loads(response.text)
    except json.JSONDecodeError:
        print(f"ERRO JSON: O modelo retornou: {response.text}")
        return {
            "category": "Erro",
            "urgency": 0.0,
            "reason": "Erro ao processar resposta da IA.",
            "answerSuggestion": "Tente novamente.",
            "categoryColor": None,
        }


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
            temperature=0.5,  # Um pouco de criatividade para refinar texto
        ),
    )

    try:
        data = json.loads(response.text)
        return data.get("refinedAnswer", response.text)
    except json.JSONDecodeError:
        return curr_answer
