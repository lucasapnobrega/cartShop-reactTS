import { useState } from "react"
import { useCategoriesContext } from "../../contexts/CategoriesContext"
import { FaPlus, FaMinus, FaTrashCan } from "react-icons/fa6";
import { Category } from "../../types/type";

import styles from './AccordionCollapse.module.css'

function AccordionCollapse() {
  const { categories, deleteCategory } = useCategoriesContext()
  const [showCategories, setShowCategories] = useState<boolean>(false)

  const handleClick = (category: Category) => {
    deleteCategory(category)
    setShowCategories(false)
  }

  return (
    <div className={styles.accordionCategories}>
      <div className={`${styles.accordionBox} ${showCategories && styles.active}`}>
        <div 
          className={styles.title} 
          onClick={() => setShowCategories(!showCategories)}
        >
          {showCategories ? "Esconder Categorias" : "Mostrar Categorias"}
          {showCategories ? <FaMinus /> : <FaPlus />}
        </div>

        <div className={styles.content}>
          {categories && categories.length > 0 ? categories.map(category => (
            <div key={category.id} className={styles.categoryInfo}>
              <span>{category.name}</span>
              <span 
                className={styles.trashIcon} 
                onClick={() => handleClick(category)} 
                title={`Remover categoria "${category.name}"`}
              >
                <FaTrashCan />
              </span>
            </div>
          )) : (
            <p className={styles.textNotFoundCate}>Não há categorias cadastradas.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default AccordionCollapse