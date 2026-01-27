import { PiChartLineUpBold } from "react-icons/pi";
import ProgressBar from "./ProgressBar";

function EmailClassification() {
  return (
    <article className="flex gap-8 bg-[#171717] mt-12 p-6 rounded-2xl w-2/5 transition-all duration-300 ease-out">
      <div className="flex h-full">
        <div className="flex justify-center items-center bg-[#00ff88]/20 p-3 rounded-2xl">
          <PiChartLineUpBold className="w-8 h-8 text-[#00ff88]" />
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        {/* Título e classificação */}
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-lg">Classificação do e-mail</h2>
          <p className="bg-[#00ff88]/20 px-2 py-1 rounded-2xl font-semibold text-[#00ff88] text-xs">
            Produtivo
          </p>
        </div>
        {/* Nível de confiança */}
        <div className="flex justify-between items-center">
          <span className="text-[#b3b3b3] text-sm">Nível de confiança</span>
          <span className="font-semibold text-[#f2f2f2] text-xs">97.8%</span>
        </div>
        <ProgressBar value={97.8} colorClass="bg-[#00ff88]" />
        <p className="text-[#b3b3b3] text-sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus asperiores amet laborum, dignissimos est dolorum
          accusantium possimus excepturi minus soluta omnis aliquid corrupti
          temporibus autem dolores aspernatur ipsum eaque qui.
        </p>
      </div>
    </article>
  );
}

export default EmailClassification;
