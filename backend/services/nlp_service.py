import re
import unicodedata
import spacy


class TextProcessor:
    def __init__(self):
        try:
            self.nlp = spacy.load("pt_core_news_sm")
        except OSError:
            from spacy.cli import download

            download("pt_core_news_sm")
            self.nlp = spacy.load("pt_core_news_sm")

    def clean_text(self, text: str) -> str:
        """
        Realiza uma limpeza robusta no texto, focando em normalização
        e remoção de ruídos de conversão (PDF).
        """
        if not text:
            return ""

        # Normalização Unicode
        text = unicodedata.normalize("NFKD", text)

        # Mascara CPFs (Informação sensível)
        text = re.sub(r"\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b", "[CPF_REMOVIDO]", text)
        # Mascara E-mails (Informação sensível)
        text = re.sub(
            r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b",
            "[EMAIL_DETECTADO]",
            text,
        )

        # Remover ruídos comuns de PDF
        text = text.replace("\x0c", "")

        # Remover caracteres não imprimíveis ou estranhos
        text = re.sub(r"[^\w\s.,!?;:@áàãâéêíóôõúçÁÀÃÂÉÊÍÓÔÕÚÇ\-]", " ", text)

        # Normalizar espaços em branco
        text = re.sub(r"\s+", " ", text).strip()

        return text

    def lemmatize_and_remove_stopwords(self, text: str) -> str:
        doc = self.nlp(text)

        # Filtrar stopwords, pontuações e espaços, e pega o "lema" (raiz) da palavra
        tokens = [
            token.lemma_ for token in doc if not token.is_stop and not token.is_punct
        ]

        return " ".join(tokens)


text_processor = TextProcessor()
