import { currentChatAtom } from '../../Chats.atom.ts'
import { IChatRoom } from '../../../Auth/auth.types.ts'
import { useAtomValue } from 'jotai'
import Message from '../Message'
import WindowForm from './WindowForm'
import styles from './ChatWindow.module.css'

const ChatWindow = () => {
  const currentChat = useAtomValue<IChatRoom | null>(currentChatAtom)
  return (
    <div className={styles.wrapper}>
      <div className={styles.messages_container}>
        {currentChat?.messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      {currentChat ? <WindowForm chatId={currentChat.id} /> : null}
    </div>
  )
}

export default ChatWindow
