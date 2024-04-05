import { Link, useLocation } from 'react-router-dom'
import { FaCircleCheck, FaFaceSmile, FaArrowLeft } from "react-icons/fa6";
import { CartItem } from '../../types/type';
import calculatePriceFinal from '../../utils/calculatePriceFinal';
import scrollToTop from '../../utils/scrollToTop';

import img from '../../assets/image.png'

import styles from './PurchaseCompleted.module.css'

function PurchaseCompleted() {
  const location = useLocation()

  const items: CartItem[] = location.state.cartItems
  const totalPriceFinal = calculatePriceFinal(items)

  scrollToTop()

  return (
    <main className={`mainFlex1 ${styles.purchaseCompletedContainer}`}>
      <div className={styles.titleGroup}>
        <h1 className={styles.title}>Compra efetuada com sucesso! <FaCircleCheck /></h1>
        <h2 className={styles.subtitle}>Obrigado pela prefêrencia! <FaFaceSmile /></h2>
      </div>

      <div className={styles.wrapperCards}>
        <h3>Itens comprados:</h3>
        <ul>
          {items && items.map(item => (
            <li key={item.id}>
              <p>{item.name} - {item.quantity}x - R${item.totalPrice}</p>
            </li>
          ))}
        </ul>
        <span className={styles.total}>Total: R${totalPriceFinal}</span>
      </div>

      <img src={img} alt="Sacolas de compras" className={styles.img}/>

      <Link to={"/"} className={styles.btnBack}><FaArrowLeft /> Voltar para Catálogos</Link>
    </main>
  )
}

export default PurchaseCompleted