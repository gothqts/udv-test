import { IChatRoom } from '../../../Auth/auth.types.ts'
import { useAtom } from 'jotai'
import WindowForm from './WindowForm'
import styles from './ChatWindow.module.css'
import MessageList from '../MessageList'
import { pickedChatAtom } from '../../Chats.atom.ts'
import { useLoaderData } from 'react-router'
import { useEffect } from 'react'

const ChatWindow = () => {
  const [chatState, setChatState] = useAtom<IChatRoom | null>(pickedChatAtom)
  const loadedChat: IChatRoom = useLoaderData()

  useEffect(() => {
    setChatState(loadedChat)
    console.log(chatState)
  }, [])

  return (
    <div className={styles.wrapper}>
      {chatState ? (
        <>
          <div className={styles.messages_container_wrapper}>
            <MessageList messages={chatState?.messages} />
          </div>
          <WindowForm chatId={chatState?.id} />
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
