from backend.process_pdf.service import process_pdf
from _operator import concat
from fastapi import FastAPI, UploadFile, File
from pathlib import Path

app = FastAPI()

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    content = await file.read()
    file_path = UPLOAD_DIR / file.filename

    if file.content_type == "application/pdf":
        return process_pdf(file, file_path, content)

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
