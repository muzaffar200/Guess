import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import DataContext, { DATA } from './context/DataContext.jsx'

createRoot(document.getElementById('root')).render(
    <DataContext>
        <App />
    </DataContext>
)
