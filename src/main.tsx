import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './styles/sanitize.css'
import './styles/ui.css'
import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App/>
    </StrictMode>,
)
