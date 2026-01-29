FROM python:3.12-slim

WORKDIR /app

# Dependências de sistema
RUN apt-get update && apt-get install -y \
    libgl1 libglib2.0-0 libstdc++6 pandoc \
    && rm -rf /var/lib/apt/lists/*

# Copiar requirements e instalar direto
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# Copiar código
COPY . .

# Porta
EXPOSE 8080

# Rodar FastAPI
CMD ["gunicorn", "controllers.main:app", "-k", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8080"]
