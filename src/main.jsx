import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import DataContext, { DATA } from './context/DataContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import FilterContext from './context/FilterContext.jsx'
import BasketContext from './context/BasketContext.jsx'

createRoot(document.getElementById('root')).render(
    <FilterContext>
        <DataContext>
            <BasketContext>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </BasketContext>
        </DataContext>
    </FilterContext>
)
