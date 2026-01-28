<div align="center">

# ✨ MailPrism ✨

**Classificação inteligente de e-mails usando IA**

*Transforme caos em clareza — organize seus e-mails com o poder da Inteligência Artificial*

---

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)

</div>

---

## 📋 Índice

- [✨ MailPrism ✨](#-mailprism-)
  - [📋 Índice](#-índice)
  - [🚀 Sobre o Projeto](#-sobre-o-projeto)
    - [O que é um e-mail Produtivo?](#o-que-é-um-e-mail-produtivo)
    - [O que é um e-mail Improdutivo?](#o-que-é-um-e-mail-improdutivo)
  - [✨ Funcionalidades](#-funcionalidades)
  - [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [🔄 Arquitetura e Fluxo de Funcionamento](#-arquitetura-e-fluxo-de-funcionamento)
    - [Fluxo Detalhado](#fluxo-detalhado)
  - [💻 Como Executar Localmente](#-como-executar-localmente)
    - [Pré-requisitos](#pré-requisitos)
    - [Backend (Python/FastAPI)](#backend-pythonfastapi)
    - [Frontend (Next.js)](#frontend-nextjs)
  - [🔐 Variáveis de Ambiente](#-variáveis-de-ambiente)
    - [Backend (`.env`)](#backend-env)
    - [Frontend (`.env.development`)](#frontend-envdevelopment)
  - [🏢 Benefícios para Empresas e Usuários](#-benefícios-para-empresas-e-usuários)
    - [Para Empresas](#para-empresas)
    - [Para Usuários Individuais](#para-usuários-individuais)
  - [📡 API Endpoints](#-api-endpoints)
    - [`POST /analyze`](#post-analyze)
    - [`POST /analyze-text`](#post-analyze-text)
    - [`POST /refine-answer`](#post-refine-answer)
    - [`GET /`](#get-)
  - [🌟 Contribuições](#-contribuições)

---

## 🚀 Sobre o Projeto

O **MailPrism** é uma aplicação inteligente de classificação de e-mails que utiliza o poder da **Google Gemini AI** para analisar e categorizar automaticamente seus e-mails em **Produtivos** ou **Improdutivos**.

### O que é um e-mail Produtivo?
E-mails que requerem uma ação ou resposta, como:
- Solicitações de suporte
- Atualizações sobre casos abertos
- Perguntas e questionamentos

### O que é um e-mail Improdutivo?
E-mails que **não** requerem uma ação ou resposta, como:
- Congratulações
- Agradecimentos simples
- Newsletters informativas

Além da classificação, o MailPrism oferece:
- 📊 **Nível de urgência** (0-100%)
- 📝 **Análise detalhada** do contexto e intenção do remetente
- 💡 **Sugestões de resposta** profissionais geradas automaticamente
- 🎨 **Categorias personalizadas** definidas pelo usuário

---

## ✨ Funcionalidades

| Funcionalidade | Descrição |
|----------------|-----------|
| 📄 **Upload de PDF** | Faça upload de e-mails em formato PDF para análise |
| 📝 **Upload de TXT** | Suporte para arquivos de texto simples |
| ⌨️ **Entrada de Texto** | Cole o conteúdo do e-mail diretamente na interface |
| 🏷️ **Categorização Automática** | Classificação em Produtivo/Improdutivo ou categorias customizadas |
| ⚡ **Indicador de Urgência** | Porcentagem de urgência baseada no conteúdo |
| 💬 **Sugestão de Resposta** | Resposta profissional sugerida pela IA |
| ✏️ **Refinamento de Resposta** | Ajuste o tom da resposta (formal, casual, etc.) |
| 🎨 **Cores Personalizadas** | Cores automáticas para categorias customizadas |

---

## 🛠️ Tecnologias Utilizadas

### Backend

| Tecnologia | Uso |
|------------|-----|
| **Python 3.x** | Linguagem principal do backend |
| **FastAPI** | Framework web de alta performance para APIs |
| **Uvicorn** | Servidor ASGI para rodar a aplicação |
| **Docling** | Conversão de documentos PDF para Markdown |
| **Google Gemini API** | Motor de IA para análise e classificação |
| **Pydantic** | Validação de dados e schemas |

### Frontend

| Tecnologia | Uso |
|------------|-----|
| **React 19** | Biblioteca para construção de interfaces |
| **Next.js 16** | Framework React com SSR e roteamento |
| **TypeScript** | Tipagem estática para JavaScript |
| **Tailwind CSS 4** | Framework CSS utilitário |
| **Axios** | Cliente HTTP para requisições à API |
| **Sonner** | Notificações toast elegantes |
| **React Icons** | Ícones para a interface |

---

## 🔄 Arquitetura e Fluxo de Funcionamento

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              MAILPRISM FLOW                                 │
└─────────────────────────────────────────────────────────────────────────────┘

    ┌─────────────┐         ┌─────────────┐         ┌─────────────────────┐
    │   USUÁRIO   │────────▶│   NEXT.JS   │────────▶│   FASTAPI BACKEND   │
    │             │         │  FRONTEND   │  Axios  │                     │
    └─────────────┘         └─────────────┘         └──────────┬──────────┘
          │                                                     │
          │   Upload PDF/TXT                                    │
          │   ou texto                                          │
          ▼                                                     ▼
    ┌─────────────┐                                    ┌─────────────────┐
    │   Arquivo   │                                    │     DOCLING     │
    │  PDF / TXT  │                                    │  (PDF → MD)     │
    └─────────────┘                                    └────────┬────────┘
                                                                │
                                                                ▼
                                                       ┌─────────────────┐
                                                       │   GEMINI API    │
                                                       │   (Análise IA)  │
                                                       └────────┬────────┘
                                                                │
                                                                ▼
    ┌─────────────────────────────────────────────────────────────────────┐
    │                         RESPOSTA JSON                               │
    │  • category: "Produtivo" | "Improdutivo" | Custom                   │
    │  • urgency: 0.0 - 100.0                                             │
    │  • reason: Análise detalhada em português                           │
    │  • answerSuggestion: Sugestão de resposta profissional              │
    │  • categoryColor: Cor hex para categorias customizadas              │
    └─────────────────────────────────────────────────────────────────────┘
```

### Fluxo Detalhado

1. **Entrada do Usuário**
   - O usuário faz upload de um arquivo PDF/TXT ou cola o texto do e-mail diretamente
   - Opcionalmente, define categorias personalizadas com nome e descrição

2. **Processamento no Frontend (Next.js)**
   - A interface captura o arquivo ou texto
   - Cria um `FormData` com o arquivo e categorias personalizadas
   - Envia via Axios para o backend FastAPI

3. **Processamento no Backend (FastAPI)**
   - **Para PDFs**: O Docling converte o documento para Markdown
   - **Para TXT**: O conteúdo é lido diretamente como UTF-8
   - O texto processado é enviado para a API do Gemini

4. **Análise pela IA (Google Gemini)**
   - A Gemini analisa o conteúdo do e-mail
   - Classifica em Produtivo/Improdutivo ou categoria customizada
   - Calcula o nível de urgência
   - Gera uma análise detalhada e sugestão de resposta

5. **Resposta ao Usuário**
   - O frontend exibe a classificação com indicador visual
   - Mostra a barra de urgência
   - Apresenta a análise detalhada e sugestão de resposta

---

## 💻 Como Executar Localmente

### Pré-requisitos

- **Python 3.10+** instalado
- **Node.js 18+** instalado
- **npm** ou **yarn**
- Uma **chave de API do Google Gemini** ([Obter aqui](https://aistudio.google.com/app/apikey))

---

### Backend (Python/FastAPI)

1. **Navegue até a pasta do backend**
   ```bash
   cd backend
   ```

2. **Crie e ative o ambiente virtual**
   ```bash
   # Criar o ambiente virtual
   python -m venv .venv

   # Ativar no Linux/macOS
   source .venv/bin/activate

   # Ativar no Windows (PowerShell)
   .\.venv\Scripts\Activate.ps1

   # Ativar no Windows (CMD)
   .\.venv\Scripts\activate.bat
   ```

3. **Instale as dependências**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure as variáveis de ambiente**
   ```bash
   # Crie o arquivo .env
   cp .env.example .env

   # Edite o arquivo e adicione sua chave do Gemini
   # GEMINI_API_KEY=sua_chave_aqui
   ```

5. **Execute o servidor**
   ```bash
   uvicorn controllers.main:app --reload
   ```

   O backend estará disponível em: `http://localhost:8000`

---

### Frontend (Next.js)

1. **Navegue até a pasta do frontend**
   ```bash
   cd frontend
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   # Verifique o arquivo .env.development
   # Deve conter:
   # NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. **Execute o servidor de desenvolvimento**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

   O frontend estará disponível em: `http://localhost:3000`

---

## 🔐 Variáveis de Ambiente

### Backend (`.env`)

| Variável | Descrição | Obrigatório |
|----------|-----------|-------------|
| `GEMINI_API_KEY` | Chave de API do Google Gemini | ✅ Sim |

### Frontend (`.env.development`)

| Variável | Descrição | Obrigatório |
|----------|-----------|-------------|
| `NEXT_PUBLIC_API_URL` | URL do backend FastAPI | ✅ Sim |

---

## 🏢 Benefícios para Empresas e Usuários

### Para Empresas

| Benefício | Impacto |
|-----------|---------|
| ⏱️ **Economia de Tempo** | Reduza em até 70% o tempo gasto triando e-mails |
| 📊 **Priorização Automática** | Foque no que realmente importa com indicadores de urgência |
| 🤖 **Respostas Padronizadas** | Mantenha consistência nas comunicações com sugestões de IA |
| 📈 **Produtividade** | Equipes mais eficientes com menos e-mails improdutivos |
| 🎯 **Categorização Personalizada** | Adapte às necessidades específicas do seu negócio |

### Para Usuários Individuais

| Benefício | Impacto |
|-----------|---------|
| 🧘 **Menos Sobrecarga** | Saiba instantaneamente quais e-mails precisam de atenção |
| 💡 **Respostas Rápidas** | Use sugestões de resposta para agilizar sua comunicação |
| 🎨 **Interface Intuitiva** | Experiência de usuário moderna e agradável |
| 📱 **Flexibilidade** | Analise PDF, TXT ou texto simples |

---

## 📡 API Endpoints

### `POST /analyze`
Analisa um arquivo PDF ou TXT.

**Request:**
```
Content-Type: multipart/form-data

file: <arquivo PDF ou TXT>
customCategories: <JSON string com categorias personalizadas>
```

**Response:**
```json
{
  "category": "Produtivo",
  "urgency": 75.5,
  "reason": "Análise detalhada do e-mail...",
  "answerSuggestion": "Prezado(a), agradeço pelo contato...",
  "categoryColor": null
}
```

---

### `POST /analyze-text`
Analisa texto puro.

**Request:**
```json
{
  "text": "Conteúdo do e-mail para análise..."
}
```

**Response:** Mesmo formato do endpoint `/analyze`

---

### `POST /refine-answer`
Refina uma sugestão de resposta.

**Request:**
```json
{
  "answer": "Texto da resposta atual",
  "refine_type": "formal | casual | empático"
}
```

**Response:**
```json
{
  "refinedAnswer": "Resposta refinada..."
}
```

---

### `GET /`
Health check do servidor (retorna ASCII art 😺).

---

<div align="center">

## 🌟 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

---

**Feito com 💚 e ☕ por desenvolvedores apaixonados**

*MailPrism • Classificação inteligente de emails*

</div>
