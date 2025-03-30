import { IMessage } from '../../../Auth/auth.types.ts'
import styles from './Message.module.css'
import cn from '../../../../utils/cn.ts'

interface IMessageProps {
  message: IMessage
  className?: string
}

const Message = (props: IMessageProps) => {
  return (
    <div className={cn(styles.message, props.className)}>
      <div className={styles.email}>{props.message.senderEmail}</div>
      <div className={styles.data}>{props.message.text}</div>
    </div>
  )
}

export default Message
