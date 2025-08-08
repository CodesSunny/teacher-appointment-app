import React, { useEffect, useState } from 'react'
import MyContext from '../Context';
import { useContext } from 'react'
import { useNavigate,useLocation } from 'react-router-dom';


const ProtectedRoute = ({children, role }) => {
    const {loggedUser}= useContext(MyContext);
    const navigate = useNavigate();
    const [isChildren, setIsChildren ] = useState(false);
    const {pathname} = useLocation();   //useLocation stores current route path 
    
    useEffect(()=>{
        if(loggedUser?.username && loggedUser?.role == role.trim() ){
            setIsChildren(true );
            console.log(pathname);  ///role/dashboard
            navigate(pathname)
        }else(
            navigate('/login', {state:{role }})   //role state stored in history of browser
        ) 
    }, [loggedUser])



  return (
    <div>
        {isChildren ?
            children 
        :(
            <h1> Loading...</h1>
        )
        }
    </div>
  )
}

export default ProtectedRoute