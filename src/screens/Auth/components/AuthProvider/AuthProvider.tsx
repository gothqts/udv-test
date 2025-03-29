import { PropsWithChildren } from 'react'
import Auth from '../../index.tsx'
import { useAtomValue } from 'jotai'
import { authAtom } from '../../auth.atom.ts'

const AuthProvider = (props: PropsWithChildren) => {
  const authState = useAtomValue(authAtom)

  if (!authState.token && (!sessionStorage.getItem('authToken'))) {
    return <Auth />
  }

  return <>{props.children}</>
}

export default AuthProvider
