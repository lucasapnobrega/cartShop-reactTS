import { useItemsContext } from '../../contexts/ItemsContext';
import { Item } from '../../types/type';
import { IoClose } from "react-icons/io5";
import styles from './Modal.module.css'

interface ModalProps {
  item: Item;
  description: string;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function Modal({ item, description, setModal }: ModalProps) {
  const { deleteItem } = useItemsContext()

  return (
    <div className={styles.modal}>
      <div className={styles.overlay}></div>
      <div className={styles.modalContent}>
        <h2>{item.name}</h2>
        <p>{description}</p>

        <span className={styles.close} title='Fechar Modal' onClick={() => setModal(false)}>
          <IoClose />
        </span>

        <div className={styles.buttonGroup}>
          <button type='button' onClick={() => setModal(false)} className={`${styles.btn} ${styles.btnCancel}`}>
            Cancelar
          </button>

          <button type='button' onClick={() => deleteItem(item)} className={`${styles.btn} ${styles.btnYes}`}>
            Sim
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal