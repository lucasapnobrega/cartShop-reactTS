import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Item } from "../types/type";
import { toast } from "react-toastify";
import axios from "axios";
import { useLoaderContext } from "./LoaderContext";

const URL = 'http://localhost:3001/items'

interface ItemsContext {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  addItem: (item: Item) => Promise<void>;
  deleteItem: (item: Item) => Promise<void>;
  getItem: (itemId: string) => Item;
  updateItem: (item: Item) => Promise<void>;
  handleStock: (itemId: string, quantity: number) => Promise<void>;
  returnStock: (itemId: string, quantity: number) => Promise<void>;
  setFlag: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ItemsProviderProps {
  children: ReactNode
}

export const ItemsContext = createContext<ItemsContext>({} as ItemsContext)

export function ItemsContextProvider({ children }: ItemsProviderProps) {
  const [items, setItems] = useState<Item[]>([])
  const [flag, setFlag] = useState<boolean>(true)
  const { handleLoading } = useLoaderContext()

  useEffect(() => {
    const getItems = async() => {
      handleLoading(true)
      const response = await axios.get(URL)
      setItems(response.data.reverse())
      handleLoading(false)
    }

    getItems()
  }, [flag])

  const handleApiRequest = async(request: Promise<any>, successMessage: string, errorMessage: string) => {
    try {
      await request
      toast.success(successMessage)
      return true
    } catch (error) {
      console.error(`Erro: ${error}`)
      toast.error(errorMessage)
      return false
    }
  }

  const addItem = async(item: Item) => {
    const success = await handleApiRequest(
      axios.post(URL, item),
      `Item ${item.name} adicionado com sucesso!`,
      `Ocorreu um erro ao adicionar o item ${item.name}.`
    )
    
    if(success) setFlag(!flag)
  }

  const deleteItem = async(item: Item) => {
    const success = await handleApiRequest(
      axios.delete(`${URL}/${item.id}`),
      `${item.name} removido com sucesso.`,
      `Erro ao remover o item ${item.name}.`
    )

    if(success) setItems(prevItems => prevItems.filter(i => i.id !== item.id))
  }

  const updateItem = async(item: Item) => {
    await handleApiRequest(
      axios.put(`${URL}/${item.id}`, item),
      `Item ${item.name} editado com sucesso!`,
      `Erro ao editar o item ${item.name}.`
    )

    setFlag(!flag)
  }

  const getItem = (itemId: string): Item => {
    return items.find(item => item.id === itemId) as Item
  }

  const handleRequestStock = async(updatedItems: Item[], itemId: string) => {
    try {
      await axios.put(`${URL}/${itemId}`, updatedItems.find(item => item.id === itemId))
      setItems(updatedItems)
    } catch (error) {
      console.error(`Erro: ${error}`)
    }
  }

  const handleStock = async(itemId: string, quantity: number) => {
    const updatedItems = items.map(item => item.id === itemId ? { ...item, stock: item.stock - quantity } : item)
    handleRequestStock(updatedItems, itemId)
  }

  const returnStock = async(itemId: string, quantity: number) => {
    const updatedItems = items.map(item => item.id === itemId ? { ...item, stock: item.stock + quantity } : item)
    handleRequestStock(updatedItems, itemId)
  }

  return (
    <ItemsContext.Provider value={{ items, setItems, deleteItem, getItem, updateItem, addItem, handleStock, returnStock, setFlag }}>
      {children}
    </ItemsContext.Provider>
  )
}

export function useItemsContext() {
  return useContext(ItemsContext)
}