import React, { SelectHTMLAttributes } from "react";
import { Category } from "../../types/type"

import styles from './CategorySelect.module.css'

interface CategorySelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  errorMessage?: string;
  categories: Category[];
}

export const CategorySelect = React.forwardRef<HTMLSelectElement, CategorySelectProps>(({ name, errorMessage = '', categories, ...props }, ref) => {
  const hasError = errorMessage.length > 0

  return (
    <div className={styles.selectGroup}>
      <select 
        className={hasError ? "borderRed" : ""}
        title="Selecione a categoria"
        ref={ref}
        name={name}
        {...props}
      >
        <option value="" disabled>Selecione a Categoria</option>
        {categories && categories.map(category => (
          <option value={category.name} key={category.id}>{category.name}</option>
        ))}
      </select>
      
      {hasError && <span className='colorRed'>{errorMessage}</span>}
    </div> 
  )
})