import { useCartItemsContext } from "../../../contexts/CartItemsContext";
import { CartItem } from "../../../types/type"
import { IoIosArrowUp, IoIosArrowDown  } from "react-icons/io";
import { FaTrashCan } from "react-icons/fa6";

import styles from './CardCart.module.css'

interface CardCartProps {
  item: CartItem;
}

function CardCart({ item }: CardCartProps) {
  const { addItemToCart , deleteItemToCart } = useCartItemsContext()

  const handleClick = (increase: boolean) => {
    if((!increase && item.quantity === 1) || (increase && item.quantity === item.stock)) {
      return
    }

    if(increase) {
      item.quantity++
      addItemToCart(item, item.quantity, true, true)
    } else {
      item.quantity--
      addItemToCart(item, item.quantity, true, false)
    }
  }

  return (
    <tr className={styles.tableLine}>
      <td>{item.name}</td>
      <td>{item.category}</td>
      <td>
        <div className={styles.tableQuantity}>
          <span 
            title={`${item.quantity === 1 ? "" : "Diminuir quantidade"}`}
            onClick={() => handleClick(false)}
            className={`${item.quantity === 1 && styles.blockButton}`}
          >
            <IoIosArrowDown />
          </span>

          <span>{item.quantity}</span>
          
          <span 
            title="Aumentar quantidade" 
            onClick={() => handleClick(true)}
            className={`${item.quantity === item.stock && styles.blockButton}`}
          >
            <IoIosArrowUp />
          </span>
        </div>
      </td>
      <td>R${item.price}</td>
      <td>R${item.totalPrice}</td>
      <td className={styles.deleteIcon} title="Remover item" onClick={() => deleteItemToCart(item)}><FaTrashCan /></td>
    </tr>
  )
}

export default CardCart