import { IChatRoom } from '../Auth/auth.types.ts'
import { atom } from 'jotai'

export const chatsAtom = atom<IChatRoom[]>([])
export const currentChatIdAtom = atom<number | null> (null)
export const currentChatAtom = atom(
  (get) => {
    const chats = get(chatsAtom)
    const currentChatId = get(currentChatIdAtom)
    return chats.find((chat) => chat.id === currentChatId) || null
  },
  (get, set, newChat: IChatRoom) => {
    set(currentChatIdAtom, newChat?.id || null)
    if (newChat) {
      set(chatsAtom, (prevChats) =>
        prevChats.map((chat) => (chat.id === newChat.id ? newChat : chat))
      )
    }
  }
)