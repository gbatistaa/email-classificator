import { PiChartLineUpBold } from "react-icons/pi";
import ProgressBar from "./ProgressBar";
import { GeminiResponse } from "../interfaces/gemini-response.interface";

interface EmailClassificationProps {
  geminiResponse: GeminiResponse;
  isLight?: boolean;
}

function EmailClassification({
  geminiResponse,
  isLight = false,
}: EmailClassificationProps) {
  const isDefaultCategory =
    geminiResponse.category === "Produtivo" ||
    geminiResponse.category === "Improdutivo";

  const getCategoryBadgeClasses = () => {
    if (geminiResponse.category === "Produtivo") {
      return isLight
        ? "bg-[#00cc6a]/20 text-[#00cc6a]"
        : "bg-[#00ff88]/20 text-[#00ff88]";
    }
    if (geminiResponse.category === "Improdutivo") {
      return "bg-red-500/20 text-red-500";
    }
    return "";
  };

  const getCategoryBadgeStyles = () => {
    if (!isDefaultCategory && geminiResponse.categoryColor) {
      return {
        backgroundColor: `${geminiResponse.categoryColor}33`,
        color: geminiResponse.categoryColor,
      };
    }
    return {};
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
          <PiChartLineUpBold
            className={`w-8 h-8 ${isLight ? "text-[#00cc6a]" : "text-[#00ff88]"}`}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        {/* Título e classificação */}
        <div className="flex justify-between items-center">
          <h2
            className={`font-semibold text-lg ${isLight ? "text-[#1a1a1a]" : "text-white"}`}
          >
            Classificação do e-mail
          </h2>
          <p
            className={`px-2 py-1 rounded-2xl font-semibold text-xs ${getCategoryBadgeClasses()}`}
            style={getCategoryBadgeStyles()}
          >
            {geminiResponse.category}
          </p>
        </div>
        {/* Nível de confiança */}
        <div className="flex justify-between items-center">
          <span
            className={`text-sm ${isLight ? "text-[#666666]" : "text-[#b3b3b3]"}`}
          >
            Nível de urgência de resposta
          </span>
          <span
            className={`font-semibold text-xs ${isLight ? "text-[#1a1a1a]" : "text-[#f2f2f2]"}`}
          >
            {geminiResponse?.urgency}%
          </span>
        </div>
        <ProgressBar
          value={geminiResponse?.urgency || 0}
          useColorScale
          isLight={isLight}
        />
        <p
          className={`text-sm ${isLight ? "text-[#666666]" : "text-[#b3b3b3]"}`}
        >
          {geminiResponse?.reason}
        </p>
      </div>
    </article>
  );
}

export default EmailClassification;
