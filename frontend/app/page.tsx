"use client";

import Image from "next/image";
import { useState } from "react";
import Header from "./components/Header";
import UploadTypeTabs from "./components/UploadTypeTabs";
import FileDropzone from "./components/FileDropzone";
import FilePreview from "./components/FilePreview";
import TextInput from "./components/TextInput";
import { BsStars } from "react-icons/bs";
import api from "./api/api";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { DNA } from "react-loader-spinner";

export default function Home() {
  const [uploadType, setUploadType] = useState("file");
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
    console.log(selectedFile?.name);
    console.log(selectedFile?.size);
    console.log(selectedFile?.type);
    console.log(selectedFile?.lastModified);
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
      setFile(selectedFile);
    }
  };

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        if (file.type === "application/pdf" || file.type === "text/plain") {
          const response = await api.post("/analyze", formData);
          console.log(response);
        }

        toast.success("Análise feita com sucesso!");
      } else if (text) {
        const data = await api.post("/analyze-text", { text });
        console.log(data);

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

  return (
    <div className="flex flex-col justify-center items-center bg-[#000a02] min-h-screen font-sans">
      <Image src="/mail-prism.png" alt="Logo" width={200} height={200} />
      <div className="flex flex-col gap-8 bg-[#171717] p-12 rounded-2xl w-2/5 transition-all duration-300 ease-out">
        <Header />
        <main className="flex flex-col gap-6">
          <UploadTypeTabs
            uploadType={uploadType}
            setUploadType={setUploadType}
          />
          {uploadType === "file" && !file && (
            <FileDropzone
              isDragging={isDragging}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragLeave={handleDragLeave}
              onFileChange={handleFileChange}
            />
          )}
          {uploadType === "file" && file && (
            <div className="flex w-full h-64">
              <FilePreview file={file} onRemove={() => setFile(null)} />
            </div>
          )}
          {uploadType === "text" && (
            <TextInput
              text={text}
              onTextChange={(e) => setText(e.target.value)}
            />
          )}
          {/* Drop down customizado react-select de categorias personalizadas */}
          <div></div>

          {/* Botão para enviar o arquivo para análise */}
          <div>
            <button
              className={`flex items-center justify-center gap-2 px-4 py-3 w-full rounded-lg duration-300 ease-in-out
                ${file || text ? "bg-[#00ff88] text-[#000a02] hover:shadow-[0_0_20px_#00ff88d8] cursor-pointer" : "bg-[#00ff88]/20 cursor-not-allowed text-[#f2f2f2]"}`}
              onClick={() => handleAnalyze()}
            >
              {loading ? (
                <DNA
                  visible={true}
                  ariaLabel="dna-loading"
                  dnaColorOne="#242424"
                  dnaColorTwo="#242424"
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
    </div>
  );
}
