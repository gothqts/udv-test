import { IChatRoom } from '../../screens/Auth/auth.types.ts'

export const createChat = (chat: IChatRoom) => {
  if (!chat) {
    return false
  } else {
    const chats: IChatRoom[] = JSON.parse(localStorage.getItem('chats') || '[]')
    chats.push(chat)
    localStorage.setItem('chats', JSON.stringify(chats))
    return true
  }
}
export const fetchChats = () => {
  try {
    const storedChats = localStorage.getItem('chats')
    const parsedChats = storedChats ? JSON.parse(storedChats) : []
    console.log('Чаты были запрошены')
    return parsedChats
  } catch (error) {
    console.error('Error parsing chats from localStorage:', error)
    return error
  }
}
