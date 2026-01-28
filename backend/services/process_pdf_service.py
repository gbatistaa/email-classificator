from io import BytesIO
from pathlib import Path
from docling.document_converter import DocumentConverter


def process_pdf(file_path: Path) -> str:
    converter = DocumentConverter()
    result = converter.convert(source=file_path)
    markdown = result.document.export_to_markdown()

    pdf_markdown_path = file_path.with_suffix(".md")
    pdf_markdown_path.write_text(markdown)

    return markdown
