from fastapi import FastAPI, UploadFile, File, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from dotenv import load_dotenv
from pydantic import BaseModel
from services.process_pdf_service import process_pdf
from services.gemini_service import (
    analyze_email,
    refine_answer as refine_answer_service,
)
from services.nlp_service import text_processor

load_dotenv()

app = FastAPI()

# CORS - permitir requisições do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://mailprismai.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


# Análise de arquivo (PDF e TXT)
@app.post("/analyze")
async def analyze_file(file: UploadFile = File(...), customCategories: str = ""):
    if not file:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Arquivo não enviado")

    if file.content_type not in ("application/pdf", "text/plain"):
        raise HTTPException(
            status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            f"Tipo não suportado: {file.content_type.split('/')[1]}",
        )

    content = None
    try:
        content = await file.read()
    except Exception:
        raise HTTPException(500, "Falha ao ler o arquivo")

    file_path = UPLOAD_DIR / file.filename

    try:
        file_path.write_bytes(content)

        if file.content_type == "application/pdf":
            extracted_text = process_pdf(file_path)
            cleaned_text = text_processor.clean_text(extracted_text)
            lemmatized_text = text_processor.lemmatize_and_remove_stopwords(
                cleaned_text
            )
            return analyze_email(lemmatized_text, customCategories)

        if file.content_type == "text/plain":
            try:
                plain_text = content.decode("utf-8")
            except UnicodeDecodeError:
                raise HTTPException(422, "Arquivo TXT não está em UTF-8")
            return analyze_email(plain_text, customCategories)

    except Exception as e:
        raise HTTPException(422, f"Erro ao processar PDF: {str(e)}")


# Análise de texto
class TextAnalyzeRequest(BaseModel):
    text: str


@app.post("/analyze-text")
async def analyze_text(request: TextAnalyzeRequest):
    if not request.text or len(request.text.strip()) == 0:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Texto não enviado")

    try:
        return analyze_email(request.text)
    except Exception as e:
        raise HTTPException(422, f"Erro ao analisar texto: {str(e)}")


class RefineAnswerRequest(BaseModel):
    answer: str
    refine_type: str


@app.post("/refine-answer")
async def refine_answer(request: RefineAnswerRequest):
    if not request.answer or len(request.answer.strip()) == 0:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Resposta não enviada")

    try:
        return refine_answer_service(request.answer, request.refine_type)
    except Exception as e:
        raise HTTPException(422, f"Erro ao refinar texto: {str(e)}")


# Health check
@app.get("/")
def root():
    return """
        ____  
        o8%8888,    
      o88%8888888.  
     8'-    -:8888b   
    8'         8888  
   d8.-=. ,==-.:888b  
   >8 `~` :`~' d8888   
   88         ,88888   
   88b. `-~  ':88888  
   888b ~==~ .:88888 
   88888o--:':::8888      
   `88888| :::' 8888b  
   8888^^'       8888b  
  d888           ,%888b.   
 d88%            %%%8--'-.  
/88:.__ ,       _%-' ---  -  
    '''::===..-'   =  --.
    """
