import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import 'remixicon/fonts/remixicon.css'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ApproveUsers from '/src/pages/admin/ApproveUsers'
import AllMessages from "/src/pages/admin/AllMessages";
import ManageTeachers from "/src/pages/admin/ManageTeachers";

// Import Swiper styles n modules
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';



const Dashboard =()=>{
    const adminName = JSON.parse(localStorage.getItem("loggedInUser"));  //will give object stored in login page as {username: values.uname, role}
    const navigate = useNavigate();
    const [apiUserData, setApiUserData ] = useState([]);
    const [slideShow, setSlideShow] = useState(false);
    const [activePage, setActivePage] = useState(null);
  

    // random user api   
        const apiData =async ()=> {
            try{
                const res = await fetch('https://randomuser.me/api/?results=20')
                const data = await res.json();
                setApiUserData(data.results );
            }catch(err){
                console.log(err );   
            }
        }


    useEffect(()=>{
        apiData();
    }, [])


    console.log(apiUserData);

 
    return (
       <div className='flex flex-col max-w-full'>
            {/* --------------top bar-------------------- */}
            <h1 className="bg-black pt-6 text-white text-center text-xl">Admin Dashboard </h1>  
            <div className="py-6 px-8 bg-black flex justify-between text-white ">
                
                <div className="flex items-center gap-2">
                    <h2 className='text-lg'>Hi! <span className='text-blue-800 font-semibold text-xl italic'>{adminName.username}</span></h2>
                    <i className="ri-user-line text-2xl"></i>
                </div>

                <button
                    className='bg-blue-800 py-2 px-4 rounded text-lg font-semibold hover:text-blue-900 hover:bg-white hover:cursor-pointer'
                    onClick={()=>{navigate('/login')}}
                 >Logout
                </button>
            </div>


            <main className='w-full flex h-[100%]'>
                {/* ------------------sidebar--------------------------------------------------- */}
                <section className='basis-2/12 bg-black text-white px-4 flex flex-col pt-8 gap-12 min-h-[100vh]'>
                    <button
                        className='bg-blue-800 py-8 rounded text-lg font-semibold hover:text-blue-900 hover:bg-white hover:cursor-pointer'
                        onClick={()=> {setActivePage("addTeacher") ; setSlideShow(true)}}
                        >
                        Add Teacher
                    </button>

                    <button
                        className='bg-blue-800 py-8 rounded text-lg font-semibold hover:text-blue-900 hover:bg-white hover:cursor-pointer'
                        onClick={()=> {setActivePage("deleteTeacher"); setSlideShow(true)}}
                        >
                        Update/Delete Teacher
                    </button>

                    <button
                        className='bg-blue-800 py-8 rounded text-lg font-semibold hover:text-blue-900 hover:bg-white hover:cursor-pointer'
                        onClick={()=> {setActivePage("addSlots"); setSlideShow(true)}}
                        >
                       All Slots
                    </button>

                    <button
                        className='bg-blue-800 py-8 rounded text-lg font-semibold hover:text-blue-900 hover:bg-white hover:cursor-pointer'
                       onClick={()=> {setActivePage("allMessages"); setSlideShow(true)}}
                        >
                        All Mesaages
                    </button>

                </section>


                    {/*------------------ page content---------------------------------------- */}
                    {
                        slideShow ? (
                           //{/* render pages dynimacally on btn clicks */}
                        <section className=' basis-10/12 grow p-8 bg-gray-100 flex justify-center overflow-hidden'>
                        {  activePage === "addTeacher" &&     <ApproveUsers/>    }
                        {  activePage === "deleteTeacher" &&  <ManageTeachers/>    }
                        {  activePage === "addSlots" &&       <ManageTeachers/>   }
                        {  activePage === "allMessages" &&    <AllMessages/>    }
                        </section> 

                        ) : (
                        //{/* //show slides default without click */}
                        <section className=' basis-10/12 grow p-8 bg-gray-100 flex overflow-hidden '>
                                {/* show slides */}
                            <Swiper  navigation={true } pagination={true} modules ={[Navigation,Pagination]} spaceBetween={10} slidesPerView={3} >
                                {
                                    apiUserData.map((user,i)=>(
                                                <SwiperSlide key={i }  >   
                                                    
                                                        <div  className='w-96 bg-white rounded-lg overflow-hidden shadow-lg shadow-pink-400'>
                                                            <img src={user.picture.large} alt="image" className="w-full " />
                                                            <div className='p-2 w-full'>
                                                                <h1 className="text-lg font-semibold text-center text-purple-800 bg-gray-100 w-full"> <span className="mr-[5px]">{user.name.title }</span > <span className="mr-[3px]">{user.name.first}</span> <span >{user.name.last}</span> </h1>
                                                                <p className='flex gap-2'> <span className='block w-24 font-semibold '> Age:</span> <span className='text-blue-800 font-bold '>{user.dob.age }</span></p>
                                                                <p className='flex gap-2'> <span className='block w-24 font-semibold '> City:</span> <span className='text-blue-800 font-bold '>{user.location.city.split(" ")[0]}</span></p>
                                                                <p className='flex gap-2'> <span className='block w-24 font-semibold '> Country:</span> <span className='text-blue-800 font-bold '>{user.location.country}</span></p>
                                                                <p className='flex gap-2'> <span className='block w-24 font-semibold '>Department: </span> <span className='text-blue-800 font-bold '>commerce</span></p>
                                                                <p className='flex gap-2'> <span className='block w-24 font-semibold '> Subject:</span> <span className='text-blue-800 font-bold '>Statistics </span></p>
                                                                <p className='flex gap-2'> <span className='block w-24 font-semibold '>Contact: </span> <span className='text-blue-800 font-bold '> {user.cell}  </span></p>
                                                                <p className='flex gap-2'> <span className='block w-24 font-semibold '>Email: </span> <span className='text-blue-800 text-md '> {user.email}  </span></p>
                                                            </div>
                                                        </div>

                                                </SwiperSlide>
                                                ))

                                                    
                                }
                            </Swiper>   
                        
                        </section>
                        )

                    }

                
            </main>

       </div>
    )
}

export default Dashboard