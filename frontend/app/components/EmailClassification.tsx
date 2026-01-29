import { PiChartLineUpBold } from "react-icons/pi";
import ProgressBar from "./ProgressBar";
import { GeminiResponse } from "../interfaces/gemini-response.interface";

function EmailClassification({
  geminiResponse,
}: {
  geminiResponse: GeminiResponse;
}) {
  const isDefaultCategory =
    geminiResponse.category === "Produtivo" ||
    geminiResponse.category === "Improdutivo";

  const getCategoryBadgeClasses = () => {
    if (geminiResponse.category === "Produtivo") {
      return "bg-[#00ff88]/20 text-[#00ff88]";
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
    <article className="flex sm:flex-row flex-col gap-4 sm:gap-8 bg-[#171717] mx-4 sm:mx-0 mt-8 sm:mt-12 p-4 sm:p-6 rounded-2xl w-full sm:w-[560px] md:w-[640px] lg:w-[720px] xl:w-[800px] transition-all duration-300 ease-out">
      <div className="flex h-full">
        <div className="flex justify-center items-center bg-[#00ff88]/20 p-3 rounded-2xl">
          <PiChartLineUpBold className="w-8 h-8 text-[#00ff88]" />
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        {/* Título e classificação */}
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-lg">Classificação do e-mail</h2>
          <p
            className={`px-2 py-1 rounded-2xl font-semibold text-xs ${getCategoryBadgeClasses()}`}
            style={getCategoryBadgeStyles()}
          >
            {geminiResponse.category}
          </p>
        </div>
        {/* Nível de confiança */}
        <div className="flex justify-between items-center">
          <span className="text-[#b3b3b3] text-sm">
            Nível de urgência de resposta
          </span>
          <span className="font-semibold text-[#f2f2f2] text-xs">
            {geminiResponse?.urgency}%
          </span>
        </div>
        <ProgressBar value={geminiResponse?.urgency || 0} useColorScale />
        <p className="text-[#b3b3b3] text-sm">{geminiResponse?.reason}</p>
      </div>
    </article>
  );
}

export default EmailClassification;
