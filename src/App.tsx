import {useEffect} from "react";
import { RouterProvider } from 'react-router'
import {urls} from "./navigation/app.urls.ts";
import appRouter from "./navigation/app.router.tsx";
import AuthProvider from './screens/Auth/components/AuthProvider/AuthProvider.tsx'

const App = () => {
    useEffect(() => {
        if (location.pathname === '/') {
            location.replace(urls.chats)
        }
    }, [])
    return (
        <AuthProvider>
            <RouterProvider router={appRouter} />
        </AuthProvider>
    )

}

export default App