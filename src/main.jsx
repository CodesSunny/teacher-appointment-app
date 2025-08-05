import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MyContext from './Context.jsx'
import ContextProvider from './ContextProvider.jsx'
 
// const [loggedUser,setLoggedUser] = useState(null);

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <ContextProvider>
      <App />

    </ContextProvider>
  </StrictMode>,

)
