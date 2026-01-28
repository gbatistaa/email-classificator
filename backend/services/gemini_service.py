import os
import json
from google import genai
from google.genai import types


ANALYZE_EMAIL_INSTRUCTIONS = """
You are a professional AI expert in analyzing emails and classifying them into productive or unproductive.

Productive emails require an action or response (e.g. support requests, updates on open cases, questions).
Unproductive emails do not require an action or response (e.g. congratulations, thanks).

Return ONLY a valid JSON object with the following structure:

{
    "category": "Produtivo" | "Improdutivo" | {Any of the customCategories in the customCategories parameter} classify the email based on the context of the email if it is necessary to respond or not respectively (productive or unproductive or some custom category, but if the email is productive and fits is some of the custom categories send the custom category that matches the most) is the name of the custom category is too big you can simplify in 2 words first letter of first word in uppercase and the rest in lowercase and the second word in lowercase,
    "urgency": The percentage of urgency of what the sender is asking for must be a json float between 0.0 and 100.0
    "reason": "detailed explanation in portuguese"
    "answerSuggestion": "A suggestion for an answer to the sent email it have to be in portuguese and profeesional based on the email context"
    "categoryColor": A hex color code with # in the beginning for the category must be a json string in hex format, must be a color that match with the category and isn't either red or green, if the category is Produtivo or Improdutivo send null
}

The reason must be written in Portuguese and include:
- the context of the email
- the sender's intention
- the emotional tone or feeling of the sender
- some suggestions for action or response if that email is productive and the level of urgency of what the sender is asking for
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

    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents=email,
        config=types.GenerateContentConfig(
            system_instruction=ANALYZE_EMAIL_INSTRUCTIONS + customCategories,
            response_mime_type="application/json",
        ),
    )

    try:
        return json.loads(response.text)
    except json.JSONDecodeError:
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

    print("Resposta do Gemini: ", response)

    try:
        return json.loads(response.text)
    except json.JSONDecodeError:
        raise RuntimeError(f"Resposta inválida do Gemini: {response.text}")
