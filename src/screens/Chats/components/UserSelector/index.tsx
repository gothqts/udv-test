import styles from './UserSelector.module.css'
import { useContext } from 'react'
import createChatContext from '../../createChat.context.ts'
import { storedUsers } from '../../Chats.atom.ts'
import { useAtomValue } from 'jotai'
import { authAtom } from '../../../Auth/auth.atom.ts'

const UserSelector = () => {
  const context = useContext(createChatContext)
  const allUsers = useAtomValue(storedUsers)
  const authState = useAtomValue(authAtom)

  const allEmails = allUsers
    .map((user) => user.email)
    .filter((email) => email !== authState.email)

  const availableEmails = allEmails.filter(
    (email) => !context.values.members.includes(email)
  )

  const handleEmailClick = (email: string) => {
    context.onClick(email)
  }

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h3 className={styles.section_header}>Available Users:</h3>
        <div className={styles.users_list}>
          {availableEmails.length > 0 ? (
            availableEmails.map((email) => (
              <div
                key={email}
                className={styles.user_item}
                onClick={() => handleEmailClick(email)}
              >
                {email}
                <span className={styles.add_icon}>+</span>
              </div>
            ))
          ) : (
            <div className={styles.empty_state}>All available users have been added</div>
          )}
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.section_header}>Members:</h3>
        <div className={styles.users_list}>
          {context.values.members.length > 0 ? (
            context.values.members.map((email) => (
              <div
                key={email}
                className={`${styles.user_item} ${styles.member}`}
                onClick={() => handleEmailClick(email)}
              >
                {email}
                <span className={styles.remove_icon}>×</span>
              </div>
            ))
          ) : (
            <div className={styles.empty_state}>No members selected</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserSelector
