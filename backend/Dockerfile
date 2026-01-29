# === STAGE 1: Builder ===
FROM python:3.11 AS builder

# Diretório de trabalho
WORKDIR /app

# Criar virtualenv
RUN python -m venv .venv

# Copiar apenas requirements para cache
COPY requirements.txt ./

# Atualiza pip e instala dependências no venv
RUN .venv/bin/pip install --upgrade pip \
    && .venv/bin/pip install --no-cache-dir -r requirements.txt

# === STAGE 2: Runtime ===
FROM python:3.11-slim

WORKDIR /app

# Instalar dependências de sistema (Pandoc e libs de OpenCV)
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    libstdc++6 \
    pandoc \
    && rm -rf /var/lib/apt/lists/*

# Copiar virtualenv do builder
COPY --from=builder /app/.venv .venv

# Copiar o código
COPY . .

# Adicionar venv ao PATH
ENV PATH="/app/.venv/bin:$PATH"

# Expor porta
EXPOSE 8080

# Comando para rodar o FastAPI com Gunicorn + Uvicorn
CMD ["gunicorn", "controllers.main:app", "-k", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8080"]
