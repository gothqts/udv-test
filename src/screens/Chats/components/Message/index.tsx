import { IMessage } from '../../../Auth/auth.types.ts'
import styles from './Message.module.css'

interface IMessageProps {
  message: IMessage
}

const Message = (props: IMessageProps) => {

  return (
    <div className={styles.message}>
      <div className={styles.email}>
        {props.message.senderEmail}
      </div>
      <div className={styles.data}>
        {props.message.text}
      </div>
    </div>
  )
}

export default Message