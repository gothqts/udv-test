import { useState } from 'react'
import { IChatRoom } from '../../Auth/auth.types.ts'

const generateEmptyChatValues = (): IChatRoom => ({
  name: '',
  id: Date.now() + Math.floor(Math.random() * 1000),
  messages: [],
  members: [],
})

export const useChatCtrl = () => {
  const [chatValues, setChatValues] = useState<IChatRoom>(generateEmptyChatValues())

  const handleChange = (value: string, name: string) => {
    setChatValues((prev) => ({ ...prev, [name]: value }))
  }
  const handleClick = (email: string) => {
    setChatValues(prev => {
      const newMembers = prev.members.includes(email)
        ? prev.members.filter(member => member !== email)
        : [...prev.members, email]

      return { ...prev, members: newMembers }
    })
  }

  return {
    handleChange,
    chatValues,
    handleClick
  }
}
