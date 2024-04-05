import React, { SetStateAction } from "react";
import { useCategoriesContext } from "../../contexts/CategoriesContext";

interface CategorySelectProps {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<SetStateAction<string>>;
}

function FilterCategorySelect({ selectedCategory, setSelectedCategory }: CategorySelectProps) {
  const { categories } = useCategoriesContext()

  return (
    <select 
      title='Filtrar Categoria' 
      value={selectedCategory} 
      onChange={(ev) => setSelectedCategory!(ev.target.value)}
    >
      <option value="">Todos</option>
      {categories.map(category => (
        <option value={category.name} key={category.id}>{category.name}</option>
      ))}
    </select>

  )
}

export default FilterCategorySelect