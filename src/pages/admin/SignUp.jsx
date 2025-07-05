
import {useFormik } from 'formik';
import { object, string,ref } from 'yup';

// define validation/error msg 
const adminFormSchema = object({
                fullName: string()
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

    const initialValues = {
        fullname: "",   //same as in id/name property
        email:"",
        mobile:"",
        username :"",
        password:"",
        cpw:""
    };  

    const {handleSubmit, handleChange, handleBlur, values,errors, touched} = useFormik({
        initialValues: initialValues,
        validationSchema: adminFormSchema,
        onSubmit: (values, actions)=>{
            console.log(values);
            actions.resetForm();
        }
    })


    return (
        <div className=' bg-gray-200 w-screen flex justify-center'>
            
            
            <form
                onSubmit={handleSubmit}
                action="#" className='bg-gray-300 px-8 py-4 flex flex-col justify-center items-center gap-4'>

                <h1 className='w-full py-2 font-bold text-blue-800 text-2xl text-center bg-gray-300 border-b-3 mb-8 '> Admin Registration Page </h1>
                <div className='flex flex-col gap-1 w-96 px-4 py-2 shadow-lg shadow-gray-500 rounded-md'>
                    <label htmlFor="fullname" className='text-lg'>Fullname:</label>
                    <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.fullname}
                        name='fullname'
                        type="text" id='fullname'placeholder='enter full name here' className='py-2 px-4 bg-gray-100 rounded'
                    />    
                    <span className='text-red-500'>{touched.fullname && errors.fullname} </span>
                </div>

                <div className='flex flex-col gap-1 w-96 px-4 py-2 shadow-lg shadow-gray-500 rounded-md'>
                    <label htmlFor="email" className='text-lg'>E-mail:</label>
                    <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        name='email' 
                        type="email" id='email' placeholder='abc@mail.com' className='py-2 px-4 bg-gray-100 rounded'/>
                    <span className='text-red-500'> {touched.email && errors.email } </span>
                </div>

                <div className='flex flex-col gap-1 w-96 px-4 py-2 shadow-lg shadow-gray-500 rounded-md'>
                    <label htmlFor="mobile" className='text-lg'>Mobile No:</label>
                    <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.mobile}
                        name='mobile' 
                        type="tel" id='mobile' placeholder='enter ur mobile no here' maxLength="10" className='py-2 px-4 bg-gray-100 rounded'/>
                    <span className='text-red-500'>{touched.mobile && errors.mobile } </span>
                </div>

                <div className='flex flex-col gap-1 w-96 px-4 py-2 shadow-lg shadow-gray-500 rounded-md'>
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

                <div className='flex flex-col gap-1 w-96 px-4 py-2 shadow-lg shadow-gray-500 rounded-md'>
                    <label htmlFor="password" className='text-lg'>Password:</label>
                    <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        name='password' 
                        type="password" id='password' placeholder='******' minLength={6} className='py-2 px-4 bg-gray-100 rounded'/>
                    <span className='text-red-500'> {touched.password && errors.password} </span>
                </div>

                <div className='flex flex-col gap-1 w-96 px-4 py-2 shadow-lg shadow-gray-500 rounded-md'>
                    <label htmlFor="cpw" className='text-lg'>Confirm Password:</label>
                    <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.cpw}
                        name='cpw' 
                        type="text" id='cpw' placeholder='enter same password' className='py-2 px-4 bg-gray-100 rounded'/>
                    <span className='text-red-500'> {touched.cpw && errors.cpw} </span>
                </div>
                                                                                                                                                
                <button type="submit" className='bg-blue-800 px-8 py-4 rounded-lg text-white text-xl font-semibold shadow-lg hover:cursor-pointer hover:scale-95'> Register </button>
            </form>


        </div>
    )
}

export default SignUp