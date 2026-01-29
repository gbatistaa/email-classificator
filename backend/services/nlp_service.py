import re
import unicodedata
import spacy
from spacy.cli import download


class TextProcessor:
    def __init__(self):
        # Tenta carregar o modelo. Se falhar, força o download.
        model_name = "pt_core_news_sm"
        try:
            self.nlp = spacy.load(model_name)
        except OSError:
            print(f"Modelo {model_name} não encontrado. Baixando agora...")
            download(model_name)
            self.nlp = spacy.load(model_name)

    def clean_text(self, text: str) -> str:
        if not text:
            return ""

        # Normalização Unicode (NFKD compatibility)
        text = unicodedata.normalize("NFKD", text)

        # Mascara CPFs
        text = re.sub(r"\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b", "[CPF_REMOVIDO]", text)
        # Mascara E-mails
        text = re.sub(
            r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b",
            "[EMAIL_DETECTADO]",
            text,
        )

        # Remover ruídos comuns de PDF
        text = text.replace("\x0c", "")

        # Remover caracteres não imprimíveis ou estranhos
        text = re.sub(r"[^\w\s.,!?;:@áàãâéêíóôõúçÁÀÃÂÉÊÍÓÔÕÚÇ\-]", " ", text)

        # Normalizar espaços
        text = re.sub(r"\s+", " ", text).strip()

        return text

    def lemmatize_and_remove_stopwords(self, text: str) -> str:
        doc = self.nlp(text)

        tokens = [
            token.lemma_ for token in doc if not token.is_stop and not token.is_punct
        ]

        return " ".join(tokens)


# Instância global
text_processor = TextProcessor()
