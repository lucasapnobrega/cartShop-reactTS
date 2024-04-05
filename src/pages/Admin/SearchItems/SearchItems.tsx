import { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5";
import { Item } from '../../../types/type'

import styles from './SearchItems.module.css'

interface SearchItemsProps {
  items: Item[];
  setSearchItems: React.Dispatch<React.SetStateAction<Item[]>>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

function SearchItems({ items, setSearchItems, setSearchTerm }: SearchItemsProps) {
  const [search, setSearch] = useState<string>("")

  useEffect(() => {
    const filteredItems = items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))

    setSearchItems(filteredItems)
    setSearchTerm(search)
  }, [items, search])

  return (
    <div className={styles.inputGroup}>      
      <input 
        type="text" 
        name="searchItem" 
        id="searchItem"
        className={styles.input}
        value={search}
        onChange={(ev) => setSearch(ev.target.value)}
        autoComplete='off'
      />
      
      <label 
        htmlFor="searchItem" 
        className={`${styles.label} ${search.length > 0 && styles.labelFocus}`}
      >
        Pesquisar Item
      </label>

      {search !== "" && (
        <IoClose 
          className={styles.close} 
          title='Limpar campo' 
          onClick={() => setSearch("")}
        />
      )}
    </div>
  )
}

export default SearchItems