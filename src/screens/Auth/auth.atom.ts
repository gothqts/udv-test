import {atom} from 'jotai'
import {IUserProfile} from "./auth.types.ts";
export const initialValue : IUserProfile= {
    email: '',
    password: '',
    token: ''
}
export const authAtom = atom<IUserProfile>(initialValue)