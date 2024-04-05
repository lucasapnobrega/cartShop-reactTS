import { Item } from '../../../types/type';
import { Link, useNavigate } from 'react-router-dom';
import { useItemsContext } from '../../../contexts/ItemsContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema, FormSchemaType } from '../../../schemas/formSchema';
import { Input } from '../../../components/Input/Input';
import { CategorySelect } from '../../../components/CategorySelect/CategorySelect';
import { useCategoriesContext } from '../../../contexts/CategoriesContext';

import styles from './FormAdmin.module.css'

interface FormAdminProps {
  itemUpdate: Item | null
}

function FormAdmin({ itemUpdate }: FormAdminProps) {
  const formData: FormSchemaType = {
    name: itemUpdate ? itemUpdate.name : "",
    price: itemUpdate ? itemUpdate.price : 0,
    image: itemUpdate ? itemUpdate.image : "",
    stock: itemUpdate ? itemUpdate.stock : 0,
    category: itemUpdate ? itemUpdate.category : ""
  }

  const { 
    handleSubmit, 
    register, 
    formState: { errors },
    watch,
    reset
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: formData
  })

  const { addItem, updateItem } = useItemsContext()
  const { categories } = useCategoriesContext()
  const navigate = useNavigate()

  const handleForm = (data: FormSchemaType) => {
    const item: Item = {
      id: itemUpdate?.id,
      name: data.name, 
      price: data.price, 
      image: data.image,
      stock: data.stock,
      category: data.category
    }

    if(itemUpdate) {
      updateItem(item)
      navigate('/admin')
    } else {
      addItem(item)
      reset()
    }
  }

  const nameValue = watch('name')
  const priceValue = watch('price')
  const imageValue = watch('image')
  const stockValue = watch('stock')

  return (
    <form className={styles.form} autoComplete='off' onSubmit={handleSubmit(handleForm)}>
      {itemUpdate ? <h2>Você está editando o item "{itemUpdate.name}"</h2> : <h2>Cadastro de Item</h2>}

      <Input 
        {...register('name')}
        label='Nome'
        errorMessage={errors.name && errors.name.message}
        inputStringValue={nameValue}
      />

      <Input 
        {...register('price', { setValueAs: (value: string) => Number(value) })}
        type='number'
        label='Preço'
        errorMessage={errors.price && errors.price.message}
        inputNumberValue={priceValue}
      />

      <Input 
        {...register('image')}
        label='Imagem'
        errorMessage={errors.image && errors.image.message}
        inputStringValue={imageValue}
      />

      <Input 
        {...register('stock', { setValueAs: (value: string) => Number(value) })}
        type='number'
        label='Estoque'
        errorMessage={errors.stock && errors.stock.message}
        inputNumberValue={stockValue}
      />

      <CategorySelect
        {...register('category')}
        errorMessage={errors.category && errors.category.message}
        categories={categories}
      />

      <button type="submit" className={styles.saveBtn}>Salvar</button>
      {itemUpdate && (
        <Link to="/admin" className={styles.cancelBtn}>Cancelar</Link>
      )}
    </form>
  )
}

export default FormAdmin
