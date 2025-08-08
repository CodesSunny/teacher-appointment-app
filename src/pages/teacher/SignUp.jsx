import 'animate.css';
import Swal from 'sweetalert2';
import {useFormik } from 'formik';
import { object, string,ref, number } from 'yup';
import { useNavigate } from 'react-router-dom';
import  loginBg from '../../assets/images/bg-login.jpg'

// define validation/error msg 
const teacherFormSchema = object({
                fullname: string()
                    .min(3, "Full Name must be at least 3 characters")
                    .required("Full Name is required"),

                email: string()
                    .email("Invalid email address")
                    .required("Email is required"),

                mobile: string()
                    .matches(/^[6-9]\d{9}$/, " must be a valid 10-digit Indian number")
                    .required("mobile number is required"),

                username: string()
                    .min(4, "Username must be at least 4 characters")
                    .required("Username is required"),

                age: number().min(18).required("age is required"),

                qualification: string(),

                experience:number(),

                password: string()
                    .min(6, "Password must be at least 6 characters")
                    .matches(/[A-Z]/, "Must include at least one uppercase letter")
                    .matches(/[a-z]/, "Must include at least one lowercase letter")
                    .matches(/\d/, "Must include at least one number")
                    .matches(/[@$!%*?&#]/, "Must include at least one special character")
                    .required("Password is required"),

                cpw: string()
                    .oneOf([ref('password')], "Passwords must match")
                    .required("Please confirm your password"),
                 });





const SignUp =()=>{

    const navigate = useNavigate();
    const date = new Date().toDateString().slice(4).split(" ").join("");
    const randomNums =Math.floor(Math.random() * 900) + 100;
    const myid = "Teacher"+ randomNums+ date ;
    console.log(myid);  //Teacher659Aug022025
    
    
    const initialValues = {
        fullname: "", 
        email:"",
        mobile:"",
        username :"",
        age:"",
        password:"",
        cpw:"",
        role:"teacher",
        teacherId: "Teacher"+ randomNums+ date
        // teacherId:crypto.randomUUID()
    };  
    
    
    const userList = JSON.parse(localStorage.getItem("formValues"))  || [];

    const {handleSubmit, handleChange, handleBlur, values,errors, touched} = useFormik({
        initialValues: initialValues,
        validationSchema: teacherFormSchema,
        onSubmit: (values, actions)=>{
            console.log(values);
            userList.forEach((user) => {
                if(user.username.toLowerCase() === values.username.toLowerCase()  ||  user.email.toLowerCase() === values.email.toLowerCase()){
                    alert("already registered");   //prevent duplicate entry
                    return;
                }
                
            })

            userList.push(values);   //append new entry
            localStorage.setItem("formValues", JSON.stringify(userList));

            Swal.fire({
                      title: 'success!',
                      text: 'Congrats! form submitted successfully',
                      icon: 'success',
                      confirmButtonText: 'Cool'
                     })
                     
            actions.resetForm();
            // after successful register redirect to login page
             navigate('/login');
        }
    })


    return (
        <div 
            style={{ 
                                    backgroundImage: `URL(${loginBg})`,  backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    minHeight: '100vh',
                                    width: '100vw',
                                    display:'flex',
                                    justifyContent:'center',
                                    alignItems:'center',
                                    overflow:'hidden'
                                    }} >
            
              <div className='bg-gray-200 px-6 py-2 md:py-8 rounded-lg shadow-lg shadow-blue-400 animate__animated animate__backInLeft'>
                <form
                    onSubmit={handleSubmit}
                    action="#"
                    className='px-8 md:gap-2 flex flex-col items-center rounded-lg animate__animated animate__backInLeft'>

                    <h1 className='w-full py-2 font-bold text-blue-800 text-3xl text-center border-b-3 mb-4 '> Teacher Registration Page </h1>
                    
                    <div className='flex flex-col md:flex-row gap-2 self-stretch md:items-center px-2 py-2 rounded-md'>
                        <label htmlFor="fullname" className='text-lg'>Fullname:</label>
                        <input
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.fullname}
                            name='fullname'
                            type="text" id='fullname' placeholder='enter full name here' className='grow py-2 px-4 bg-gray-100 rounded'
                        />    
                        <span className='text-red-500'>{touched.fullname && errors.fullname} </span>
                    </div>

                    <div className='flex flex-col md:flex-row md:gap-2'>
                        <div className='flex flex-col gap-1 md:w-96 w-screen px-4 rounded-md'>
                            <label htmlFor="email" className='text-lg '>E-mail:</label>
                            <input
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                name='email' 
                                type="email" id='email' placeholder='abc@mail.com' className='py-2 px-4 bg-gray-100 rounded'/>
                            <span className='text-red-500'> {touched.email && errors.email } </span>
                        </div>

                        <div className='flex flex-col gap-1 md:w-96 w-screen px-4 rounded-md'>
                            <label htmlFor="mobile" className='text-lg'>Mobile No:</label>
                            <input
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.mobile}
                                name='mobile' 
                                type="tel" id='mobile' placeholder='enter ur mobile no here' maxLength="10" className='py-2 px-4 bg-gray-100 rounded'/>
                            <span className='text-red-500'>{touched.mobile && errors.mobile } </span>
                        </div>
                    </div>

                    <div className='flex flex-col md:flex-row md:gap-2'>
                        <div className='flex flex-col gap-1 md:w-96 w-screen px-4 rounded-md'>
                            <label htmlFor="username" className='text-lg'>Username:</label>
                            <input
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.username}
                                name='username'
                                type="text" id='username'placeholder='techsunny' className='py-2 px-4 bg-gray-100 rounded'
                            />    
                            <span className='text-red-500'>{touched.username && errors.username} </span>
                        </div>

                        <div className='flex flex-col gap-1 md:w-96 w-screen px-4 rounded-md'>
                            <label htmlFor="age" className='text-lg'>Age:</label>
                            <input
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.age}
                                name='age'
                                type="number" id='age'placeholder='25' className='py-2 px-4 bg-gray-100 rounded'
                            />    
                            <span className='text-red-500'>{touched.age && errors.age} </span>
                        </div>

                    </div>

                    <div className='flex flex-col md:flex-row md:gap-2'>
                        <div className='flex flex-col gap-1 md:w-96 w-screen px-4 rounded-md'>
                            <label htmlFor="qualification" className='text-lg'>Highest Qualification:</label>
                            <select 
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.qualification}
                                name="qualification"
                                className='py-2 px-4 bg-gray-100 rounded text-gray-500'
                                >
                                <option  value="">Select</option>
                                <option  value="mba">MBA</option>
                                <option  value="ba">BA</option>
                                <option  value="B.sc.">B.sc.</option>
                                <option  value="CA">CA</option>
                                <option  value="M.Com">M.Com</option>
                                <option  value=".A.">M.A.</option>
                                <option  value="MCA">MCA</option>
                                <option  value="M. Sc.">M. Sc.</option>
                                <option  value="B. Com.">B. Com.</option>
                                <option  value="B.Tech.">B.Tech.</option>
                                <option  value="Others">Others </option>
                                
                            </select>
                            <span className='text-red-500'>{touched.qualification && errors.qualification} </span>
                        </div>

                        <div className='flex flex-col gap-1 md:w-96 w-screen px-4 rounded-md'>
                            <label htmlFor="experience" className='text-lg'>Experience:</label>
                            <input
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.experience}
                                name='experience'
                                type="number" id='experience'placeholder='3 years' className='py-2 px-4 bg-gray-100 rounded'
                            />    
                            <span className='text-red-500'>{touched.experience && errors.experience} </span>
                        </div>

                    </div>

                    <div className='flex flex-col md:flex-row md:gap-2'>
                        <div className='flex flex-col gap-1 md:w-96 w-screen px-4 rounded-md'>
                            <label htmlFor="password" className='text-lg'>Password:</label>
                            <input
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                name='password' 
                                type="password" id='password' placeholder='******' minLength={6} className='py-2 px-4 bg-gray-100 rounded'/>
                            <span className='text-red-500'> {touched.password && errors.password} </span>
                        </div>

                        <div className='flex flex-col gap-1 md:w-96 w-screen px-4 rounded-md'>
                            <label htmlFor="cpw" className='text-lg'>Confirm Password:</label>
                            <input
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.cpw}
                                name='cpw' 
                                type="text" id='cpw' placeholder='enter same password' className='py-2 px-4 bg-gray-100 rounded'/>
                            <span className='text-red-500'> {touched.cpw && errors.cpw} </span>
                        </div>
                    </div>                                                                                                                                
                    <button type="submit" className='bg-blue-600 text-white px-6 md:px-8 py-2 rounded-lg text-white md:text-xl font-semibold shadow-lg hover:cursor-pointer hover:scale-95'> Register </button>
                </form>
             </div>
        </div>
    )
}

export default SignUp