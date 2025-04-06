import { IChatRoom } from '../../../Auth/auth.types.ts'
import styles from './chatCard.module.css'
import ChatIcon from '../../../../assets/chatIcon.svg?react'
import ActiveChatIcon from '../../../../assets/activeChat.svg?react'
import cn from '../../../../utils/cn.ts'
import { useContext } from 'react'
import { AdaptiveContext } from '../../../../shared/Adaptive'

interface IChatProps {
  chat: IChatRoom
  onClick: () => void
  isActive: boolean
}

const ChatCard = (props: IChatProps) => {
  const adaptive = useContext(AdaptiveContext)
  return (
    <div
      className={cn(styles.wrapper, props.isActive ? styles.active : '')}
      onClick={props.onClick}
    >
      <div className={props.isActive ? styles.chat_content_active : styles.chat_content} data-size={adaptive?.nameSize}>
        {props.isActive ? (
          <ActiveChatIcon data-size={adaptive?.nameSize}/>
        ) : (
          <ChatIcon data-size={adaptive?.nameSize}/>
        )}
        <div className={styles.chat_name} data-size={adaptive?.nameSize}>
          {props.chat.name}
        </div>
      </div>
    </div>
  )
}

export default ChatCard
