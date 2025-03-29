import {atom} from 'jotai'
import {IUserProfile} from "./auth.types.ts";
export const initialValue = {
    email: '',
    password: '',
    joinedChats: [],
    token: ''
}
export const authAtom = atom<IUserProfile>(initialValue)