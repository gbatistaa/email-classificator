"use client";

import Image from "next/image";
import { useState } from "react";
import { FiFileText, FiUpload } from "react-icons/fi";
import { IoRemoveCircleOutline } from "react-icons/io5";

export default function Home() {
  const [uploadType, setUploadType] = useState("file");
  const [file, setFile] = useState<File | null>(null);

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

  return (
    <div className="flex flex-col justify-center items-center bg-[#000a02] min-h-screen font-sans">
      <Image src="/mail-prism.png" alt="Logo" width={200} height={200} />
      <div className="flex flex-col gap-8 bg-[#171717] p-12 rounded-2xl w-2/5 h-180">
        <header className="flex flex-col items-center gap-2">
          <h1 className="font-semibold text-[#f2f2f2] text-3xl">
            Classificador de Emails com IA
          </h1>
          <p className="text-[#b3b3b3] text-sm">
            Analise emails automaticamente e receba sugestões de resposta
          </p>
        </header>
        <main className="flex flex-col gap-6">
          <div className="flex gap-2">
            <label
              htmlFor="file"
              className={`flex gap-2 items-center
                ${
                  uploadType === "file"
                    ? "text-[#00ff88] border-[#00ff88]"
                    : "text-[#b3b3b3] hover:text-[#f2f2f2] border-transparent"
                } cursor-pointer duration-300 ease-out px-4 py-2 border-b-2 border-solid`}
            >
              <input
                type="radio"
                name="upload-type"
                id="file"
                className="sr-only"
                value="file"
                checked={uploadType === "file"}
                onChange={(e) => setUploadType(e.target.value)}
              />
              <FiUpload />
              <span>Upload de arquivo</span>
            </label>
            <label
              htmlFor="text"
              className={`flex gap-2 items-center
                ${
                  uploadType === "text"
                    ? "text-[#00ff88] border-[#00ff88]"
                    : "text-[#b3b3b3] hover:text-[#f2f2f2] border-transparent"
                } cursor-pointer duration-300 ease-out px-4 py-2 border-b-2 border-solid`}
            >
              <input
                type="radio"
                name="upload-type"
                id="text"
                className="sr-only"
                value="text"
                checked={uploadType === "text"}
                onChange={(e) => setUploadType(e.target.value)}
              />
              <FiFileText />
              <span>Texto direto</span>
            </label>
          </div>
          {uploadType === "file" && !file && (
            <label
              htmlFor="file-data"
              className="flex flex-col justify-center items-center gap-2 p-6 border-[#2e2e2e] border-2 border-dashed rounded-2xl w-full"
            >
              <div className="flex justify-center items-center bg-[#242424] p-6 rounded-full w-fit">
                <FiUpload color="#f2f2f2" size={32} />
              </div>
              <p className="text-[#f2f2f2]">Arraste e solte o arquivo ou</p>
              <span className="text-[#b3b3b3]">Escolha o arquivo</span>
              <input
                type="file"
                className="sr-only"
                name="file-data"
                id="file-data"
                onChange={(e) => handleFileChange(e)}
              />
            </label>
          )}
          {uploadType === "file" && file && (
            <div className="flex flex-col gap-2 bg-[#242424] shadow-[0_0_20px_#00ff8833] p-6 border border-[#00ff88] border-solid rounded-2xl w-full">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[#f2f2f2] text-sm">{file.name}</p>
                  <p className="text-[#b3b3b3] text-sm">{file.size} bytes</p>
                </div>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="group flex justify-center items-center bg-[#00ff88]/20 hover:bg-red-500/20 rounded-xl h-full aspect-square duration-300 ease-out cursor-pointer"
                >
                  <IoRemoveCircleOutline
                    className="text-[#00ff88] group-hover:text-[#ff0000] duration-300 ease-out"
                    size={24}
                  />
                </button>
              </div>
            </div>
          )}
          {/* {uploadType === "text" && <textarea />} */}
        </main>
      </div>
    </div>
  );
}
