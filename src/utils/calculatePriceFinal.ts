import { CartItem } from "../types/type";

export default function calculatePriceFinal(cartItems: CartItem[]) {
  return cartItems.reduce((acc, item) => acc + item.totalPrice!, 0)
}