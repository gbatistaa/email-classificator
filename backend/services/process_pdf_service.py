from pypdf import PdfReader
from pathlib import Path


def process_pdf(file_path: Path) -> str:

    try:
        reader = PdfReader(str(file_path))
        text_content = []

        for page in reader.pages:
            text = page.extract_text()
            if text:
                text_content.append(text)

        full_text = "\n\n".join(text_content)

        return full_text

    except Exception as e:
        raise RuntimeError(f"Falha ao processar PDF com pypdf: {e}")
