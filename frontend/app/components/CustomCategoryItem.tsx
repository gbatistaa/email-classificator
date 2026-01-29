"use client";

import { IoIosTrash } from "react-icons/io";
import { CustomCategory } from "../interfaces/custom-category.interface";

interface CustomCategoryItemProps {
  category: CustomCategory;
  onNameChange: (name: string) => void;
  onDescriptionChange: (description: string) => void;
  onRemove: () => void;
  isLight?: boolean;
}

export default function CustomCategoryItem({
  category,
  onNameChange,
  onDescriptionChange,
  onRemove,
  isLight = false,
}: CustomCategoryItemProps) {
  return (
    <div
      className={`flex flex-col gap-2 p-4 rounded-2xl ${isLight ? "bg-[#f0f0f0]" : "bg-[#242424]"}`}
    >
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Nome da categoria"
          className={`px-2 border-2 rounded-2xl outline-none w-full h-12 text-sm transition-all duration-300 ease-in-out ${
            isLight
              ? "border-[#d0d0d0] focus:border-[#00cc6a] text-[#1a1a1a] placeholder-[#999999] bg-white"
              : "border-[#3a3a3a] focus:border-[#00ff88] text-[#b3b3b3] bg-transparent"
          }`}
          value={category.name}
          onChange={(e) => onNameChange(e.target.value)}
        />
        <button
          type="button"
          className="flex justify-center items-center bg-red-500/20 rounded-2xl h-12 aspect-square text-red-500 text-sm transition-all duration-300 ease-in-out cursor-pointer"
          onClick={onRemove}
        >
          <IoIosTrash size={24} />
        </button>
      </div>
      <textarea
        name="description"
        id="description"
        placeholder="Descrição da categoria (Opcional)"
        className={`p-2 border-2 rounded-2xl outline-none w-full h-18 text-sm transition-all duration-300 ease-in-out resize-none ${
          isLight
            ? "border-[#d0d0d0] focus:border-[#00cc6a] text-[#1a1a1a] placeholder-[#999999] bg-white"
            : "border-[#3a3a3a] focus:border-[#00ff88] text-[#b3b3b3] bg-transparent"
        }`}
        value={category.description}
        onChange={(e) => onDescriptionChange(e.target.value)}
      ></textarea>
    </div>
  );
}
