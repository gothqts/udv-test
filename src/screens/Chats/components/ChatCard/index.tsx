import { IChatRoom } from '../../../Auth/auth.types.ts'
import styles from './chatCard.module.css'
import { useSetAtom } from 'jotai'
import { currentChatIdAtom } from '../../Chats.atom.ts'
import ChatIcon from '../../../../assets/chatIcon.svg?react'
import ActiveChatIcon from '../../../../assets/activeChat.svg?react'
import cn from '../../../../utils/cn.ts'

interface IChatProps {
  chat: IChatRoom
  isActive: boolean
}

const ChatCard = (props: IChatProps) => {
  const setCurrentChat = useSetAtom(currentChatIdAtom)

  return (
    <div
      className={cn(styles.wrapper, props.isActive ? styles.active : '')}
      onClick={() => setCurrentChat(props.chat.id)}
    >
      <div className={props.isActive ? styles.chat_content_active : styles.chat_content}>
        {props.isActive ? <ActiveChatIcon /> : <ChatIcon />}
        <div className={styles.chat_name}>{props.chat.name}</div>
      </div>
    </div>
  )
}

export default ChatCard
