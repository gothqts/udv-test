import styles from './Chats.module.css'
import { pickedChatAtom } from './Chats.atom.ts'
import { useAtomValue } from 'jotai'
import ChatWindow from './components/ChatWindow'
import ProfileIcon from '../../assets/userIcon.svg?react'

const Chats = () => {
  const pickedChat = useAtomValue(pickedChatAtom)

  return (
    <div className={styles.wrapper}>
      {pickedChat ? (
        <div className={styles.header}>
          <div className={styles.chat_info}>
            <ProfileIcon />
            <span className={styles.members_count}>members: {pickedChat?.members?.length}</span>
          </div>
        </div>
      ) : null}

      <ChatWindow />
    </div>
  )
}

export default Chats
