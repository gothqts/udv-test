import { IChatRoom } from '../../screens/Auth/auth.types.ts'

export const createChat = (newChat: IChatRoom): boolean => {
  if (!newChat) {
    return false
  } else {
    const chats: IChatRoom[] = JSON.parse(localStorage.getItem('chats') || '[]')
    if (chats.some((existingChat) => existingChat.name === newChat.name)) {
      return false
    } else {
      chats.push(newChat)
      localStorage.setItem('chats', JSON.stringify(chats))
      return true
    }
  }
}
export const fetchChats = () : IChatRoom[]=> {
  try {
    const storedChats = localStorage.getItem('chats')
    const parsedChats = storedChats ? JSON.parse(storedChats) : []
    return parsedChats
  } catch (error) {
    console.error('Error parsing chats from localStorage:', error)
    return []
  }
}
