import { IChatRoom, IMessage } from '../../screens/Auth/auth.types.ts'

export const createChat = (newChat: IChatRoom): boolean => {
  const chats = fetchChats()
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

export const updateChatsMessages = (chatId: number | null, message: IMessage) => {
  if (!chatId) {
    return
  }
  const chats = fetchChats()
  const chatIndex = chats.findIndex((chat) => chat.id === chatId)
  const updatedChat: IChatRoom = {
    ...chats[chatIndex],
    messages: [...chats[chatIndex].messages, message],
  }

  const updatedChats = [...chats]
  updatedChats[chatIndex] = updatedChat
  localStorage.setItem('chats', JSON.stringify(updatedChats))
  sessionStorage.setItem('currentChat', JSON.stringify(updatedChat))
  return { updatedChats, updatedChat }
}

export const getCurrentChat = (): IChatRoom | null => {
  const chatData = sessionStorage.getItem('currentChat')
  return chatData ? JSON.parse(chatData) : null
}
