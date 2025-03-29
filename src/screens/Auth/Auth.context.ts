import {createContext} from "react";
import {IAuthValues} from "./auth.types.ts";

interface IAuthContext {
    values: IAuthValues,
    onChange: (value: any, name: string) => void
}

export const generateInputValue = (): IAuthValues => ({
    email: '',
    password: ''
})


const AuthContext = createContext<IAuthContext>({
    values: generateInputValue(), onChange: () => {
    }
})
export default AuthContext