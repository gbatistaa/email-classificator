"use client";

import { useAtom } from "jotai";
import { themePreferenceAtom, ThemePreference } from "../store/themeAtom";
import { FiSun, FiMoon, FiMonitor } from "react-icons/fi";

export default function ThemeToggle() {
  const [preference, setPreference] = useAtom(themePreferenceAtom);

  const cycleTheme = () => {
    // Cycle: dark -> light -> system -> dark
    const order: ThemePreference[] = ["dark", "light", "system"];
    const currentIndex = order.indexOf(preference);
    const nextIndex = (currentIndex + 1) % order.length;
    setPreference(order[nextIndex]);
  };

  const getIcon = () => {
    switch (preference) {
      case "dark":
        return <FiMoon className="w-3.5 h-3.5 text-[#00ff88]" />;
      case "light":
        return <FiSun className="w-3.5 h-3.5 text-[#00cc6a]" />;
      case "system":
        return <FiMonitor className="w-3.5 h-3.5 text-[#00dd77]" />;
    }
  };

  const getPosition = () => {
    switch (preference) {
      case "dark":
        return "translate-x-0";
      case "light":
        return "translate-x-[22px]";
      case "system":
        return "translate-x-[44px]";
    }
  };

  const getLabel = () => {
    switch (preference) {
      case "dark":
        return "Tema escuro";
      case "light":
        return "Tema claro";
      case "system":
        return "Tema do sistema";
    }
  };

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className={`
        relative flex items-center w-[72px] h-7 rounded-full p-1 cursor-pointer
        transition-colors duration-300 ease-in-out
        bg-gradient-to-r from-[#00ff88] via-[#00dd77] to-[#00cc6a]
      `}
      aria-label={getLabel()}
      title={getLabel()}
    >
      {/* Background indicators */}
      <div className="absolute inset-1 flex justify-between items-center px-1.5">
        <FiMoon className="w-3 h-3 text-white/30" />
        <FiSun className="w-3 h-3 text-white/30" />
        <FiMonitor className="w-3 h-3 text-white/30" />
      </div>

      {/* Sliding ball with icon */}
      <div
        className={`
          relative flex items-center justify-center z-10
          w-5 h-5 rounded-full bg-white shadow-md
          transition-transform duration-300 ease-in-out
          ${getPosition()}
        `}
      >
        {getIcon()}
      </div>
    </button>
  );
}
