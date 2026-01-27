import { BiCopy } from "react-icons/bi";
import { MdChatBubbleOutline } from "react-icons/md";
import { useState } from "react";
import { toast } from "sonner";

function EmailAnswerSuggestion({ geminiAnswer }: { geminiAnswer: string }) {
  const [answer, setAnswer] = useState(geminiAnswer);

  const handleCopy = () => {
    navigator.clipboard.writeText(answer);
    toast.success("Resposta copiada com sucesso!");
  };

  return (
    <article className="flex gap-8 bg-[#171717] mt-12 p-6 rounded-2xl w-2/5 transition-all duration-300 ease-out">
      <div className="flex h-full">
        <div className="flex justify-center items-center bg-[#00ff88]/20 p-3 rounded-2xl">
          <MdChatBubbleOutline className="w-8 h-8 text-[#00ff88]" />
        </div>
      </div>
      <div className="flex flex-col gap-5 w-full">
        {/* Título e classificação */}
        <div className="flex flex-col">
          <h2 className="font-semibold text-lg">Sugestão de resposta</h2>
          <span className="text-[#b3b3b3] text-xs">
            Edite conforme sua necessidade
          </span>
        </div>

        {/* Área de texto para a sugestão de resposta */}
        <div className="flex flex-col gap-2">
          <textarea
            className="bg-[#242424] focus:shadow-[0_0_20px_#00ff8833] p-4 border border-[#2e2e2e] focus:border-[#00ff88] rounded-2xl focus:outline-none w-full h-64 text-[#f2f2f2] text-sm duration-300 ease-out resize-none"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
        <button
          className="flex justify-center items-center gap-2 bg-[#00ff88] hover:shadow-[0_0_20px_#00ff88d8] px-4 py-3 rounded-lg w-full text-[#000a02] duration-300 ease-in-out cursor-pointer"
          onClick={handleCopy}
        >
          <BiCopy />
          <span>Copiar resposta</span>
        </button>
      </div>
    </article>
  );
}

export default EmailAnswerSuggestion;
