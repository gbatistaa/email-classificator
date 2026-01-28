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
}

export default function CustomCategoriesSection({
  isOpen,
  onToggle,
  categories,
  onAddCategory,
  onUpdateCategory,
  onRemoveCategory,
}: CustomCategoriesSectionProps) {
  return (
    <div
      className={`flex flex-col items-center gap-2 border border-[#2e2e2e] border-solid rounded-2xl transition-all duration-300 ease-in-out`}
    >
      <div
        className={`flex justify-between items-center p-4 transition-all cursor-pointer duration-300 ease-in-out gap-4 w-full hover:bg-[#242424] ${isOpen ? "bg-[#242424] rounded-t-2xl" : "rounded-2xl"}`}
        onClick={onToggle}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 h-full">
            <LuTag className="text-[#00ff88]" size={24} />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-[#f2f2f2] text-lg">
              Categorias Personalizadas
            </p>
            <p className="text-[#b3b3b3] text-xs">
              Configure categorias adicionais de classificação
            </p>
          </div>
        </div>
        <IoIosArrowUp
          className={
            "text-[#b3b3b3] transition-all duration-300 ease-in-out " +
            (isOpen ? "-rotate-180" : "")
          }
          size={24}
        />
      </div>
      {isOpen && (
        <div className="flex flex-col gap-4 p-4 w-full">
          {/* Cards fixos de categorias padrão */}
          <div className="flex gap-2">
            <div className="flex flex-1 items-center gap-2 bg-[#00ff88]/10 px-4 py-3 border border-[#00ff88]/30 rounded-2xl">
              <div className="bg-[#00ff88] rounded-full w-2.5 h-2.5"></div>
              <div className="flex flex-col">
                <span className="font-semibold text-[#00ff88] text-sm">
                  Produtivo
                </span>
                <span className="text-[#b3b3b3] text-xs">
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
                <span className="text-[#b3b3b3] text-xs">
                  Padrão • Não removível
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {categories.length > 0 && (
              <p className="font-semibold text-[#b3b3b3] text-sm">
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
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            className="flex justify-center items-center gap-2 border border-[#2e2e2e] hover:border-[#00ff88] border-dashed rounded-2xl w-full h-12 text-[#b3b3b3] hover:text-[#00ff88] text-sm transition-all duration-300 ease-in-out cursor-pointer"
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
