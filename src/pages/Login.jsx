import 'animate.css';
import Swal from 'sweetalert2';
import { object, string,ref } from 'yup';
import { useFormik } from 'formik';
import { useState } from "react";
import loginBg from '../assets/images/bg-login.jpg';
import { Link,useNavigate } from 'react-router-dom';

// define validation schema
let userSchema = object({
  uname: string().min(2).required("required"),
  password:string().min(6).required("required"),
});


// define initial input values
const initialValues={
  uname:"",
  password:"",
}


const Login =()=>{
     const [role, setRole] = useState("");
     const [confirmedRole, setConfirmedRole] = useState("");
     const [remember, setRemember] = useState(false);

     const navigate = useNavigate();

      // define formik function & dstructure methods
      const {values,handleChange,handleBlur,touched,handleSubmit,errors}=useFormik({
        initialValues:initialValues,
        validationSchema:userSchema,
        onSubmit:async (values,action)=>{  //stores input values

            const userList = JSON.parse(localStorage.getItem("formValues")) || [];   //get data from storage or initialize empty list

        // check whether userlist is an aaray
         if (!Array.isArray(userList)) {
                console.error("formValues in localStorage is not an array!");
                await Swal.fire({
                            title: 'Login Error!',
                            text: 'Stored user data is invalid or missing. Please sign up again.',
                            icon: 'error',
                            confirmButtonText: 'Go to Signup'
                        });
                navigate(`/${role}/signup`);
                        return;
             }

         
        //check whether login credentials entered present in localstorage 
        let matchedUser = userList.some((user)=>{ return user.username === values.uname && user.password === values.password  && user.role === role;
        })

        if(!matchedUser){
           await Swal.fire({
                    title: 'invalid credentials!',
                    text: 'Do you want to retry?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Retry',
                    cancelButtonText: 'Cancel',
                    })
            return;   //exit function immediately
        } 

            await Swal.fire({
                      title: 'success!',
                      text: 'Congrats! form submitted successfully',
                      icon: 'success',
                      confirmButtonText: 'Cool'
                     })

            // remember login details
         if(remember){ 
             localStorage.setItem("loggedInUser", JSON.stringify({username: values.uname, role}));  //store username of loggen in user 
                  }
                
        navigate(`/${role}/dashboard`);  //go to dashboard when login successfull           

           } 
      })

 
    return (
       <div style={ { 
                    backgroundImage: `URL(${loginBg})`,  backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100vh',
                    width: '100vw',
                    display:'flex',
                    overflow:'hidden'
                    }} >

                        {/* left side for ..role select */}
            <section className="basis-3/12 h-screen  bg-gray-200 flex flex-col justify-center items-center gap-8 animate__animated animate__slideInLeft">
                <label className="w-36 md:w-48 text-center text-md md:text-lg font-semibold bg-gray-300 p-4 rounded">Select Role:</label>
                <select
                     value={role}
                     onChange={(e)=> {setRole(e.target.value);
                                    setConfirmedRole("");   //reset role on every select 
                                }
                     }
                     className="w-36 md:w-48 text-center md:text-lg font-semibold bg-gray-300 p-4 rounded">
                    <option  value="">-- Select --</option>
                    <option  value="admin" >Admin</option>
                    <option  value="teacher" >Teacher</option>
                    <option  value="student" >Student</option>
                </select>

                 <button 
                    onClick={()=>{
                        if(!role ){   
                            alert("select a role"); 
                        }else{      //ensure role selected
                            alert(`selected role: ${role}`);
                            setConfirmedRole(role);   //update role on every click
                        }
                         
                    }}
                    className='bg-blue-600 text-white px-4 md:px-6 py-2 rounded-lg text-white text-md md:text-xl font-semibold shadow-lg hover:cursor-pointer hover:scale-95'
                 >
                    {/* display login btn text as per role selected or default  */}
                    {role ? (
                              `${role.charAt(0).toUpperCase() + role.slice(1)} Login`
                    ): "Go to Login" }
                </button>

            </section>


            {/* ---------................form container............................. */}
            <section className=" basis-9/12 h-screen rounded-lg p-8  flex flex-col justify-center items-center animate__animated animate__zoomIn">
                    
                        {/* conditional rendering :single form for all roles  */}

                        {confirmedRole && (    //ensure form renders after role selected and btn clicked  
                            <div className=' bg-gray-200 px-8 py-6 rounded-lg shadow-lg shadow-blue-400'>
                               <form
                                    onSubmit={handleSubmit}
                                    action="#" className='flex flex-col items-center gap-4  '>
       
                                    <h1 className=' text-blue-600 w-full text-center text-xl font-bold py-2'>{confirmedRole.charAt(0).toUpperCase() + confirmedRole.slice(1)} Login </h1>
                                    <hr className='bg-black w-full'/>
            
                                    <div className='flex flex-col gap-2 w-48 sm:w-72 md:w-96 '>
                                            <label htmlFor="username" className='text-md md:text-lg'>Username:</label>
                                            <input
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.uname}
                                                name='uname' 
                                                type="username" id='username' placeholder='techsunny'
                                                className='py-2 px-4 rounded bg-gray-300'/>
                                            <span className='text-red-500'> {touched.uname && errors.uname }</span>
                                    </div>
                                    
                                    <div className='flex flex-col gap-2 w-48 sm:w-72 md:w-96 '>
                                            <label htmlFor="password" className='text-md md:text-lg'>Password:</label>
                                            <input
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                                name='password' 
                                                type="password" id='password' placeholder='***' minLength={5}
                                                className='py-2 px-4 rounded bg-gray-300'/>
                                            <span className='text-red-500'>{touched.password && errors.password} </span>
                                    </div>

                                    
                                    <div className='flex items-center gap-2 self-start '>
                                            <label htmlFor="remember" className='text-md md:text-lg'>Remember me:</label>
                                            <input
                                               onChange={()=>{setRemember(!remember)}}
                                               type="checkbox"
                                               id='remember'
                                               checked={remember}
                                               className='rounded bg-gray-300'/>
                                    </div>

                                    <button type="submit" className='bg-blue-600 text-white px-4 md:px-8 py-2 rounded-lg text-white md:text-xl font-semibold shadow-lg hover:cursor-pointer hover:scale-95'>Submit </button>
                               </form>

                                {/* when user not registered : render sign up form  */}
                                <p className='mt-4 text-center'>Not a registered user? 
                                    <span className='ml-2 text-blue-800 hover:cursor-pointer hover:font-semibold' >
                                        <Link to={`/${confirmedRole}/signup`}

                                         > Signup here</Link> 

                                    </span>
                                </p>

                            </div>
                        )}                         
                    

            </section>

            
       </div>
    )
}

export default Login