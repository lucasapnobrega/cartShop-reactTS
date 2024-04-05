import { InputHTMLAttributes, forwardRef } from 'react'
import styles from './Input.module.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
  inputStringValue?: string;
  inputNumberValue?: number;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((
  { 
    type='text', 
    name,
    label,
    errorMessage='',
    inputStringValue,
    inputNumberValue,
    ...props 
  }, ref) => {
  const hasError = errorMessage.length > 0

  return (
    <div className={styles.inputGroup}>
      <input
        type={type} 
        name={name}
        id={name}
        ref={ref}
        className={`${styles.input} ${hasError && "borderRed"}`}
        {...props}
      />
      <label 
        htmlFor={name} 
        className={`${styles.label} ${inputStringValue ? 
          inputStringValue.length > 0 && styles.labelFocus : 
          inputNumberValue === 0 || inputNumberValue ? styles.labelFocus : ""}`}
      >
        {label}
      </label>

      {hasError && <span className='colorRed'>{errorMessage}</span>}
    </div>
  )
})