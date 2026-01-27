from backend.services.process_pdf_service import process_pdf
from _operator import concat
from fastapi import FastAPI, UploadFile, File
from pathlib import Path
from dotenv import load_dotenv
from backend.services.gemini_service import analyze_email

load_dotenv()

app = FastAPI()

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    content = await file.read()
    file_path = UPLOAD_DIR / file.filename

    if file.content_type == "application/pdf":
        print("Começo do processamento do PDF")
        pdf_data = process_pdf(file, file_path, content)
        print("Fim do processamento do PDF")
        print("Análise do email pelo Gemini")
        return analyze_email(pdf_data["file_markdown"])

    file_path.write_bytes(content)
    file_info = {
        "filename": file.filename,
        "saved_to": str(file_path),
        "file_type": file.content_type,
        "file_size": concat(str(len(content)), " bytes"),
        "file_content": content.decode("utf-8"),
    }

    return file_info


@app.get("/")
def root():
    return {"status": "ok"}


# def create_item(file: UploadFile, background_tasks: BackgroundTasks):
#     background_tasks.add_task(process_file, file)
#     return {"status": "ok"}
