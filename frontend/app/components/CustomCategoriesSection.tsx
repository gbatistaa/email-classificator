"use client";

import { IoIosArrowUp } from "react-icons/io";
import { LuTag } from "react-icons/lu";
import { CustomCategory } from "../interfaces/custom-category.interface";
import CustomCategoryItem from "./CustomCategoryItem";

interface CustomCategoriesSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  categories: CustomCategory[];
  onAddCategory: () => void;
  onUpdateCategory: (index: number, category: CustomCategory) => void;
  onRemoveCategory: (index: number) => void;
  isLight?: boolean;
}

export default function CustomCategoriesSection({
  isOpen,
  onToggle,
  categories,
  onAddCategory,
  onUpdateCategory,
  onRemoveCategory,
  isLight = false,
}: CustomCategoriesSectionProps) {
  return (
    <div
      className={`flex flex-col items-center gap-2 border border-solid rounded-2xl transition-all duration-300 ease-in-out ${
        isLight ? "border-[#e0e0e0]" : "border-[#2e2e2e]"
      }`}
    >
      <div
        className={`flex justify-between items-center p-4 transition-all cursor-pointer duration-300 ease-in-out gap-4 w-full ${
          isOpen
            ? isLight
              ? "bg-[#f0f0f0] rounded-t-2xl"
              : "bg-[#242424] rounded-t-2xl"
            : "rounded-2xl"
        } ${isLight ? "hover:bg-[#f0f0f0]" : "hover:bg-[#242424]"}`}
        onClick={onToggle}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 h-full">
            <LuTag
              className={isLight ? "text-[#00cc6a]" : "text-[#00ff88]"}
              size={24}
            />
          </div>
          <div className="flex flex-col gap-1">
            <p
              className={`font-semibold text-lg ${isLight ? "text-[#1a1a1a]" : "text-[#f2f2f2]"}`}
            >
              Categorias Personalizadas
            </p>
            <p
              className={`text-xs ${isLight ? "text-[#666666]" : "text-[#b3b3b3]"}`}
            >
              Configure categorias adicionais de classificação
            </p>
          </div>
        </div>
        <IoIosArrowUp
          className={
            `transition-all duration-300 ease-in-out ${isLight ? "text-[#666666]" : "text-[#b3b3b3]"} ` +
            (isOpen ? "-rotate-180" : "")
          }
          size={24}
        />
      </div>
      {isOpen && (
        <div className="flex flex-col gap-4 p-4 w-full">
          {/* Cards fixos de categorias padrão */}
          <div className="flex sm:flex-row flex-col gap-2">
            <div
              className={`flex flex-1 items-center gap-2 px-4 py-3 border rounded-2xl ${
                isLight
                  ? "bg-[#00cc6a]/10 border-[#00cc6a]/30"
                  : "bg-[#00ff88]/10 border-[#00ff88]/30"
              }`}
            >
              <div
                className={`rounded-full w-2.5 h-2.5 ${isLight ? "bg-[#00cc6a]" : "bg-[#00ff88]"}`}
              ></div>
              <div className="flex flex-col">
                <span
                  className={`font-semibold text-sm ${isLight ? "text-[#00cc6a]" : "text-[#00ff88]"}`}
                >
                  Produtivo
                </span>
                <span
                  className={`text-xs ${isLight ? "text-[#666666]" : "text-[#b3b3b3]"}`}
                >
                  Padrão • Não removível
                </span>
              </div>
            </div>
            <div className="flex flex-1 items-center gap-2 bg-red-500/10 px-4 py-3 border border-red-500/30 rounded-2xl">
              <div className="bg-red-500 rounded-full w-2.5 h-2.5"></div>
              <div className="flex flex-col">
                <span className="font-semibold text-red-500 text-sm">
                  Improdutivo
                </span>
                <span
                  className={`text-xs ${isLight ? "text-[#666666]" : "text-[#b3b3b3]"}`}
                >
                  Padrão • Não removível
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {categories.length > 0 && (
              <p
                className={`font-semibold text-sm ${isLight ? "text-[#666666]" : "text-[#b3b3b3]"}`}
              >
                Categorias Customizadas ({categories.length})
              </p>
            )}
            <div className="flex flex-col gap-2">
              {categories.map((category, index) => (
                <CustomCategoryItem
                  key={index}
                  category={category}
                  onNameChange={(name) =>
                    onUpdateCategory(index, { ...category, name })
                  }
                  onDescriptionChange={(description) =>
                    onUpdateCategory(index, { ...category, description })
                  }
                  onRemove={() => onRemoveCategory(index)}
                  isLight={isLight}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            className={`flex justify-center items-center gap-2 border border-dashed rounded-2xl w-full h-12 text-sm transition-all duration-300 ease-in-out cursor-pointer ${
              isLight
                ? "border-[#e0e0e0] hover:border-[#00cc6a] text-[#666666] hover:text-[#00cc6a]"
                : "border-[#2e2e2e] hover:border-[#00ff88] text-[#b3b3b3] hover:text-[#00ff88]"
            }`}
            onClick={onAddCategory}
          >
            <span className="text-lg">+</span>
            <span>Adicionar Categoria</span>
          </button>
        </div>
      )}
    </div>
  );
}
