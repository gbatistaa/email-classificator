import { FiFileText, FiUpload } from "react-icons/fi";

interface UploadTypeTabsProps {
  uploadType: string;
  setUploadType: (type: string) => void;
}

export default function UploadTypeTabs({
  uploadType,
  setUploadType,
}: UploadTypeTabsProps) {
  return (
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
  );
}
