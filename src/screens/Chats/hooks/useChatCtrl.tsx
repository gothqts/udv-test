import { useState } from 'react'
import { IChatRoom } from '../../Auth/auth.types.ts'

const generateEmptyChatValues = (): IChatRoom => ({
  name: '',
  id: null,
  messages: [],
  members: [],
})

export const useChatCtrl = () => {
  const [chatValues, setChatValues] = useState<IChatRoom>(generateEmptyChatValues())

  const handleChange = (value: string, name: string) => {
    setChatValues((prev) => ({ ...prev, [name]: value }))
  }
  const handleClick = (email: string) => {
    setChatValues((prev) => {
      const membersSet = new Set(prev.members)

      if (membersSet.has(email)) {
        membersSet.delete(email)
      } else {
        membersSet.add(email)
      }
      return { ...prev, members: Array.from(membersSet) }
    })
  }

  return {
    handleChange,
    chatValues,
    handleClick,
  }
}
