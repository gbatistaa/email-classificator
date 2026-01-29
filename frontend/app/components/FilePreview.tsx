import { IoRemoveCircleOutline } from "react-icons/io5";
import { formatBytes } from "../utils/formatBytes";

interface FilePreviewProps {
  file: File;
  onRemove: () => void;
  isLight?: boolean;
}

export default function FilePreview({
  file,
  onRemove,
  isLight = false,
}: FilePreviewProps) {
  return (
    <div
      className={`flex flex-col gap-2 p-6 border border-solid rounded-2xl w-full h-fit ${
        isLight
          ? "bg-[#f0f0f0] shadow-[0_0_20px_#00cc6a33] border-[#00cc6a]"
          : "bg-[#242424] shadow-[0_0_20px_#00ff8833] border-[#00ff88]"
      }`}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className={isLight ? "text-[#1a1a1a]" : "text-[#f2f2f2]"}>
            {file.name}
          </p>
          <p
            className={`text-xs ${isLight ? "text-[#666666]" : "text-[#b3b3b3]"}`}
          >
            {formatBytes(file.size)}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onRemove()}
          className={`group flex justify-center items-center rounded-xl h-full aspect-square duration-300 ease-out cursor-pointer ${
            isLight
              ? "bg-[#00cc6a]/20 hover:bg-red-500/20"
              : "bg-[#00ff88]/20 hover:bg-red-500/20"
          }`}
        >
          <IoRemoveCircleOutline
            className={`duration-300 ease-out group-hover:text-[#ff0000] ${
              isLight ? "text-[#00cc6a]" : "text-[#00ff88]"
            }`}
            size={24}
          />
        </button>
      </div>
    </div>
  );
}
