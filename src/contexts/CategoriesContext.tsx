import axios from "axios";
import { ReactNode, createContext, useContext, useEffect, useState } from "react"
import { Category } from "../types/type";
import { toast } from "react-toastify";
import { useItemsContext } from "./ItemsContext";

const URL = 'http://localhost:3001/categories'

interface CategoriesContext {
  categories: Category[];
  addCategory: (category: string) => Promise<void>;
  deleteCategory: (category: Category) => void;
}

interface CategoriesProviderProps {
  children: ReactNode;
}

export const CategoriesContext = createContext({} as CategoriesContext)

export function CategoriesContextProvider({ children }: CategoriesProviderProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const { items, setItems } = useItemsContext()

  useEffect(() => {
    const getCategories = async () => {
      const response = await axios.get(URL)
      setCategories(response.data)
    }
  
    getCategories()
  }, [])

  const addCategory = async(category: string) => {
    try {
      const response = await axios.post(URL, { name: category })

      const newCategory: Category = response.data;
      setCategories(prevCategories => [...prevCategories, newCategory])

      toast.success('Categoria adicionada com sucesso!')
    } catch (error) {
      console.error(`Erro: ${error}`)
    }
  }

  const deleteCategory = async(category: Category) => {
    const itemsToDelete = items.filter(item => item.category === category.name)

    try {
      for(const item of itemsToDelete) {
        await axios.delete(`http://localhost:3001/items/${item.id}`)
        setItems(prevItems => prevItems.filter(i => i.id !== item.id))
      }

      await axios.delete(`${URL}/${category.id}`)

      setCategories(previousCategories => previousCategories.filter(categ => categ.id !== category.id))
      
      toast.success(`Categoria ${category.name} removida com sucesso!`)
    } catch (error) {
      console.error(`Erro: ${error}`)
    }
  }

  return (
    <CategoriesContext.Provider value={{ categories, addCategory, deleteCategory }}>
      {children}
    </CategoriesContext.Provider>
  )
}

export function useCategoriesContext() {
  return useContext(CategoriesContext)
}