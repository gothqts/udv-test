import { createContext } from 'react'
import { IChatRoom } from '../Auth/auth.types.ts'

interface IChatContext {
  values: IChatRoom
  onChange: (value: any, name: string) => void
  onClick: (email: string) => void
}

export const generateChatValue = (): IChatRoom => ({
  name: '',
  id: Date.now() + Math.floor(Math.random() * 1000),
  messages: [],
  members: [],
})

const defaultContextValue: IChatContext = {
  values: generateChatValue(),
  onChange: () => {},
  onClick: () => {},
}
const CreateChatContext = createContext<IChatContext>(defaultContextValue)
export default CreateChatContext
