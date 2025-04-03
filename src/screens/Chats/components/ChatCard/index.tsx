import { IChatRoom } from '../../../Auth/auth.types.ts'
import styles from './chatCard.module.css'
import ChatIcon from '../../../../assets/chatIcon.svg?react'
import ActiveChatIcon from '../../../../assets/activeChat.svg?react'
import cn from '../../../../utils/cn.ts'

interface IChatProps {
  chat: IChatRoom
  onClick: () => void
  isActive: boolean
}

const ChatCard = (props: IChatProps) => {
  return (
    <div className={cn(styles.wrapper, props.isActive ? styles.active : '')} onClick={props.onClick}>
      <div className={props.isActive ? styles.chat_content_active : styles.chat_content}>
        {props.isActive ? <ActiveChatIcon /> : <ChatIcon />}
        <div className={styles.chat_name}>{props.chat.name}</div>
      </div>
    </div>
  )
}

export default ChatCard
