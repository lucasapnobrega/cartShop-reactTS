import { Item, CartItem } from "../../types/type"
import { useContext, useState } from "react";
import { CartItemsContext } from "../../contexts/CartItemsContext";

import styles from './CardItem.module.css'

interface CardItemProps {
  item: Item;
}

function CardItem({ item }: CardItemProps) {
  const { addItemToCart } = useContext(CartItemsContext)
  const [quantity, setQuantity] = useState<number>(1)

  const handleClick = () => {
    const completeItem = { ...item, stock: item.stock }
    addItemToCart(completeItem as CartItem, quantity)
    setQuantity(1)
  }

  return (
    <div className={styles.card}>
      <img src={item.image} alt={item.name} />
      <div className={styles.content}>
        <h3 className={styles.title}>{item.name}</h3>
        <span className={styles.price}>R${item.price}</span>

        <button
          type="button"
          onClick={handleClick}
          className={styles.btnAdd}
        >
          Adicionar ao Carrinho
        </button>

        {item.stock === 0 ? (
          <p className={styles.textNoStock}>Item sem estoque.</p>
        ) : (
          <select onChange={(ev) => setQuantity(+ev.target.value)} title="Selecionar quantidade" value={quantity}>
            {Array.from({ length: Math.min(10, item.stock) }).map((_, i) => (
                <option value={i + 1} key={i + 1}>Quantidade: {i + 1}</option>
              ))}
          </select>
        )}
      </div>
    </div>
  )
}

export default CardItem