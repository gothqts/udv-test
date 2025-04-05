import { IChatRoom } from '../../../Auth/auth.types.ts'
import { useAtom } from 'jotai'
import WindowForm from './WindowForm'
import styles from './chatWindow.module.css'
import MessageList from '../MessageList'
import { pickedChatAtom } from '../../Chats.atom.ts'
import { useLoaderData } from 'react-router'
import { useEffect } from 'react'
import MessageContext from './message.context.ts'
import { useMessageCtrl } from './hooks/useMessageCtrl.ts'
import SendIcon from '../../../../assets/sendIcon.svg?react'

const ChatWindow = () => {
  const [chatState, setChatState] = useAtom<IChatRoom | null>(pickedChatAtom)
  const loadedChat: IChatRoom = useLoaderData()
  const ctrl = useMessageCtrl()

  useEffect(() => {
    setChatState(loadedChat)
  }, [])

  return (
    <div className={styles.wrapper}>
      {chatState ? (
        <>
          <MessageList messages={chatState?.messages} />
          <MessageContext.Provider
            value={{
              values: ctrl.messageValues,
              onChange: ctrl.handleChange,
              setMessageValues: ctrl.setMessageValues,
            }}
          >
            <form onSubmit={ctrl.handleSubmit} className={styles.form}>
              <WindowForm />
              <button type='submit' className={styles.btn}>
                <SendIcon />
              </button>
            </form>
          </MessageContext.Provider>
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
