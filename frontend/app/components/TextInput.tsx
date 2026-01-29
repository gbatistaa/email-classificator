interface TextInputProps {
  text: string;
  onTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextInput({ text, onTextChange }: TextInputProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <textarea
        className="bg-[#242424] focus:shadow-[0_0_20px_#00ff8833] p-4 border border-[#2e2e2e] focus:border-[#00ff88] rounded-2xl focus:outline-none w-full h-64 text-[#f2f2f2] text-sm duration-300 ease-out resize-none"
        placeholder="Digite o email aqui..."
        onChange={(e) => onTextChange(e)}
        maxLength={2000}
      />
      <span className="text-[#b3b3b3] text-xs">
        {text.length}/2000 caracteres
      </span>
    </div>
  );
}
