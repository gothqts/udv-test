import { useEffect } from 'react'
import { RouterProvider } from 'react-router'
import { urls } from './navigation/app.urls.ts'
import appRouter from './navigation/app.router.tsx'
import AuthProvider from './screens/Auth/components/AuthProvider/AuthProvider.tsx'
import AdaptiveProvider from './shared/Adaptive'

const App = () => {
  useEffect(() => {
    if (location.pathname === '/') {
      location.replace(urls.chats)
    }
  }, [])
  return (
    <AdaptiveProvider>
      <AuthProvider>
        <RouterProvider router={appRouter} />
      </AuthProvider>
    </AdaptiveProvider>
  )
}

export default App
