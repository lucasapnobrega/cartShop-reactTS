import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { CartItem } from "../types/type";
import axios from "axios";
import { toast } from "react-toastify";
import { useItemsContext } from "./ItemsContext";

const URL = 'http://localhost:3001/cartItems'

interface CartItemsContext {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addItemToCart: (item: CartItem, quantity: number, attQuantityInCart?: boolean, increase?: boolean) => Promise<void>;
  deleteItemToCart: (item: CartItem) => Promise<void>;
  clearCart: () => Promise<void>;
}

interface CartItemsProviderProps {
  children: ReactNode;
}

export const CartItemsContext = createContext<CartItemsContext>({} as CartItemsContext)

export function CartItemsContextProvider({ children }: CartItemsProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const { handleStock, returnStock } = useItemsContext()

  useEffect(() => {
    const getItems = async() => {
      const response = await axios.get(URL)
      setCartItems(response.data)
    }
    
    getItems()
  }, [])

  const addItemToCart = async(item: CartItem, quantity: number, attQuantityInCart?: boolean, increase?: boolean) => {
    try {
      if(quantity > item.stock) {
        toast.error(`Não temos essa quantidade no estoque. Estoque atual desse item: ${item.stock}`)
        return
      }

      const hasItemInCart = cartItems.find(i => i.id === item.id)
      
      // caso seja a primeira adição do item ao carrinho
      if(!hasItemInCart) {
        await axios.post(URL, { ...item, quantity: quantity, totalPrice: item.price * quantity, category: item.category })
        setCartItems((prevItems) => [{ ...item, quantity: quantity, totalPrice: item.price * quantity }, ...prevItems])

        handleStock(item.id, quantity)
        toast.success(`Item ${item.name} adicionado com sucesso!`)
        return
      }

      // caso o item já exista no carrinho e a "adição" do item seja feita na página Home(atualizar quantidade, apenas)
      if(!attQuantityInCart) {
        const updatedItems = cartItems.map(i => i.id === item.id ? { ...i, quantity: i.quantity + quantity, totalPrice: i.price * (i.quantity + quantity) } : i)
        handleCartUpdate(item, updatedItems, quantity)

        return
      }

      // attQuantityInCart = caso o usuário esteja atualizando o quantidade do item na página Cart
      const updatedItems = cartItems.map(i => i.id === item.id ? { ...i, quantity: quantity, totalPrice: i.price * quantity } : i)
      handleCartUpdate(item, updatedItems, increase ? 1 : -1, false)
    } catch (error) {
      console.error(error)
      toast.error(`Ocorreu um erro ao adicionar o item ${item.name}`)
    }
  }

  const deleteItemToCart = async(item: CartItem) => {
    try {
      await axios.delete(`${URL}/${item.id}`)
      setCartItems((prevItems) => prevItems.filter(i => i.id !== item.id))

      returnStock(item.id, item.quantity)
      toast.success(`${item.name} removido com sucesso!`)
    } catch (error) {
      console.error(error)
      toast.error(`Ocorreu um erro ao remover o item ${item.name}`)
    }
  }

  const clearCart = async() => {
    try {
      setCartItems([])
      for(const item of cartItems) {
        await axios.delete(`${URL}/${item.id}`)
      }
    } catch (error) {
      console.log(`Erro: ${error}`)
    }
  }

  const handleCartUpdate = async(item: CartItem, updatedItems: CartItem[], quantity: number, showToast: boolean = true) => {
    await axios.put(`${URL}/${item.id}`, updatedItems.find(i => i.id === item.id))
    setCartItems(updatedItems)

    handleStock(item.id, quantity)
    if(showToast) toast.info(`Quantidade do item ${item.name} atualizada!`)
  }

  return (
    <CartItemsContext.Provider value={{ cartItems, setCartItems, addItemToCart, deleteItemToCart, clearCart }}>
      {children}
    </CartItemsContext.Provider>
  )
}

export function useCartItemsContext() {
  return useContext(CartItemsContext)
}