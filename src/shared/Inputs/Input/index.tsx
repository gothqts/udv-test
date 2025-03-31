import { ChangeEvent, CSSProperties, PropsWithChildren, useEffect, useRef } from 'react'
import cn from '../../../utils/cn.ts'

export interface ITextInputProps {
  style?: CSSProperties
  value: string
  name: string
  onChange: (val: string, name: string) => void
  disabled?: boolean
  type?: string
  className?: string
  placeholder?: string
  maxLength?: number
  minLength?: number
  label?: string
  autofocus?: boolean
  onFocus?: () => void

  size?: string
}

const TextInput = ({
  onChange,
  value,
  children,
  className,
  style,
  size,
  autofocus,
  type,
  ...props
}: PropsWithChildren<ITextInputProps>) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value, props.name)
  }
  useEffect(() => {
    if (autofocus && inputRef.current) {
      inputRef.current.focus({ preventScroll: true })
    }
  }, [])
  return (
    <div className='input-wrapper' style={style}>
      {children}
      <input
        ref={inputRef}
        type={type ?? 'text'}
        className={cn('text-input', className || 0)}
        value={value}
        onChange={handleChange}
        data-size={size}
        autoComplete='false'
        min={props.minLength ?? 0}
        {...props}
      />
    </div>
  )
}

export default TextInput
