import { currentChatAtom } from '../../Chats.atom.ts'
import { IChatRoom } from '../../../Auth/auth.types.ts'
import { useAtomValue } from 'jotai'
import WindowForm from './WindowForm'
import styles from './ChatWindow.module.css'
import MessageList from '../MessageList'

const ChatWindow = () => {
  const currentChat = useAtomValue<IChatRoom | null>(currentChatAtom)

  return (
    <div className={styles.wrapper}>
      {currentChat ? (
        <>
          <div className={styles.messages_container_wrapper}>
            <MessageList messages={currentChat.messages} />
          </div>
          <WindowForm chatId={currentChat.id} />
        </>
      ) : (
        <div className={styles.plug}>
          <div className={styles.plug_text}>Select a chat to start messaging</div>
        </div>
      )}
    </div>
  )
}

export default ChatWindow
