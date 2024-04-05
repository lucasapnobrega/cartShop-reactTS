import { useItemsContext } from "../../contexts/ItemsContext"
import { groupItemsByCategory, sortCategories } from "../../utils/categoryUtils"
import CardItem from "../../components/CardItem/CardItem"
import scrollToTop from "../../utils/scrollToTop"

import styles from './Home.module.css'

function Home() {
  const { items } = useItemsContext()

  const itemsByCategory = groupItemsByCategory(items)
  const sortedCategories = sortCategories(itemsByCategory)

  scrollToTop()
  
  return (
    <main className="mainFlex1">
      <h1 className={styles.title}>Catálogo</h1>
      <div className={styles.wrapperCards}>
        {sortedCategories.map(([category, categoryItems]) => (
          <div key={category} className={styles.cardTest}>

            <div className={styles.titleLine}>
              <h1 className={styles.titleCategory}>{category}</h1>
              <div className={styles.line}></div>
            </div>

            <div className={styles.cardsContainer}>
              {categoryItems.map(categoryItem => (
                <CardItem key={categoryItem.id} item={categoryItem}/>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Home