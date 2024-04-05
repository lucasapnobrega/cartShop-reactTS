import { Item } from "../../../types/type"
import { Link } from "react-router-dom"
import { useState } from "react"
import Modal from "../../../components/Modal/Modal"

import styles from './CardAdmin.module.css'

interface ItemProps {
  item: Item
}

function CardAdmin({ item }: ItemProps) {
  const [modal, setModal] = useState<boolean>(false)

  return (
    <>
      <div className={styles.card}>
        <h3>{item.name} - R${item.price}</h3>
        <p>Estoque: {item.stock}</p>

        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={`${styles.btn} ${styles.deleteBtn}`}
            onClick={() => setModal(true)}
          >
            Remover
          </button>
          <Link
            className={`${styles.btn} ${styles.editBtn}`}
            to={`edit/${item.id}`}
          >
            Editar
          </Link>
        </div>
      </div>

      {modal && <Modal item={item} description="Tem certeza que deseja apagar esse item?" setModal={setModal}/>}
    </>
  )
}

export default CardAdmin
