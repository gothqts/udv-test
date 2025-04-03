import { PropsWithChildren, useContext } from 'react'
import authContext from '../../Auth.context.ts'
import Input from '../../../../shared/Inputs/TextInput'
import styles from './CredentialsForm.module.css'

interface ICredentialsFormProps {
  authType: 'register' | 'login'
}

const CredentialsForm = (props: PropsWithChildren<ICredentialsFormProps>) => {
  const context = useContext(authContext)
  return (
    <>
      <div className={styles.title}>
        {props.authType === 'register' ? 'Create account' : 'Sign in'}
      </div>
      <div className={styles.body}>
        <Input
          name='email'
          placeholder='email'
          type='email'
          value={context.values.email}
          onChange={context.onChange}
        />
        <Input
          name='password'
          type='password'
          placeholder='password'
          value={context.values.password}
          onChange={context.onChange}
        />
      </div>

      {props.children}
    </>
  )
}
export default CredentialsForm
