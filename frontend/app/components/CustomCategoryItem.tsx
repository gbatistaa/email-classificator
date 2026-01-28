"use client";

import { IoIosTrash } from "react-icons/io";
import { CustomCategory } from "../interfaces/custom-category.interface";

interface CustomCategoryItemProps {
  category: CustomCategory;
  onNameChange: (name: string) => void;
  onDescriptionChange: (description: string) => void;
  onRemove: () => void;
}

export default function CustomCategoryItem({
  category,
  onNameChange,
  onDescriptionChange,
  onRemove,
}: CustomCategoryItemProps) {
  return (
    <div className="flex flex-col gap-2 bg-[#242424] p-4 rounded-2xl">
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Nome da categoria"
          className="px-2 border-[#3a3a3a] border-2 focus:border-[#00ff88] rounded-2xl outline-none w-full h-12 text-[#b3b3b3] text-sm transition-all duration-300 ease-in-out"
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
        className="p-2 border-[#3a3a3a] border-2 focus:border-[#00ff88] rounded-2xl outline-none w-full h-18 text-[#b3b3b3] text-sm transition-all duration-300 ease-in-out resize-none"
        value={category.description}
        onChange={(e) => onDescriptionChange(e.target.value)}
      ></textarea>
    </div>
  );
}
