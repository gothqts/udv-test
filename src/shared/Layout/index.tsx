import { Suspense } from 'react'
import LoaderText from '../Loader/LoaderText/index.tsx'
import styles from './layout.module.css'
import { Outlet } from 'react-router'
import { useAtomValue, useSetAtom } from 'jotai'
import { authAtom } from '../../screens/Auth/auth.atom.ts'
import { chatsAtom, currentChatAtom } from '../../screens/Chats/Chats.atom.ts'
import ChatCard from '../../screens/Chats/components/ChatCard'
import ExitIcon from '../../assets/exitIcon.svg?react'

const Layout = () => {
  const setAuthState = useSetAtom(authAtom)
  const chats = useAtomValue(chatsAtom)
  const currentChat = useAtomValue(currentChatAtom)
  const handleClick = () => {
    sessionStorage.removeItem('authToken')
    setAuthState((prev) => ({
        ...prev,
        token: '',
      }),
    )
  }
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}')
  const username = currentUser.username
  return (
    <div className={styles.wrapper}>
      <div className={styles.left_bar}>
        <div className={styles.header}>
          <div className={styles.exit_icon_wrapper}>
            <ExitIcon type="button" onClick={handleClick} />
          </div>
          <div className={styles.user_email}>{username}</div>
        </div>
        {chats.map((chat) => (
          <ChatCard key={chat.id} chat={chat} isActive={currentChat?.id === chat.id} />))}
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
