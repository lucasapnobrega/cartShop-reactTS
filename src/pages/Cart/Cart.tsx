import { Link, useNavigate } from "react-router-dom"
import { useCartItemsContext } from "../../contexts/CartItemsContext"
import { FaShoppingBasket } from "react-icons/fa";
import CardCart from "./CardCart/CardCart";
import CartEmpty from "../../components/CartEmpty/CartEmpty";
import calculatePriceFinal from "../../utils/calculatePriceFinal";
import scrollToTop from "../../utils/scrollToTop";

import styles from './Cart.module.css'

function Cart() {
  const { cartItems, clearCart } = useCartItemsContext()
  const navigate = useNavigate()

  scrollToTop()

  if(cartItems.length === 0) {
    return ( <CartEmpty /> )
  }

  const quantityItems = cartItems.length
  const totalPriceFinal = calculatePriceFinal(cartItems)

  const handeClick = () => {
    navigate("/purchaseCompleted", { state: { cartItems } })
    clearCart()
  }

 

  return (
    <main className={`mainFlex1 ${styles.containerCart}`}>
      <h1>Carrinho</h1>

      <div className={styles.tableOverflow}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Quantidade</th>
              <th>Preço(un.)</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems && cartItems.map(item => (
              <CardCart key={item.id} item={item}/>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.cartEnd}>
        <p className={styles.subtotal}>
          Subtotal ({quantityItems} itens): <span className="bold">R${totalPriceFinal}</span>
        </p>

        <button
          type="button"
          onClick={handeClick} 
          className={`${styles.finalizeBtn} ${styles.btn}`}
        >
          Finalizar Compra <FaShoppingBasket />
        </button>
        <Link to="/" className={`${styles.backBtn} ${styles.btn}`} title="Voltar para Home">
          Voltar
        </Link>
      </div>
    </main>
  )
}

export default Cart