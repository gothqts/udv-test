import styles from './Chats.module.css'
import { useEffect, useState } from 'react'
import Modal from '../../shared/Modal'
import { chatsAtom } from './Chats.atom.ts'
import { useSetAtom } from 'jotai'
import ChatWindow from './components/ChatWindow'
import { fetchChats } from '../../services/chatActions/chatActions.ts'
import { IChatRoom } from '../Auth/auth.types.ts'
import CreateChatForm from './components/CreateChatForm'
import { authAtom } from '../Auth/auth.atom.ts'
import { getCurrentEmail } from '../../services/authActions/authActions.ts'
import UserSelector from './components/UserSelector'
import CreateChatContext from './createChat.context.ts'
import { useChatCtrl } from './hooks/useChatCtrl.tsx'

const Chats = () => {
  const [isModalActive, setIsModalActive] = useState<boolean>(false)
  const setChats = useSetAtom(chatsAtom)
  const setAuthState = useSetAtom(authAtom)
  const chatCtrl = useChatCtrl()

  useEffect(() => {
    const email = getCurrentEmail()
    if (email) {
      setAuthState((prevState) => ({ ...prevState, email }))
    }

    const loadedChats: IChatRoom[] = fetchChats()
    setChats(loadedChats)

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'chats') {
        const updatedChats: IChatRoom[] = fetchChats()
        setChats(updatedChats)
      }
    }
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <button className={styles.create_btn} onClick={() => setIsModalActive(true)}>
          create chat
        </button>
      </div>
      <ChatWindow />
      {isModalActive && (
        <Modal
          id='addChat'
          title='Creating a new chat'
          onClose={() => setIsModalActive(false)}
        >
          <CreateChatContext.Provider
            value={{
              values: chatCtrl.chatValues,
              onChange: chatCtrl.handleChange,
              onClick: chatCtrl.handleClick
            }}
          >
            <UserSelector />
            <CreateChatForm onClose={() => setIsModalActive(false)} />
          </CreateChatContext.Provider>
        </Modal>
      )}
    </div>
  )
}

export default Chats
