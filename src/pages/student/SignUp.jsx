import 'animate.css';
import Swal from 'sweetalert2';
import {useFormik } from 'formik';
import { object, string,ref, number } from 'yup';
import { useNavigate } from 'react-router-dom';

// define validation/error msg 
const studentFormSchema = object({
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

                class: string().required("class is required"),

                school:string().required("school is required"),

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

    const initialValues = {
        fullname: "", 
        email:"",
        mobile:"",
        username :"",
        age:"",
        class:"",
        school:"",
        password:"",
        cpw:"",
        role:"student",
        studentId:crypto.randomUUID()
    };  

    const userList = JSON.parse(localStorage.getItem("formValues")) || [];   //get data from storage or initialize empty array

    const {handleSubmit, handleChange, handleBlur, values,errors, touched} = useFormik({ 
        initialValues: initialValues,
        validationSchema: studentFormSchema,
        onSubmit: (values, actions)=>{
            console.log(values);  //object
            console.log(Array.isArray(userList));  //true

            // if duplicate alert , fresh append
            userList.forEach((user) => {
                if(user.email.trim().toLowerCase() === values.email.trim().toLowerCase() || user.username.trim().toLowerCase() === values.username.trim().toLowerCase()){  
                    alert("already present");     //duplicate entry
                    return; 
                }
            });
            

            //new entry
            userList.push(values);   //push new objects into array
            localStorage.setItem("formValues", JSON.stringify(userList));  //save updated students data array
            
            console.log(userList );
            

            Swal.fire({
                      title: 'success!',
                      text: 'Congrats! form submitted successfully',
                      icon: 'success',
                      confirmButtonText: 'Cool'
                     })
                     
            actions.resetForm();   //empty form after registeration

            // after successful register redirect to login page
             navigate('/login');
        }
    })


    return (
        <div className=' bg-[#456882] h-screen py-6 flex justify-center items-center'>
            
            
            <form
                onSubmit={handleSubmit}
                action="#" className='bg-[#1B3C53] px-8 py-4 flex flex-col items-center gap-6 rounded-lg shadow-lg shadow-red-900 animate__animated animate__backInLeft'>

                <h1 className='w-full py-2 font-bold text-blue-800 text-3xl text-center border-b-3 mb-4 '> Student Registration Page </h1>
                
                <div className='flex gap-2 self-stretch items-center px-2 py-2 shadow-lg shadow-blue-900 rounded-md'>
                    <label htmlFor="fullname" className='text-xl text-blue-800 font-semibold'>Fullname:</label>
                    <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.fullname}
                        name='fullname'
                        type="text" id='fullname' placeholder='enter full name here' className='grow py-2 px-4 bg-[#3E5879] text-white rounded'
                    />    
                    <span className='text-red-500'>{touched.fullname && errors.fullname} </span>
                </div>

                <div className='flex gap-2'>
                    <div className='flex flex-col gap-1 w-96 px-4 py-2 shadow-lg shadow-blue-900 rounded-md'>
                        <label htmlFor="email" className='text-lg text-blue-800 font-semibold'>E-mail:</label>
                        <input
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            name='email' 
                            type="email" id='email' placeholder='abc@mail.com' className='py-2 px-4 bg-[#3E5879] text-white rounded'/>
                        <span className='text-red-500'> {touched.email && errors.email } </span>
                    </div>

                    <div className='flex flex-col gap-1 w-96 px-4 py-2 shadow-lg shadow-blue-900 rounded-md'>
                        <label htmlFor="mobile" className='text-lg text-blue-800 font-semibold'>Mobile No:</label>
                        <input
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.mobile}
                            name='mobile' 
                            type="tel" id='mobile' placeholder='enter ur mobile no here' maxLength="10" className='py-2 px-4 bg-[#3E5879] text-white rounded'/>
                        <span className='text-red-500'>{touched.mobile && errors.mobile } </span>
                    </div>
                </div>

                <div className='flex gap-2'>
                    <div className='flex flex-col gap-1 w-96 px-4 py-2 shadow-lg shadow-blue-900 rounded-md'>
                        <label htmlFor="username" className='text-lg text-blue-800 font-semibold'>Username:</label>
                        <input
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                            name='username'
                            type="text" id='username'placeholder='techsunny' className='py-2 px-4 bg-[#3E5879] text-white rounded'
                        />    
                        <span className='text-red-500'>{touched.username && errors.username} </span>
                    </div>

                    <div className='flex flex-col gap-1 w-96 px-4 py-2 shadow-lg shadow-blue-900 rounded-md'>
                        <label htmlFor="age" className='text-lg text-blue-800 font-semibold'>Age:</label>
                        <input
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.age}
                            name='age'
                            type="number" id='age'placeholder='25' className='py-2 px-4 bg-[#3E5879] text-white rounded'
                        />    
                        <span className='text-red-500'>{touched.age && errors.age} </span>
                    </div>

                </div>

                  <div className='flex gap-2'>
                    <div className='flex flex-col gap-1 w-96 px-4 py-2 shadow-lg shadow-blue-900 rounded-md'>
                        <label htmlFor="class" className='text-lg text-blue-800 font-semibold'>Class:</label>
                         <select 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.class}
                            name="class"
                            className='py-2 px-4 bg-[#3E5879] text-white rounded'
                            >
                            <option  value="">Select Current Class</option>
                            <option  value="12">12th</option>
                            <option  value="11">11th</option>
                            <option  value="10">10th</option>
                            <option  value="8">8th</option>
                            <option  value="7">7th</option>
                            <option  value="6">6th</option>
                            <option  value="5">5th</option>
                            <option  value="4">4th</option>
                            <option  value="3">3rd</option>
                            <option  value="2">2nd</option>
                            <option  value="1">1st</option>
                            <option  value="Others">Others </option>
                            
                         </select>
                        <span className='text-red-500'>{touched.class && errors.class} </span>
                    </div>

                    <div className='flex flex-col gap-1 w-96 px-4 py-2 shadow-lg shadow-blue-900 rounded-md'>
                        <label htmlFor="school" className='text-lg text-blue-800 font-semibold'>School/College:</label>
                        <input
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.school}
                            name='school'
                            type="text" id='school'placeholder='abs public' className='py-2 px-4 bg-[#3E5879] text-white rounded'
                        />    
                        <span className='text-red-500'>{touched.school && errors.school} </span>
                    </div>

                </div>

                <div className='flex gap-2'>
                    <div className='flex flex-col gap-1 w-96 px-4 py-2 shadow-lg shadow-blue-900 rounded-md'>
                        <label htmlFor="password" className='text-lg text-blue-800 font-semibold'>Password:</label>
                        <input
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            name='password' 
                            type="password" id='password' placeholder='******' minLength={6} className='py-2 px-4 bg-[#3E5879] text-white rounded'/>
                        <span className='text-red-500'> {touched.password && errors.password} </span>
                    </div>

                    <div className='flex flex-col gap-1 w-96 px-4 py-2 shadow-lg shadow-blue-900 rounded-md'>
                        <label htmlFor="cpw" className='text-lg text-blue-800 font-semibold'>Confirm Password:</label>
                        <input
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.cpw}
                            name='cpw' 
                            type="text" id='cpw' placeholder='enter same password' className='py-2 px-4 bg-[#3E5879] text-white rounded'/>
                        <span className='text-red-500'> {touched.cpw && errors.cpw} </span>
                    </div>
                </div>                                                                                                                                
                <button type="submit" className='bg-blue-800 px-8 py-2 rounded-lg text-white text-xl font-semibold shadow-md shadow-red-500 hover:cursor-pointer hover:scale-95'> Register </button>
            </form>


        </div>
    )
}

export default SignUp