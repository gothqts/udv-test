import { createContext, Dispatch, SetStateAction } from 'react'
import { Image, IMessage } from '../../../Auth/auth.types.ts'

interface IMessageContext {
  values: IMessage
  onChange: (value: string | Image[] | Image, name: string) => void
  setMessageValues: Dispatch<SetStateAction<IMessage>>
}

export const generateChatValue = (): IMessage => ({
  id: null,
  senderEmail: '',
  images: [],
  text: '',
})

const defaultContextValue: IMessageContext = {
  values: generateChatValue(),
  onChange: () => {},
  setMessageValues: () => {},
}
const MessageContext = createContext<IMessageContext>(defaultContextValue)
export default MessageContext
