import styles from './Chats.module.css'
import { currentChatAtom } from './Chats.atom.ts'
import { useAtomValue } from 'jotai'
import ChatWindow from './components/ChatWindow'
import ProfileIcon from '../../assets/userIcon.svg?react'

const Chats = () => {
  const currentChat = useAtomValue(currentChatAtom)

  return (
    <div className={styles.wrapper}>
      {currentChat ? (
        <div className={styles.header}>
          <div className={styles.chat_info}>
            <ProfileIcon />
            <span className={styles.members_count}>
              {' '}
              members: {currentChat?.members.length}
            </span>
          </div>
        </div>
      ) : null}

      <ChatWindow />
    </div>
  )
}

export default Chats
