import { useLoaderContext } from "../../contexts/LoaderContext"

import styles from './Loader.module.css'

export default function Loader() {
  const { loading } = useLoaderContext()

  return (
    <>
      {loading && (
        <div className={styles.loader}></div>
      )}
    </>
  )
}