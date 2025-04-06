import {
  ChangeEvent,
  CSSProperties,
  InputHTMLAttributes,
  PropsWithChildren,
  useEffect,
  useRef,
} from 'react'
import cn from '../../../utils/cn.ts'
import styles from './textInput.module.css'

type OmittedInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'>

export interface ITextInputProps extends OmittedInputProps {
  style?: CSSProperties
  onChange: (value: string, name: string) => void
  label?: string
  size?: number
  autoFocus?: boolean
  name: string
}

const TextInput = ({
  onChange,
  children,
  className,
  style,
  size,
  autoFocus,
  value,
  ...props
}: PropsWithChildren<ITextInputProps>) => {
  const { type = 'text', name } = props
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value, name)
  }
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus({ preventScroll: true })
    }
  }, [autoFocus])

  return (
    <div className={styles['input-wrapper']} style={style}>
      {children}
      <input
        ref={inputRef}
        type={type}
        className={cn(styles['text-input'], className)}
        value={value}
        onChange={handleChange}
        data-size={size}
        autoComplete='off'
        {...props}
      />
    </div>
  )
}

export default TextInput
