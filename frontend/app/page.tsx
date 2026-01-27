"use client";

import Image from "next/image";
import { useState } from "react";
import Header from "./components/Header";
import UploadTypeTabs from "./components/UploadTypeTabs";
import FileDropzone from "./components/FileDropzone";
import FilePreview from "./components/FilePreview";
import TextInput from "./components/TextInput";

export default function Home() {
  const [uploadType, setUploadType] = useState("file");
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [isDragging, setIsDragging] = useState(false);

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

  return (
    <div className="flex flex-col justify-center items-center bg-[#000a02] min-h-screen font-sans">
      <Image src="/mail-prism.png" alt="Logo" width={200} height={200} />
      <div className="flex flex-col gap-8 bg-[#171717] p-12 rounded-2xl w-2/5 h-180">
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
            <FilePreview file={file} onRemove={() => setFile(null)} />
          )}
          {uploadType === "text" && (
            <TextInput
              text={text}
              onTextChange={(e) => setText(e.target.value)}
            />
          )}
        </main>
      </div>
    </div>
  );
}
