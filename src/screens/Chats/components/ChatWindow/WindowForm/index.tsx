import { useRef, useState } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import { chatsAtom, currentChatAtom } from '../../../Chats.atom.ts'
import { authAtom } from '../../../../Auth/auth.atom.ts'
import { IChatRoom, IMessage, IUserProfile } from '../../../../Auth/auth.types.ts'
import React from 'react'
import styles from './WindowForm.module.css'
import useAutosizeTextArea from '../../../hooks/useAutoRisize.ts'
import SendIcon from '../../../../../assets/sendIcon.svg?react'

interface IWindowFormProps {
  chatId: number | null
}

const WindowForm = ({ chatId }: IWindowFormProps) => {
  const [message, setMessage] = useState<string>('')
  const chats = useAtomValue<IChatRoom[]>(chatsAtom)
  const auth = useAtomValue<IUserProfile>(authAtom)
  const setCurrentChat = useSetAtom(currentChatAtom)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  useAutosizeTextArea(textareaRef.current, message)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!message.trim()) return
    const newMessage: IMessage = {
      id: Date.now(),
      senderEmail: auth.email,
      text: message,
    }

    const updatedChats = chats.map((chat) => {
      if (chat.id === chatId) {
        const updatedChat = {
          ...chat,
          messages: [...chat.messages, newMessage],
        }
        setCurrentChat(updatedChat)
        return updatedChat
      }
      return chat
    })
    const updatedChat = updatedChats.find((chat) => chat.id === chatId)
    if (updatedChat) {
      setCurrentChat(updatedChat)
    }
    localStorage.setItem('chats', JSON.stringify(updatedChats))
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
        onChange={(e) => setMessage(e.target.value)}
        placeholder='Type your message...'
      />
      <button className={styles.btn} type='submit'>
        <SendIcon />
      </button>
    </form>
  )
}

export default WindowForm
