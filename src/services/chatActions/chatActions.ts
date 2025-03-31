import { IChatRoom } from '../../screens/Auth/auth.types.ts'

export const createChat = (newChat: IChatRoom): boolean => {
  const chats: IChatRoom[] = JSON.parse(localStorage.getItem('chats') || '[]')
  if (chats.some((existingChat) => existingChat.name === newChat.name)) {
    return false
  } else {
    chats.push(newChat)
    localStorage.setItem('chats', JSON.stringify(chats))
    return true
  }
}

export const fetchChats = (): IChatRoom[] => {
  const storedChats = localStorage.getItem('chats')
  return storedChats ? JSON.parse(storedChats) : []
}
