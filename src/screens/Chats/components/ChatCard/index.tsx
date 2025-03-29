import { IChatRoom } from '../../../Auth/auth.types.ts'
import styles from './Chat.module.css'
import { useSetAtom } from 'jotai'
import {  currentChatIdAtom } from '../../Chats.atom.ts'

interface IChatProps {
  chat: IChatRoom
  isActive: boolean
}

const ChatCard = (props: IChatProps) => {
  const setCurrentChat = useSetAtom(currentChatIdAtom)

  const handleClick = () => {
    setCurrentChat(props.chat.id)
  }

  return (
    <div className={`${styles.wrapper} ${props.isActive ? styles.active : ''}`}
         onClick={handleClick}>
      <h1 style={{ color: '#1C2E4A' }}>{props.chat.name}</h1>
    </div>)
}
export default ChatCard