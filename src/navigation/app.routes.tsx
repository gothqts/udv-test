import {IRoute} from './navigation.types.ts'
import {urls} from './app.urls.ts'
import {lazy} from 'react'

const Chats = lazy(() => import('../screens/Chats'))


const appRoutes: IRoute[] = [
    {
        path: urls.chats,
        element: <Chats/>,
    },

]

export default appRoutes
