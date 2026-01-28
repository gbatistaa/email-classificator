import { IoRemoveCircleOutline } from "react-icons/io5";
import { formatBytes } from "../utils/formatBytes";

interface FilePreviewProps {
  file: File;
  onRemove: () => void;
}

export default function FilePreview({ file, onRemove }: FilePreviewProps) {
  return (
    <div className="flex flex-col gap-2 bg-[#242424] shadow-[0_0_20px_#00ff8833] p-6 border border-[#00ff88] border-solid rounded-2xl w-full h-fit">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-[#f2f2f2]">{file.name}</p>
          <p className="text-[#b3b3b3] text-xs">{formatBytes(file.size)}</p>
        </div>
        <button
          type="button"
          onClick={() => onRemove()}
          className="group flex justify-center items-center bg-[#00ff88]/20 hover:bg-red-500/20 rounded-xl h-full aspect-square duration-300 ease-out cursor-pointer"
        >
          <IoRemoveCircleOutline
            className="text-[#00ff88] group-hover:text-[#ff0000] duration-300 ease-out"
            size={24}
          />
        </button>
      </div>
    </div>
  );
}
