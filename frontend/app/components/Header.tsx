interface HeaderProps {
  isLight?: boolean;
}

export default function Header({ isLight = false }: HeaderProps) {
  return (
    <header className="flex flex-col items-center gap-2">
      <h1
        className={`font-semibold text-3xl ${isLight ? "text-[#1a1a1a]" : "text-[#f2f2f2]"}`}
      >
        Classificador de Emails com IA
      </h1>
      <p className={`text-sm ${isLight ? "text-[#666666]" : "text-[#b3b3b3]"}`}>
        Analise emails automaticamente e receba sugestões de resposta
      </p>
    </header>
  );
}
