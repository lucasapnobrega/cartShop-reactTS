import { ToastContainer } from 'react-toastify';
import { IoMdExit } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useItemsContext } from '../../contexts/ItemsContext';
import { useEffect, useState } from 'react';
import { Item } from '../../types/type';
import CardAdmin from './CardAdmin/CardAdmin';
import FormAdmin from './FormAdmin/FormAdmin';
import SearchItems from './SearchItems/SearchItems';
import FilterCategorySelect from '../../components/FilterCategorySelect/FilterCategorySelect';
import FormCategories from './FormCategories/FormCategories';
import AccordionCollapse from '../../components/AccordionCollapse/AccordionCollapse';

import styles from './Admin.module.css'
import { useLoaderContext } from '../../contexts/LoaderContext';
import Loader from '../../components/Loader/Loader';

function Admin() {
  const { items } = useItemsContext()
  const { loading } = useLoaderContext()

  const [searchItems, setSearchItems] = useState<Item[]>(items)
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>("")

  useEffect(() => {
    const filterItems = () => {
      let filtered = items

      if(selectedCategory) filtered = filtered.filter(item => item.category === selectedCategory)
      if(searchTerm) filtered = filtered.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

      setSearchItems(filtered)
    }

    filterItems()
  }, [items, selectedCategory, searchTerm])

  return (
    <main>
      <div className={`blur ${styles.containerAdmin}`}>
        <div className={styles.content}>
          <h1 className={styles.mainTitle}>Área Administrativa</h1>
          <FormAdmin itemUpdate={null}/>

          <FormCategories />
          
          <AccordionCollapse />
        </div>

        <div className={styles.currentItems}>
          {items && items.length > 0 && (
            <>
              <h1 className={styles.title}>Itens Cadastrados</h1>
              <SearchItems items={items} setSearchItems={setSearchItems} setSearchTerm={setSearchTerm}/>
              <FilterCategorySelect selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
            </>
          )}

          <div className={styles.wrapperItems}>
            {items && items.length > 0 ? searchItems.map(item => (
              <CardAdmin key={item.id} item={item}/>
            )) : loading ? (
              <Loader />
            ) : (
              <h2>Nenhum item no cadastro.</h2>
            )}

            {searchItems && searchItems.length === 0 && searchTerm && <p className='colorRed'>Não encontramos nenhum item/categoria com esse nome.</p>}
          </div>
        </div>
      </div>

      <Link to="/" className={styles.exitBtn} title='Sair da Área Administrativa'>
        <IoMdExit />
        Sair
      </Link>

      <ToastContainer
        position='top-right'
        autoClose={1250}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </main>
  )
}

export default Admin