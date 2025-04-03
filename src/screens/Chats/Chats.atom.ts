import { IChatRoom } from '../Auth/auth.types.ts'
import { atom } from 'jotai'
import { getStoredUsers } from '../../services/authActions/authActions.ts'

export const chatsAtom = atom<IChatRoom[]>([])
export const pickedChatAtom = atom<IChatRoom | null>(null)
export const storedUsers = atom(getStoredUsers())
