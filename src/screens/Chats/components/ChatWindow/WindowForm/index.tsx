import { ChangeEvent, useRef, useState } from 'react'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { chatsAtom, pickedChatAtom } from '../../../Chats.atom.ts'
import { authAtom } from '../../../../Auth/auth.atom.ts'
import { IChatRoom, IMessage, IUserProfile } from '../../../../Auth/auth.types.ts'
import React from 'react'
import styles from './WindowForm.module.css'
import useAutosizeTextArea from '../../../hooks/useAutoRisize.ts'
import SendIcon from '../../../../../assets/sendIcon.svg?react'
import {updateChatsMessages} from '../../../../../services/chatActions/chatActions.ts'

interface IWindowFormProps {
  chatId: number | null
}

const WindowForm = ({ chatId }: IWindowFormProps) => {
  const [message, setMessage] = useState<string>('')
  const setAllChats = useSetAtom(chatsAtom)
  const auth = useAtomValue<IUserProfile>(authAtom)
  const [currentChat, setCurrentChat] = useAtom<IChatRoom | null>(pickedChatAtom)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  useAutosizeTextArea(textareaRef.current, message)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!message.trim() || !chatId) return
    const newMessage: IMessage = {
      id: Date.now(),
      senderEmail: auth.email,
      text: message,
    }

    if (currentChat) {
      const chatsStore = updateChatsMessages(currentChat.id, newMessage)
      if (chatsStore) {
        setCurrentChat(chatsStore.updatedChat)
        setAllChats(chatsStore.updatedChats)
      }
    }

    setMessage('')
  }
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <textarea
        id='textArea'
        className={styles.textarea_text}
        value={message}
        ref={textareaRef}
        rows={1}
        maxLength={500}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
        placeholder='Type your message...'
      />
      <button className={styles.btn} type='submit'>
        <SendIcon />
      </button>
    </form>
  )
}

export default WindowForm
