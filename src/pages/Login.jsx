import 'animate.css';
import Swal from 'sweetalert2';
import { object, string,ref } from 'yup';
import { useFormik } from 'formik';
import { useState } from "react";
import loginBg from '../assets/images/bg-login.jpg';

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

      // define formik function & dstructure methods
      const {values,handleChange,handleBlur,touched,handleSubmit,errors}=useFormik({
        initialValues:initialValues,
        validationSchema:userSchema,
        onSubmit:(values,action)=>{  //stores input values
         console.log(values);
         Swal.fire({
                title: 'success!',
                text: 'Congrats! form submitted successfully',
                icon: 'success',
                confirmButtonText: 'Cool'
})
         action.resetForm(); //empty after submit
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
                    }} >

                        {/* left side for ..role select */}
            <section className="basis-3/12 h-screen  bg-gray-200 flex flex-col justify-center items-center gap-8 animate__animated animate__slideInLeft">
                <label className="w-48 text-center text-lg font-semibold bg-gray-300 p-4 rounded">Select Role:</label>
                <select
                     value={role}
                     onChange={(e)=> setRole(e.target.value)}
                     className="w-48 text-center text-lg font-semibold bg-gray-300 p-4 rounded">
                    <option value="">-- Select --</option>
                    <option value="admin" >Admin</option>
                    <option value="teacher" >Teacher</option>
                    <option value="student" >Student</option>
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
                    className='bg-blue-600 text-white px-6 py-2 rounded-lg text-white text-xl font-semibold shadow-lg hover:cursor-pointer hover:scale-95'
                 >
                    {role ? (
                              `${role.charAt(0).toUpperCase() + role.slice(1)} Login`
                    ): "Go to Login" }
                </button>

            </section>


            {/* ---------................form container............................. */}
            <section className=" basis-9/12 h-screen rounded-lg p-8  flex justify-center items-center animate__animated animate__zoomIn">

                        {/* conditiona rendering :single form for all roles  */}

                        {confirmedRole && (    //ensure form renders after btn clicked
                                <form
                                    onSubmit={handleSubmit}
                                    action="#" className='min-w-[550px] bg-gray-200 py-6 flex flex-col items-center gap-4 rounded-lg '>
       
                               <h1 className=' text-blue-600 w-full text-center text-xl font-bold py-2'>{confirmedRole.charAt(0).toUpperCase() + confirmedRole.slice(1)} Login </h1>
                               <hr className='bg-black w-full'/>
       
                               <div className='flex flex-col gap-2 w-96 '>
                                    <label htmlFor="username" className='text-lg'>Username:</label>
                                    <input
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.uname}
                                        name='uname' 
                                        type="username" id='username' placeholder='techsunny'
                                        className='py-2 px-4 rounded bg-gray-300'/>
                                    <span className='text-red-500'> {touched.uname && errors.uname }</span>
                               </div>
                               
                               <div className='flex flex-col gap-2 w-96 '>
                                    <label htmlFor="password" className='text-lg'>Password:</label>
                                    <input
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        name='password' 
                                        type="password" id='password' placeholder='***' minLength={5}
                                        className='py-2 px-4 rounded bg-gray-300'/>
                                    <span className='text-red-500'>{touched.password && errors.password} </span>
                               </div>

                               <button type="submit" className='bg-blue-600 text-white px-12 py-4 rounded-lg text-white text-xl font-semibold shadow-lg hover:cursor-pointer hover:scale-95'>Submit </button>
                               </form>
                        )}

                    
                    
                    

            </section>

            
       </div>
    )
}

export default Login