import { useState } from 'react'
import { useAtom, useSetAtom } from 'jotai'
import { chatsAtom, currentChatAtom } from '../../../Chats.atom.ts'
import { authAtom } from '../../../../Auth/auth.atom.ts'
import { IMessage } from '../../../../Auth/auth.types.ts'
import React from 'react'
import styles from './WindowForm.module.css'

interface IWindowFormProps {
  chatId: number
}

const WindowForm = ({ chatId }: IWindowFormProps) => {
  const [message, setMessage] = useState<string>('')
  const [chats] = useAtom(chatsAtom)
  const [auth] = useAtom(authAtom)
  const setCurrentChat = useSetAtom(currentChatAtom)

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
      <div className={styles.input_wrapper}>
        <input
          className={styles.text_input}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Type your message...'
        />
      </div>
    </form>
  )
}

export default WindowForm
