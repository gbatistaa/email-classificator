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

interface EmailAnswerSuggestionProps {
  geminiAnswer?: string;
  isLight?: boolean;
}

function EmailAnswerSuggestion({
  geminiAnswer,
  isLight = false,
}: EmailAnswerSuggestionProps) {
  const [answer, setAnswer] = useState(geminiAnswer);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(answer || "");
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

      setAnswer(data?.refinedAnswer);
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
    <article
      className={`flex sm:flex-row flex-col gap-4 sm:gap-8 mx-4 sm:mx-0 mt-8 sm:mt-12 p-4 sm:p-6 rounded-2xl w-full sm:w-[560px] md:w-[640px] lg:w-[720px] xl:w-[800px] transition-all duration-300 ease-out ${
        isLight ? "bg-white shadow-lg" : "bg-[#171717]"
      }`}
    >
      <div className="flex h-full">
        <div
          className={`flex justify-center items-center p-3 rounded-2xl ${
            isLight ? "bg-[#00cc6a]/20" : "bg-[#00ff88]/20"
          }`}
        >
          <MdChatBubbleOutline
            className={`w-8 h-8 ${isLight ? "text-[#00cc6a]" : "text-[#00ff88]"}`}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5 w-full">
        {/* Título e classificação */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <h2
              className={`font-semibold text-lg ${isLight ? "text-[#1a1a1a]" : "text-white"}`}
            >
              Sugestão de resposta
            </h2>
            <span
              className={`text-xs ${isLight ? "text-[#666666]" : "text-[#b3b3b3]"}`}
            >
              Edite conforme sua necessidade
            </span>
          </div>

          {/* Badge de loading */}
          {loading && (
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full animate-pulse ${
                isLight ? "bg-[#00cc6a]/10" : "bg-[#00ff88]/10"
              }`}
            >
              <div
                className={`rounded-full w-2 h-2 animate-ping ${isLight ? "bg-[#00cc6a]" : "bg-[#00ff88]"}`}
              />
              <span
                className={`font-medium text-xs ${isLight ? "text-[#1a1a1a]" : "text-white"}`}
              >
                {loadingMessage}
              </span>
            </div>
          )}
        </div>

        {/* Área de texto para a sugestão de resposta */}
        <div className="relative flex flex-col gap-2">
          <textarea
            style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}
            className={`p-4 border rounded-2xl focus:outline-none w-full h-64 text-sm duration-300 ease-out resize-none
              ${
                loading
                  ? isLight
                    ? "bg-[#f5f5f5] border-[#e0e0e0] text-[#999999] cursor-not-allowed"
                    : "bg-[#1a1a1a] border-[#2e2e2e] text-[#666666] cursor-not-allowed"
                  : isLight
                    ? "bg-[#f0f0f0] border-[#e0e0e0] focus:border-[#00cc6a] focus:shadow-[0_0_20px_#00cc6a33] text-[#1a1a1a]"
                    : "bg-[#242424] border-[#2e2e2e] focus:border-[#00ff88] focus:shadow-[0_0_20px_#00ff8833] text-[#f2f2f2]"
              }`}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            readOnly={loading}
          />
        </div>

        <div className="flex sm:flex-row flex-col gap-4">
          <button
            className={`flex justify-center items-center gap-2 px-4 py-2 rounded-lg w-full sm:w-fit duration-300 ease-in-out
              ${
                loading
                  ? isLight
                    ? "bg-[#00cc6a]/30 text-white/50 cursor-not-allowed"
                    : "bg-[#00ff88]/30 text-[#000a02]/50 cursor-not-allowed"
                  : isLight
                    ? "bg-[#00cc6a] hover:shadow-[0_0_20px_#00cc6a99] text-white cursor-pointer"
                    : "bg-[#00ff88] hover:shadow-[0_0_20px_#00ff88d8] text-[#000a02] cursor-pointer"
              }`}
            onClick={handleCopy}
            disabled={loading}
          >
            <BiCopy />
            <span>Copiar</span>
          </button>
          <div
            className={`hidden sm:block self-center w-px h-2/3 ${isLight ? "bg-[#e0e0e0]" : "bg-[#2e2e2e]"}`}
          ></div>
          <div className="flex sm:flex-row flex-col sm:items-center gap-2">
            <span
              className={`text-xs ${isLight ? "text-[#666666]" : "text-[#b3b3b3]"}`}
            >
              Refinar:
            </span>
            <div className="flex flex-wrap gap-2">
              {Object.values(RefineTone).map((tone) => (
                <button
                  key={tone}
                  className={`flex justify-center items-center gap-2 px-3 sm:px-4 py-2 border rounded-lg w-fit text-xs text-nowrap duration-300 ease-in-out
                    ${
                      loading
                        ? isLight
                          ? "border-[#e0e0e0] text-[#999999] cursor-not-allowed"
                          : "border-[#2e2e2e] text-[#666666] cursor-not-allowed"
                        : isLight
                          ? "border-[#e0e0e0] hover:border-[#00cc6a] text-[#1a1a1a] hover:text-[#00cc6a] cursor-pointer"
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
      </div>
    </article>
  );
}

export default EmailAnswerSuggestion;
