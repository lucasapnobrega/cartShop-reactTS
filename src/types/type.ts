export interface Item {
  id?: string;
  name: string;
  price: number;
  image: string;
  stock: number;
  category: string;
}

export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  totalPrice?: number;
  stock: number;
  category: string;
}

export interface Category {
  id: string;
  name: string;
}