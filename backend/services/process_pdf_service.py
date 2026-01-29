from pypandoc import convert_file
from pathlib import Path


def process_pdf(file_path: Path) -> str:
    print("Chegou no process_pdf")
    output_path = file_path.with_suffix(".md")

    try:
        convert_file(str(file_path), "markdown", outputfile=str(output_path))
        print("Convertido com sucesso")
        markdown = output_path.read_text(encoding="utf-8")
        print("Markdown lido com sucesso")
        output_path.unlink()
        print("Arquivo temporário removido com sucesso")
        return markdown

    except Exception as e:
        raise RuntimeError(f"Falha ao processar PDF com pypandoc: {e}")
