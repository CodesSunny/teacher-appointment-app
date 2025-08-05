import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import MyContext from "./Context"



const ContextProvider =({children})=>{
    const [loggedUser,setLoggedUser] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        const loggedUserInStorage = JSON.parse(localStorage.getItem("loggedInUser"));
        //console.log(loggedUser);  //null as initial value
        if(loggedUserInStorage){ //i.e. loggedUserInStorage is not null but true
            setLoggedUser(loggedUserInStorage);  //update 
            //console.log(loggedUser);  //still null since usestate() doesnt update state immediately but schedules
        }
    },[])


    //for persistent login on page reload/browser reopen
    useEffect(()=>{
        if(loggedUser){ 
            console.log(loggedUser);  //now state updated so value read from localstorage
            navigate(`${loggedUser.role}/dashboard`); //now redirect to role based dashboard 
        }    
    },[loggedUser])


    return(
        <MyContext.Provider value={{loggedUser,setLoggedUser}}>
            {children}  //here children refers to App 
        </MyContext.Provider>
    )
}

export default ContextProvider