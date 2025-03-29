import { currentChatAtom } from '../../Chats.atom.ts'
import { IChatRoom } from '../../../Auth/auth.types.ts'
import { useAtomValue } from 'jotai'
import Message from '../Message'
import WindowForm from './WindowForm'
import styles from './ChatWindow.module.css'
import { authAtom } from '../../../Auth/auth.atom.ts'

const ChatWindow = () => {
  const currentChat = useAtomValue<IChatRoom | null>(currentChatAtom)
  const authState = useAtomValue(authAtom)

  return (
    <div className={styles.wrapper}>
      {currentChat ? (
        <>
          <div className={styles.messages_container}>
            {currentChat.messages.map((message) => (
              <div
                key={message.id}
                className={`${styles.message_wrapper} ${
                  message.senderEmail === authState.email ? styles.own_message : styles.other_message
                }`}
              >
                <Message message={message} />
              </div>
            ))}
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