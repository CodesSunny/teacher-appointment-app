import ContextProvider from './ContextProvider.jsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    {/* wrap whole app inside context provider */}
    <ContextProvider>
      <App />
    </ContextProvider>
  </StrictMode>,
)
