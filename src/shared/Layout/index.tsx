import { Suspense, useEffect, useState } from 'react'
import LoaderText from '../Loader/LoaderText/index.tsx'
import styles from './layout.module.css'
import { Outlet } from 'react-router'
import { useAtom, useAtomValue } from 'jotai'
import { authAtom } from '../../screens/Auth/auth.atom.ts'
import { chatsAtom, currentChatAtom } from '../../screens/Chats/Chats.atom.ts'
import ChatCard from '../../screens/Chats/components/ChatCard'
import ExitIcon from '../../assets/exitIcon.svg?react'
import { getCurrentEmail } from '../../services/authActions/authActions.ts'
import { IChatRoom } from '../../screens/Auth/auth.types.ts'
import { fetchChats } from '../../services/chatActions/chatActions.ts'
import { useChatCtrl } from '../../screens/Chats/hooks/useChatCtrl.tsx'
import Modal from '../Modal'
import CreateChatContext from '../../screens/Chats/createChat.context.ts'
import UserSelector from '../../screens/Chats/components/UserSelector'
import CreateChatForm from '../../screens/Chats/components/CreateChatForm'
import PenIcon from '../../assets/pen.svg?react'

const Layout = () => {
  const [authState, setAuthState] = useAtom(authAtom)
  const [chats, setChats] = useAtom(chatsAtom)
  const currentChat = useAtomValue(currentChatAtom)
  const [isModalActive, setIsModalActive] = useState<boolean>(false)
  const chatCtrl = useChatCtrl()
  const userChats = chats.filter((chat) => chat.members.includes(authState.email))

  const handleClick = () => {
    sessionStorage.removeItem('authToken')
    setAuthState((prev) => ({
      ...prev,
      token: '',
    }))
  }

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
      <div className={styles.left_bar}>
        <div className={styles.header}>
          <div className={styles.exit_icon_wrapper}>
            <ExitIcon type='button' onClick={handleClick} />
          </div>
          <div className={styles.user_email}>{authState.email}</div>
        </div>
        <div className={styles.chat_list}>
          {userChats.map((chat) => (
            <ChatCard key={chat.id} chat={chat} isActive={currentChat?.id === chat.id} />
          ))}
          <button
            className={styles.create_chat_btn}
            onClick={() => setIsModalActive(true)}
          >
            <PenIcon />
          </button>
        </div>
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
                onClick: chatCtrl.handleClick,
              }}
            >
              <UserSelector />
              <CreateChatForm onClose={() => setIsModalActive(false)} />
            </CreateChatContext.Provider>
          </Modal>
        )}
      </div>
      <div className={styles.page_content}>
        <Suspense fallback={<LoaderText />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  )
}

export default Layout
