"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { getUrgencyColor } from "../utils/colorScale";

interface ProgressBarProps {
  value: number;
  useColorScale?: boolean;
  colorClass?: string;
  colorStyle?: string;
}

function ProgressBar({
  value,
  useColorScale = false,
  colorClass,
  colorStyle,
}: ProgressBarProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Garantir que o valor esteja entre 0 e 100
  const clampedValue = Math.min(100, Math.max(0, value));

  const animateTo = useCallback((targetValue: number) => {
    const duration = 2000; // 2 segundos

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function para suavizar a animação
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = easeOut * targetValue;

      setAnimatedValue(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Pequeno delay para garantir que a animação seja visível
    const timeout = setTimeout(() => {
      animateTo(clampedValue);
    }, 50);

    return () => {
      clearTimeout(timeout);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      startTimeRef.current = null;
    };
  }, [clampedValue, animateTo]);

  // Calcular cor baseada no valor animado atual
  const dynamicColor = useColorScale
    ? getUrgencyColor(animatedValue)
    : undefined;

  return (
    <div className="bg-[#b3b3b3]/30 rounded-full w-full h-2 overflow-hidden">
      <div
        className={`h-full rounded-full ${colorClass || ""}`}
        style={{
          width: `${animatedValue}%`,
          backgroundColor: dynamicColor || colorStyle,
        }}
      />
    </div>
  );
}

export default ProgressBar;
