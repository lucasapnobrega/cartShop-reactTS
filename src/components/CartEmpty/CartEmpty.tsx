import { Link } from "react-router-dom"

import styles from './CartEmpty.module.css'

function CartEmpty() {
  return (
    <main className={`mainFlex1 ${styles.containerNoProducts}`}>
      <h2>Carrinho Vazio!</h2>
      <p>Tente adicionar algum produto ao carrinho.</p>
      <Link to="/" className={`${styles.backBtn} ${styles.btn}`} title="Voltar para Home">Voltar</Link>
    </main>
  )
}

export default CartEmpty