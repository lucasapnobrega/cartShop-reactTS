import { useParams } from "react-router-dom"
import { useItemsContext } from "../../../contexts/ItemsContext"
import FormAdmin from "../FormAdmin/FormAdmin"

import styles from './Edit.module.css'

function Edit() {
  const { id } = useParams()
  console.log('aaa')
  const { getItem } = useItemsContext()
  const item = getItem(id as string)

  return (
    <div className={styles.editContainer}>
      <FormAdmin itemUpdate={item}/>
    </div>
  )
}

export default Edit