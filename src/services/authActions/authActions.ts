import { IAuthValues } from '../../screens/Auth/auth.types.ts'

export const registerNewUser = (user: IAuthValues): boolean => {
  const storedUsers = getStoredUsers()
  const isUserExist = checkUserExist(user)
  if (!isUserExist) {
    const newUser: IAuthValues = {
      email: user.email,
      password: user.password,
    }
    if (newUser.email && newUser.password) {
      storedUsers.push(newUser)
      localStorage.setItem('storedUsers', JSON.stringify(storedUsers))
      return true
    }
    return false
  } else {
    return false
  }
}
export const login = (user: IAuthValues): boolean => {
  const isUserExist = checkUserExist(user)
  if (!isUserExist) {
    return false
  } else {
    return checkPassword(user)
  }
}

export const checkUserExist = (user: IAuthValues): boolean => {
  const storedUsers = getStoredUsers()
  const isUserExist = storedUsers.some((storedUser) => storedUser.email === user.email)

  if (isUserExist) {
    return true
  } else {
    return false
  }
}
export const getStoredUsers = () => {
  const storedUsers: IAuthValues[] = JSON.parse(
    localStorage.getItem('storedUsers') || '[]'
  )
  return storedUsers
}
export const checkPassword = (user: IAuthValues) => {
  const storedUsers = getStoredUsers()

  return storedUsers.some(
    (storedUser) =>
      storedUser.email === user.email && storedUser.password === user.password
  )
}
export const getCurrentEmail = (): string | null  => {
  const currentUserStr = sessionStorage.getItem('currentUser');
  if (!currentUserStr) return null;
  try {
    const currentUser = JSON.parse(currentUserStr);
    return currentUser.username || null;
  } catch (err) {
    return null;
  }
}
