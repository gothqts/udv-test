import React, { useContext } from 'react'
import authContext from '../../Auth.context.ts'
import Input from '../../../../shared/Inputs/Input'
import styles from './CredentialsForm.module.css'

interface ICredentialsFormProps {
  authType: 'register' | 'login'
  className?: string
  children: React.ReactNode
  onChange: () => void
}

const CredentialsForm = (props: ICredentialsFormProps) => {
  const context = useContext(authContext)
  return (
    <>
      {props.authType === 'register' && (
        <>
          <div className={styles.title}>Create account</div>
          <div className={styles.body}>
            <Input
              name='email'
              placeholder='email'
              type='email'
              value={context.values.email}
              onChange={context.onChange}
              style={{}}
            />
            <Input
              name='password'
              type='password'
              placeholder='password'
              value={context.values.password}
              onChange={context.onChange}
            />
          </div>
        </>
      )}
      {props.authType === 'login' && (
        <>
          <div className={styles.title}>Sign in</div>
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
        </>
      )}
      {props.children}
    </>
  )
}
export default CredentialsForm

