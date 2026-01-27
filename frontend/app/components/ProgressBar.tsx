"use client";

import { useEffect, useState } from "react";

interface ProgressBarProps {
  value: number;
  colorClass: string;
}

function ProgressBar({ value, colorClass }: ProgressBarProps) {
  const [width, setWidth] = useState(0);

  // Garantir que o valor esteja entre 0 e 100
  const clampedValue = Math.min(100, Math.max(0, value));

  useEffect(() => {
    // Pequeno delay para garantir que a animação seja visível
    const timeout = setTimeout(() => {
      setWidth(clampedValue);
    }, 50);

    return () => clearTimeout(timeout);
  }, [clampedValue]);

  return (
    <div className="bg-[#b3b3b3]/30 rounded-full w-full h-2 overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-2000 ease-out ${colorClass}`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

export default ProgressBar;
