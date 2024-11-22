import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import DataContext, { DATA } from './context/DataContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
    <DataContext>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </DataContext>
)
