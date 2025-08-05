import { useState } from "react"
import MyContext from "./Context";


const ContextProvider =({children })=>{


const [loggedUser,setLoggedUser] = useState(null);

    return(
        <MyContext.Provider value={{loggedUser,setLoggedUser}}>
            {children }
        </MyContext.Provider>
    )
}

export default ContextProvider