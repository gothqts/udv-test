import { FormEvent, useState } from 'react'
import { IAuthValues } from '../auth.types.ts'
import { useSetAtom } from 'jotai'
import { authAtom } from '../auth.atom.ts'
import { generateAndStoreUserData } from '../../../utils/generateToken.ts'
import { login, registerNewUser } from '../../../services/authActions/authActions.ts'

interface IProps {
  actionType: 'register' | 'login'
  setAuthType: () => void
}

const generateEmptyAuthValues = (): IAuthValues => ({
  email: '',
  password: '',
})

const useAuthCtrl = (props: IProps) => {
  const [authValues, setAuthValues] = useState(generateEmptyAuthValues())
  const setAuthState = useSetAtom(authAtom)

  const handleChange = (value: string, name: string) => {
    setAuthValues((prev) => ({ ...prev, [name]: value }))
  }
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (props.actionType === 'register') {
      const isRegistrationSuccess = registerNewUser(authValues)

      if (isRegistrationSuccess) {
        const token = generateAndStoreUserData(authValues.email)
        setAuthState((prev) => ({
          ...prev,
          ...authValues,
          token: token,
        }))
      } else {
        alert('Пользователь с таким именем уже существует')
      }
    } else {
      const isLoginSuccess = login(authValues)
      if (isLoginSuccess) {
        generateAndStoreUserData(authValues.email)
        setAuthState((prev) => ({
          ...prev,
          ...authValues,
        }))
      } else {
        alert('Неправильное имя пользователя или пароль')
      }
    }
  }

  return { authValues, handleChange, handleSubmit }
}

export default useAuthCtrl
