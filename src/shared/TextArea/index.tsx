import { ChangeEvent, CSSProperties, PropsWithChildren, ReactNode, useRef } from 'react'
import styles from './textArea.module.css'
import useAutosizeTextArea from '../../screens/Chats/hooks/useAutoRisize.ts'
import cn from '../../utils/cn.ts'

interface ITextAreaProps {
  onChange: (val: string, name: string) => void
  value: string
  name: string
  placeholder?: string
  className?: string
  style?: CSSProperties
  maxLength?: number
  minLength?: number
  children?: ReactNode
  rows?: number
}

const TextArea = ({
  onChange,
  value,
  children,
  className,
  style,
  maxLength,
  minLength,
  placeholder,
  rows,
  ...props

}: PropsWithChildren<ITextAreaProps>) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  useAutosizeTextArea(textAreaRef.current, value)

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value, props.name)
  }

  return (
    <div style={style} className={styles.textarea_wrapper}>
      {children}
      <textarea
        ref={textAreaRef}
        className={cn(styles.textarea, className)}
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
        minLength={minLength}
        placeholder={placeholder}
        rows={rows}
      />
    </div>
  )
}

export default TextArea
