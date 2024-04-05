import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "../../../components/Input/Input"
import { useCategoriesContext } from "../../../contexts/CategoriesContext"

import styles from './FormCategories.module.css'
import { CategorySchemaType, categorySchema } from "../../../schemas/categorySchema"

function FormCategories() {
  const { 
    register, 
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm<CategorySchemaType>({
    resolver: zodResolver(categorySchema),
    mode: 'onSubmit'
  })

  const { addCategory } = useCategoriesContext()

  const onSubmit = (data: CategorySchemaType) => {
    addCategory(data.category)
    reset()
  }

  const categoryValue = watch('category')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formCategories}>
      <h2>Cadastro de Categoria</h2>
      <Input 
        {...register('category')}
        label="Categoria"
        errorMessage={errors.category && errors.category.message}
        inputStringValue={categoryValue}
      />

      <button type="submit" className={styles.saveBtn}>Salvar</button>
    </form>
  )
}

export default FormCategories