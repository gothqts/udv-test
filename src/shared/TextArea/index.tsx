import {
  ChangeEvent,
  CSSProperties,
  PropsWithChildren,
  ReactNode,
  TextareaHTMLAttributes,
  useRef,
} from 'react'
import styles from './textArea.module.css'
import useAutosizeTextArea from '../../screens/Chats/hooks/useAutoRisize.ts'
import cn from '../../utils/cn.ts'

type OmittedTextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'>

interface ITextAreaProps extends OmittedTextAreaProps {
  onChange: (value: string, name: string) => void
  children?: ReactNode
  className?: string
  style?: CSSProperties
  value: string
}

const TextArea = ({
  onChange,
  value,
  children,
  className,
  style,
  ...props
}: PropsWithChildren<ITextAreaProps>) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  useAutosizeTextArea(textAreaRef.current, value)

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value, props.name || '')
  }

  return (
    <div style={style} className={styles.textarea_wrapper}>
      {children}
      <textarea
        ref={textAreaRef}
        className={cn(styles.textarea, className)}
        value={value}
        onChange={handleChange}
        {...props}
      />
    </div>
  )
}

export default TextArea
