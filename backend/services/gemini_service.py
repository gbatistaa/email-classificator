import os
import json
from google import genai
from google.genai import types

# Prompt para análise de email refinado
ANALYZE_EMAIL_INSTRUCTIONS = """
### ROLE
You are an expert AI email analyst. Your goal is to classify emails, determine urgency, and suggest responses.

### INPUT DATA
1. **Custom Categories List:** [{custom_categories_list}]
   *(List of specific topics provided by the user. Includes Name and Description).*

### CLASSIFICATION LOGIC (EXECUTE IN ORDER)

**STEP 1: Determine Nature (Productivity Analysis)**
- Analyze the email content to determine its nature:
  - **Produtivo (Actionable):** Requires a specific action, reply, decision, support, or scheduling.
  - **Improdutivo (Non-actionable):** Merely informational, spam, receipts, social pleasantries (thank yous), or no-reply automated messages.

**STEP 2: Category Assignment (The Override Rule)**
- Compare the email content semantically with the **Custom Categories List**.
- **IF** the email content matches the *description* or *intent* of a Custom Category:
  - **FINAL CATEGORY** = The exact name of that Custom Category.
  - *Note:* This overrides "Produtivo" or "Improdutivo" labels, but you must remember the nature (Actionable/Non-actionable) for the urgency calculation.
- **ELSE (If no custom match found):**
  - **FINAL CATEGORY** = Use the result from STEP 1 ("Produtivo" or "Improdutivo").

**STEP 3: Urgency Calculation**
- Calculate `urgency` (float 0.0 - 100.0) based on the necessity of a reply and the tone.
- **Logic:**
  - If Nature is **Improdutivo** (regardless of Category name): Urgency must be **0.0 - 20.0**.
  - If Nature is **Produtivo**:
    - Low priority (can wait days): 20.1 - 40.0
    - Standard priority (routine requests, job applications, questions): 40.1 - 70.0
    - High priority (urgent bugs, angry clients, ASAP requests): 70.1 - 100.0

### OUTPUT FORMAT RULES
Return ONLY a raw JSON object.

1. **category**: String. The result from STEP 2.
2. **urgency**: Float. The result from STEP 3.
3. **reason**: String in **PORTUGUESE**. Must cover 3 points:
    - Why it fits the chosen category.
    - The sender's tone/intent.
    - **Explicitly explain why the specific urgency score was chosen** (e.g., "Urgência média pois requer agendamento, mas não é um erro crítico").
4. **answerSuggestion**: String in **PORTUGUESE**. A professional response draft based on the email context. **MANDATORY:** NEVER return `null` or an empty string. Even for 'Improdutivo' or purely informational emails, generate a polite, brief acknowledgment phrase 
5. **categoryColor**:
    - If category is "Produtivo" or "Improdutivo": value must be `null`.
    - If category is Custom: Provide a random colorful Hex color code.
"""

REFINE_ANSWER_INSTRUCTIONS = """
You are a professional AI expert in refining answers to emails.

Refine the answer to the email based on the {refine_type} but in english passed in the function parameter.
The refined answer must be in PORTUGUESE and based on the email context.
please don't add any extra information that is not in the email context. And really change the message to a new one refined

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
    instructions = REFINE_ANSWER_INSTRUCTIONS.replace("{refine_type}", refine_type)

    user_prompt = f'Text to refine: "{curr_answer}" Refinement type: "{refine_type}"'

    client = get_client()

    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents=user_prompt,
        config=types.GenerateContentConfig(
            system_instruction=instructions,
            response_mime_type="application/json",
            temperature=0.5,
        ),
    )

    try:
        data = json.loads(response.text)
        return data.get("refinedAnswer", response.text)
    except json.JSONDecodeError:
        return curr_answer
