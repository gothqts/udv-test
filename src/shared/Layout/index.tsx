import { Suspense, useContext, useEffect, useState } from 'react'
import LoaderText from '../Loader/LoaderText/index.tsx'
import styles from './layout.module.css'
import { Outlet } from 'react-router'
import { useAtom } from 'jotai'
import { authAtom } from '../../screens/Auth/auth.atom.ts'
import { chatsAtom, pickedChatAtom } from '../../screens/Chats/Chats.atom.ts'
import ChatCard from '../../screens/Chats/components/ChatCard'
import ExitIcon from '../../assets/exitIcon.svg?react'
import { getCurrentEmail } from '../../services/authActions/authActions.ts'
import { IChatRoom } from '../../screens/Auth/auth.types.ts'
import { fetchChats, getCurrentChat } from '../../services/chatActions/chatActions.ts'
import { useChatCtrl } from '../../screens/Chats/hooks/useChatCtrl.tsx'
import Modal from '../Modal'
import CreateChatContext from '../../screens/Chats/createChat.context.ts'
import UserSelector from '../../screens/Chats/components/UserSelector'
import CreateChatForm from '../../screens/Chats/components/CreateChatForm'
import PenIcon from '../../assets/pen.svg?react'
import { AdaptiveContext } from '../Adaptive'

const Layout = () => {
  const adaptive = useContext(AdaptiveContext)
  const [authState, setAuthState] = useAtom(authAtom)
  const [chats, setChats] = useAtom(chatsAtom)
  const [currentChat, setCurrentChat] = useAtom(pickedChatAtom)
  const [isModalActive, setIsModalActive] = useState<boolean>(false)
  const chatCtrl = useChatCtrl()
  const userChats = chats.filter((chat) => chat.members.includes(authState.email))

  const handleClick = () => {
    sessionStorage.removeItem('authToken')
    sessionStorage.removeItem('currentChat')
    setCurrentChat(null)
    setAuthState((prev) => ({
      ...prev,
      token: '',
    }))
  }

  const handleClickCard = (chat: IChatRoom) => {
    sessionStorage.setItem('currentChat', JSON.stringify(chat))
    setCurrentChat(chat)
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
        const chatFromStorage = getCurrentChat()

        if (chatFromStorage) {
          const updatedChat = updatedChats.find((chat) => chat.id === chatFromStorage.id)

          if (updatedChat) {
            setCurrentChat(updatedChat)
            sessionStorage.setItem('currentChat', JSON.stringify(updatedChat))
          } else {
            setCurrentChat(null)
            sessionStorage.removeItem('currentChat')
          }
        }
      }
    }
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return (
    <div className={styles.wrapper} data-size={adaptive?.nameSize}>
      <div className={styles.left_bar}>
        <div className={styles.header} data-size={adaptive?.nameSize}>
          <div className={styles.exit_icon_wrapper}>
            <ExitIcon type='button' onClick={handleClick} />
          </div>
          <div className={styles.user_email}>{authState.email}</div>
        </div>
        <div className={styles.chat_list}>
          {userChats.map((chat) => (
            <ChatCard
              key={chat.id}
              chat={chat}
              onClick={() => handleClickCard(chat)}
              isActive={currentChat?.id === chat.id}
            />
          ))}
          <button
            data-size={adaptive?.nameSize}
            className={styles.create_chat_btn}
            onClick={() => setIsModalActive(true)}
          >
            <PenIcon data-size={adaptive?.nameSize} />
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
