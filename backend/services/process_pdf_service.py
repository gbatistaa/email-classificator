from fastapi import UploadFile
from pathlib import Path
from docling.document_converter import DocumentConverter


def convert_to_markdown(path: str) -> str:
    converter = DocumentConverter()
    doc = converter.convert(path).document
    return doc.export_to_markdown()


def process_pdf(file: UploadFile, file_path: Path, content: bytes):
    markdown = convert_to_markdown(file.filename)
    pdf_info = {
        "filename": file.filename,
        "saved_to": str(file_path),
        "file_type": "application/pdf",
        "file_size": str(len(content)) + " bytes",
        "file_markdown": markdown,
    }

    pdf_markdown_path = file_path.with_suffix(".md")
    pdf_markdown_path.write_text(markdown)

    return pdf_info
