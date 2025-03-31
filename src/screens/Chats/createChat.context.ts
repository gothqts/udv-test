import { createContext } from 'react'
import { IChatRoom } from '../Auth/auth.types.ts'

interface IChatContext {
  values: IChatRoom
  onChange: (value: string, name: string) => void
  onClick: (email: string) => void
}

export const generateChatValue = (): IChatRoom => ({
  name: '',
  id: null,
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
