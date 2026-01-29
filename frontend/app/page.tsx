"use client";

import Image from "next/image";
import { useState } from "react";
import { useAtom } from "jotai";
import { resolvedThemeAtom } from "./store/themeAtom";
import Header from "./components/Header";
import UploadTypeTabs from "./components/UploadTypeTabs";
import FileDropzone from "./components/FileDropzone";
import FilePreview from "./components/FilePreview";
import TextInput from "./components/TextInput";
import ThemeToggle from "./components/ThemeToggle";
import { BsStars } from "react-icons/bs";
import api from "./api/api";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { DNA } from "react-loader-spinner";
import EmailClassification from "./components/EmailClassification";
import EmailAnswerSuggestion from "./components/EmailAnswerSuggestion";
import { GeminiResponse } from "./interfaces/gemini-response.interface";
import { CustomCategory } from "./interfaces/custom-category.interface";
import CustomCategoriesSection from "./components/CustomCategoriesSection";
import { formatBytes } from "./utils/formatBytes";

export default function Home() {
  const [theme] = useAtom(resolvedThemeAtom);
  const isLight = theme === "light";

  const [uploadType, setUploadType] = useState("file");
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [geminiResponse, setGeminiResponse] = useState<GeminiResponse | null>(
    null,
  );
  const [customCategoriesOpen, setCustomCategoriesOpen] = useState(false);
  const [customCategories, setCustomCategories] = useState<CustomCategory[]>(
    [],
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Check file type
      if (!["application/pdf", "text/plain"].includes(selectedFile.type)) {
        toast.error(
          `Tipo de arquivo não suportado: ${selectedFile.type.split("/")[1]}`,
        );
        return;
      }

      // 10MB
      if (selectedFile.size > 1024 * 1024 * 10) {
        toast.error(
          `Arquivo muito grande (${formatBytes(selectedFile.size)})! O tamanho máximo é de 10MB.`,
        );
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const selectedFile = e.dataTransfer.files[0];
    if (selectedFile) {
      // Check file type
      if (!["application/pdf", "text/plain"].includes(selectedFile.type)) {
        toast.error(
          `Tipo de arquivo não suportado: ${selectedFile.type.split("/")[1]}`,
        );
        return;
      }

      // 10MB
      if (selectedFile.size > 1024 * 1024 * 10) {
        toast.error(
          `Arquivo muito grande ${formatBytes(selectedFile.size)}! O tamanho máximo é de 10MB.`,
        );
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleAnalyze = async () => {
    setLoading(true);
    setGeminiResponse(null);
    try {
      if (uploadType === "file") {
        // Check if file is empty
        if (!file) {
          toast.error("Campo de arquivo vazio!");
          return;
        }

        // Check if custom categories are filled
        if (customCategories.length > 0) {
          const hasEmptyCategory = customCategories.some(
            (category) => category.name.trim().length === 0,
          );
          if (hasEmptyCategory) {
            toast.error("Preencha todas as categorias personalizadas!");
            return;
          }
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("customCategories", JSON.stringify(customCategories));

        const { data } = await api.post("/analyze", formData);
        setGeminiResponse(data);

        toast.success("Análise feita com sucesso!");
      } else {
        if (text.length === 0 || !text) {
          toast.error("Não é possível analisar texto vazio!");
          return;
        }

        const { data } = await api.post("/analyze-text", { text });
        setGeminiResponse(data);
        toast.success("Análise feita com sucesso!");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const detail = error.response?.data?.detail;
        toast.error(detail || error.message);
      } else {
        toast.error("Erro ao analisar e-mail");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddCustomCategory = () => {
    setCustomCategories([...customCategories, { name: "", description: "" }]);
  };

  return (
    <div
      className={`flex flex-col justify-center items-center min-h-screen font-sans ${isLight ? "bg-[#f5f5f5]" : "bg-[#000a02]"}`}
    >
      <Image src="/mail-prism.png" alt="Logo" width={200} height={200} />
      <div
        className={`relative flex flex-col gap-8 mx-4 sm:mx-0 p-6 sm:p-8 md:p-12 rounded-2xl w-full sm:w-140 md:w-160 lg:w-180 xl:w-200 transition-all duration-300 ease-out ${isLight ? "bg-white shadow-lg" : "bg-[#171717]"}`}
      >
        {/* Theme Toggle - Top Right */}
        <div className="top-4 sm:top-6 right-4 sm:right-6 absolute">
          <ThemeToggle />
        </div>

        <Header isLight={isLight} />
        <main className="flex flex-col gap-6">
          <UploadTypeTabs
            uploadType={uploadType}
            setUploadType={setUploadType}
            isLight={isLight}
          />
          {uploadType === "file" && !file && (
            <FileDropzone
              isDragging={isDragging}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragLeave={handleDragLeave}
              onFileChange={handleFileChange}
              isLight={isLight}
            />
          )}
          {uploadType === "file" && file && (
            <div className="flex w-full h-64">
              <FilePreview
                file={file}
                onRemove={() => setFile(null)}
                isLight={isLight}
              />
            </div>
          )}
          {uploadType === "text" && (
            <TextInput
              text={text}
              onTextChange={(e) => setText(e.target.value)}
              isLight={isLight}
            />
          )}
          <CustomCategoriesSection
            isOpen={customCategoriesOpen}
            onToggle={() => setCustomCategoriesOpen(!customCategoriesOpen)}
            categories={customCategories}
            onAddCategory={handleAddCustomCategory}
            onUpdateCategory={(index, category) => {
              const newCategories = [...customCategories];
              newCategories[index] = category;
              setCustomCategories(newCategories);
            }}
            onRemoveCategory={(index) => {
              const newCategories = [...customCategories];
              newCategories.splice(index, 1);
              setCustomCategories(newCategories);
            }}
            isLight={isLight}
          />

          {/* Botão para enviar o arquivo para análise */}
          <div>
            <button
              className={`flex items-center justify-center gap-2 px-4 py-3 w-full rounded-lg duration-300 ease-in-out
                ${
                  file || text
                    ? isLight
                      ? "bg-[#00cc6a] text-white hover:shadow-[0_0_20px_#00cc6a99] cursor-pointer"
                      : "bg-[#00ff88] text-[#000a02] hover:shadow-[0_0_20px_#00ff88d8] cursor-pointer"
                    : isLight
                      ? "bg-[#00cc6a]/20 cursor-not-allowed text-[#666666]"
                      : "bg-[#00ff88]/20 cursor-not-allowed text-[#f2f2f2]"
                }
                ${loading ? "cursor-not-allowed opacity-50" : ""}
              `}
              type="button"
              onClick={() => handleAnalyze()}
              disabled={loading}
            >
              {loading ? (
                <DNA
                  visible={true}
                  ariaLabel="dna-loading"
                  dnaColorOne={isLight ? "#ffffff" : "#242424"}
                  dnaColorTwo={isLight ? "#ffffff" : "#242424"}
                  wrapperClass="h-6 w-6"
                />
              ) : (
                <>
                  <BsStars />
                </>
              )}
              <span>{loading ? "Analisando..." : "Analisar e-mail"}</span>
            </button>
          </div>
        </main>
      </div>
      {geminiResponse && (
        <>
          <EmailClassification
            geminiResponse={geminiResponse}
            isLight={isLight}
          />
          <EmailAnswerSuggestion
            geminiAnswer={geminiResponse?.answerSuggestion}
            isLight={isLight}
          />
        </>
      )}
      <footer className="flex justify-center items-center py-12">
        <p
          className={`text-sm ${isLight ? "text-[#666666]" : "text-[#b3b3b3]"}`}
        >
          MailPrism • Classificação inteligente de emails
        </p>
      </footer>
    </div>
  );
}
