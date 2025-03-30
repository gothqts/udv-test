import CredentialsForm from './components/CredentialsForm/CredentialsForm.tsx'
import AuthContext from './Auth.context.ts'
import useAuthCtrl from './hooks/useAuthCtrl.tsx'
import { useState } from 'react'
import styles from './Auth.module.css'
import { AuthTypeEnum } from '../../enums/authTypeEnum.ts'

const Auth = () => {
  const [authType, setAuthType] = useState(AuthTypeEnum.login)
  const authCtrl = useAuthCtrl({
    actionType: authType,
    setAuthType: () => setAuthType(AuthTypeEnum.login),
  })

  const changeType = () => {
    authType === AuthTypeEnum.register
      ? setAuthType(AuthTypeEnum.login)
      : setAuthType(AuthTypeEnum.register)
  }

  const renderContent = () => {
    return (
      <CredentialsForm authType={authType} onChange={changeType}>
        {authType === AuthTypeEnum.login && (
          <div className={styles.span_wrapper}>
            New to chat?
            <span className={styles.span} onClick={changeType}>
              create your account
            </span>
          </div>
        )}
        {authType === AuthTypeEnum.register && (
          <div>
            <div className={styles.span_wrapper}>
              Already have an account?
              <span className={styles.span} onClick={changeType}>
                Sign in
              </span>
            </div>
          </div>
        )}
      </CredentialsForm>
    )
  }
  return (
    <div className={styles.wrapper}>
      <AuthContext.Provider
        value={{
          values: authCtrl.authValues,
          onChange: authCtrl.handleChange,
        }}
      >
        <div className={styles.form_wrapper}>
          <form className={styles.form} onSubmit={authCtrl.handleSubmit}>
            {renderContent()}
            <div className={styles.btn_wrapper}>
              <button className={styles.btn}>continue</button>
            </div>
          </form>
        </div>
      </AuthContext.Provider>
    </div>
  )
}

export default Auth
