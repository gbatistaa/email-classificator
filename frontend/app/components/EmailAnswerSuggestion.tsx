import { BiCopy } from "react-icons/bi";
import { MdChatBubbleOutline } from "react-icons/md";
import { useState } from "react";
import { toast } from "sonner";
import api from "../api/api";
import { AxiosError } from "axios";

enum RefineTone {
  Formal = "Mais formal",
  Informal = "Mais amigável",
  Shorter = "Mais curto",
  Longer = "Mais longo",
}

const refineMessages: Record<RefineTone, string> = {
  [RefineTone.Formal]: "Formalizando a resposta...",
  [RefineTone.Informal]: "Deixando mais amigável...",
  [RefineTone.Shorter]: "Resumindo a resposta...",
  [RefineTone.Longer]: "Expandindo a resposta...",
};

interface RefineAnswerResponse {
  refinedAnswer: string;
}

function EmailAnswerSuggestion({ geminiAnswer }: { geminiAnswer: string }) {
  const [answer, setAnswer] = useState(geminiAnswer);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(answer);
    toast.success("Resposta copiada com sucesso!");
  };

  const handleRefineTone = async (
    tone: RefineTone,
    displayTone: RefineTone,
  ) => {
    try {
      setLoading(true);
      setLoadingMessage(refineMessages[displayTone]);

      const refineAnswerRequest = {
        answer,
        refine_type: tone,
      };

      const { data } = await api.post<RefineAnswerResponse>(
        "/refine-answer",
        refineAnswerRequest,
      );

      setAnswer(data.refinedAnswer);
      toast.success("Resposta refinada com sucesso!");
    } catch (error) {
      if (error instanceof AxiosError) {
        const detail = error.response?.data?.detail;
        toast.error(detail || error.message);
      } else {
        toast.error("Erro ao refinar resposta");
      }
    } finally {
      setLoading(false);
      setLoadingMessage("");
    }
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
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <h2 className="font-semibold text-lg">Sugestão de resposta</h2>
            <span className="text-[#b3b3b3] text-xs">
              Edite conforme sua necessidade
            </span>
          </div>

          {/* Badge de loading */}
          {loading && (
            <div className="flex items-center gap-2 bg-[#00ff88]/10 px-3 py-1.5 rounded-full animate-pulse">
              <div className="bg-[#00ff88] rounded-full w-2 h-2 animate-ping" />
              <span className="font-medium text-white text-xs">
                {loadingMessage}
              </span>
            </div>
          )}
        </div>

        {/* Área de texto para a sugestão de resposta */}
        <div className="relative flex flex-col gap-2">
          <textarea
            className={`p-4 border rounded-2xl focus:outline-none w-full h-64 text-sm duration-300 ease-out resize-none
              ${
                loading
                  ? "bg-[#1a1a1a] border-[#2e2e2e] text-[#666666] cursor-not-allowed"
                  : "bg-[#242424] border-[#2e2e2e] focus:border-[#00ff88] focus:shadow-[0_0_20px_#00ff8833] text-[#f2f2f2]"
              }`}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            readOnly={loading}
          />
        </div>

        <div className="flex gap-4">
          <button
            className={`flex justify-center items-center gap-2 px-4 py-2 rounded-lg w-fit duration-300 ease-in-out
              ${
                loading
                  ? "bg-[#00ff88]/30 text-[#000a02]/50 cursor-not-allowed"
                  : "bg-[#00ff88] hover:shadow-[0_0_20px_#00ff88d8] text-[#000a02] cursor-pointer"
              }`}
            onClick={handleCopy}
            disabled={loading}
          >
            <BiCopy />
            <span>Copiar</span>
          </button>
          <div className="self-center bg-[#2e2e2e] w-px h-2/3"></div>
          <div className="flex items-center gap-2">
            <span className="text-[#b3b3b3] text-xs">Refinar:</span>
            {Object.values(RefineTone).map((tone) => (
              <button
                key={tone}
                className={`flex justify-center items-center gap-2 px-4 py-2 border rounded-lg w-fit text-xs text-nowrap duration-300 ease-in-out
                  ${
                    loading
                      ? "border-[#2e2e2e] text-[#666666] cursor-not-allowed"
                      : "border-[#2e2e2e] hover:border-[#00ff88] text-[#f2f2f2] hover:text-[#00ff88] cursor-pointer"
                  }`}
                onClick={() =>
                  handleRefineTone(
                    (tone as string).toLocaleLowerCase() as RefineTone,
                    tone as RefineTone,
                  )
                }
                disabled={loading}
              >
                <span>{tone}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default EmailAnswerSuggestion;
