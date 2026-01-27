import os
import json
from google import genai
from google.genai import types


INSTRUCTIONS = """
You are a professional AI expert in analyzing emails and classifying them into productive or unproductive.

Productive emails require an action or response (e.g. support requests, updates on open cases, questions).
Unproductive emails do not require an action or response (e.g. congratulations, thanks).

Return ONLY a valid JSON object with the following structure:

{
  "category": "Produtivo" | "Improdutivo" classifique com base no contexto do email se ele é necessário responder ou não respectivamente (produtivo ou improdutivo),
  "confidence": percentage of accuracy of your the classification must be json float between 0.0 and 100.0,
  "reason": "detailed explanation in portuguese"
  "answerSuggestion": "A suggestion for an answer to the sent email it have to be in portuguese and profeesional based on the email context"
}

The reason must be written in Portuguese and include:
- the context of the email
- the sender's intention
- the emotional tone or feeling of the sender
- some suggestions for action or response if that email is productive and the level of urgency of what the sender is asking for
"""


def get_client() -> genai.Client:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise RuntimeError("GEMINI_API_KEY não definida")

    return genai.Client(api_key=api_key)


def analyze_email(email: str) -> dict:
    client = get_client()

    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents=email,
        config=types.GenerateContentConfig(
            system_instruction=INSTRUCTIONS,
            response_mime_type="application/json",
        ),
    )

    try:
        return json.loads(response.text)
    except json.JSONDecodeError:
        raise RuntimeError(f"Resposta inválida do Gemini: {response.text}")
