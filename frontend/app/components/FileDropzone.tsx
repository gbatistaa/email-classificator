import { FiUpload } from "react-icons/fi";

interface FileDropzoneProps {
  isDragging: boolean;
  onDragOver: (e: React.DragEvent<HTMLLabelElement>) => void;
  onDrop: (e: React.DragEvent<HTMLLabelElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLLabelElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLight?: boolean;
}

export default function FileDropzone({
  isDragging,
  onDragOver,
  onDrop,
  onDragLeave,
  onFileChange,
  isLight = false,
}: FileDropzoneProps) {
  return (
    <label
      htmlFor="file-data"
      className={`group flex flex-col justify-center items-center gap-2 h-64 ${
        isDragging
          ? isLight
            ? "shadow-[0_0_20px_#00cc6a] border-[#00cc6a] bg-[#00cc6a13]"
            : "shadow-[0_0_20px_#00FF88] border-[#00ff88] bg-[#00ff8813]"
          : isLight
            ? "border-[#e0e0e0]"
            : "border-[#2e2e2e]"
      } duration-300 ease-out ${
        isLight
          ? "hover:bg-[#f0f0f0] hover:border-[#00a855]"
          : "hover:bg-[#2c2c2c] hover:border-[#009751]"
      } border-2 border-dashed rounded-2xl w-full cursor-pointer`}
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDrop(e)}
      onDragLeave={(e) => onDragLeave(e)}
    >
      <div
        className={`flex justify-center items-center p-6 rounded-full w-fit duration-300 ease-out ${
          isLight ? "bg-[#e8e8e8]" : "bg-[#242424]"
        } ${isDragging ? (isLight ? "shadow-[0_0_20px_#00cc6a]" : "shadow-[0_0_20px_#00FF88]") : ""}`}
      >
        <FiUpload color={isLight ? "#1a1a1a" : "#f2f2f2"} size={32} />
      </div>
      <p className={isLight ? "text-[#1a1a1a]" : "text-[#f2f2f2]"}>
        Arraste e solte o arquivo ou
      </p>
      <span className={isLight ? "text-[#666666]" : "text-[#b3b3b3]"}>
        Escolha o arquivo
      </span>
      <input
        type="file"
        className="sr-only"
        name="file-data"
        id="file-data"
        onChange={(e) => onFileChange(e)}
      />
    </label>
  );
}
