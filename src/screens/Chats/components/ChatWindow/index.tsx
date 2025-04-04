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
  }, [])

  return (
    <div className={styles.wrapper}>
      {chatState ? (
        <>
          <MessageList messages={chatState?.messages} />
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
