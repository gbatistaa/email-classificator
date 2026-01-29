interface TextInputProps {
  text: string;
  onTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isLight?: boolean;
}

export default function TextInput({
  text,
  onTextChange,
  isLight = false,
}: TextInputProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <textarea
        className={`p-4 border rounded-2xl focus:outline-none w-full h-64 text-sm duration-300 ease-out resize-none ${
          isLight
            ? "bg-[#f0f0f0] focus:shadow-[0_0_20px_#00cc6a33] border-[#e0e0e0] focus:border-[#00cc6a] text-[#1a1a1a] placeholder-[#999999]"
            : "bg-[#242424] focus:shadow-[0_0_20px_#00ff8833] border-[#2e2e2e] focus:border-[#00ff88] text-[#f2f2f2]"
        }`}
        placeholder="Digite o email aqui..."
        onChange={(e) => onTextChange(e)}
        maxLength={2000}
      />
      <span
        className={`text-xs ${isLight ? "text-[#666666]" : "text-[#b3b3b3]"}`}
      >
        {text.length}/2000 caracteres
      </span>
    </div>
  );
}
