from fastapi.concurrency import run_in_threadpool
from services.nlp_service import text_processor
from services.gemini_service import analyze_email


async def process_text_pipeline(raw_text: str, customCategories):
    cleaned_text = await run_in_threadpool(text_processor.clean_text, raw_text)

    lemmatized_text = await run_in_threadpool(
        text_processor.lemmatize_and_remove_stopwords, cleaned_text
    )

    # Limite de segurança
    lemmatized_text = lemmatized_text[:15000]

    return analyze_email(lemmatized_text, customCategories)
