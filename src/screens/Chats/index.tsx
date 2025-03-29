import styles from './Chats.module.css'
import { useEffect, useState } from 'react'
import Modal from '../../shared/Modal'
import { chatsAtom } from './Chats.atom.ts'
import { useSetAtom } from 'jotai'
import ChatWindow from './components/ChatWindow'
import { fetchChats } from '../../services/CrudChats'
import { IChatRoom } from '../Auth/auth.types.ts'
import CreateChatForm from './components/CreateChatForm'
import { authAtom } from '../Auth/auth.atom.ts'
import { getCurrentEmail } from '../../services/authActions/authActions.ts'

const Chats = () => {
  const [isModalActive, setIsModalActive] = useState<boolean>(false)
  const setChats = useSetAtom(chatsAtom)
  const setAuthState = useSetAtom(authAtom)

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
          <CreateChatForm onClose={() => setIsModalActive(false)} />
        </Modal>
      )}
    </div>
  )
}

export default Chats
