import { useState } from 'react';
import schoolLogo from '../assets/images/school-logo.png';
import { Link } from 'react-router-dom';

const Navbar =()=>{
    const [show, setShow] = useState(true);
    // store nav items in a variable
    const navItems =(
        <>    
                <li className='hover:text-white'><Link to="/" >Home</Link></li>
                <li className='hover:text-white'><Link to="/aboutus" >About Us</Link></li>
                <li className='hover:text-white'><Link to="/services" >Services</Link></li> 
                <li className='hover:text-white'><Link to="/blog" >Blog</Link></li>
                <li className='hover:text-white'><Link to="/contact" >Contact Us</Link></li>
        </>
    )

    

    return (
       <div className='w-full'>
            <header className='relative py-4 px-8 flex bg-black text-white '>
                <div className='w-full flex justify-between items-center'>
                    <div className='basis-3/12 bg-transparent '>
                        <img src={schoolLogo} alt="logo" className='w-10 md:w-16 l fit-content rounded-full border-3 border-blue-800'/>
                    </div>

                    <div className='basis-9/12 sm:flex md:flex gap-4'>
                    {/* hamburger three bars */}
                          <svg
                             onClick={()=> setShow(!show)}
                             className=' w-6 block md:hidden float-end'  fill=" #fff" viewBox="0 0 448 512" title="bars">
                                {show ? 
                                <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" />
                                :
                                <path d="M231.6 256l142.7-142.7c12.5-12.5 12.5-32.8 0-45.3l-22.6-22.6c-12.5-12.5-32.8-12.5-45.3 0L163.6 188.1 20.9 45.4C8.4 32.9-11.9 32.9-24.4 45.4L-47 68c-12.5 12.5-12.5 32.8 0 45.3L95.7 256-47 398.7c-12.5 12.5-12.5 32.8 0 45.3l22.6 22.6c12.5 12.5 32.8 12.5 45.3 0l142.7-142.7 142.7 142.7c12.5 12.5 32.8 12.5 45.3 0l22.6-22.6c12.5-12.5 12.5-32.8 0-45.3L231.6 256z" />
                                
                            }

                          </svg>

                    {show ? 
                     (
                        <nav className='grow ' >
                             <ul className='w-full hidden md:flex justify-evenly gap-4 text-sm  md:text-xl text-blue-600 '>
                                {navItems}
                             </ul>
                        </nav>

                    ): 
                     (
                        
                        <nav className='float-end absolute top-16 right-0 bg-black py-4 px-16 rounded-bl-lg '>
                            <ul className='w-full flex flex-col md:hidden justify-evenly gap-4 text-lg font-semibold  md:text-xl text-blue-600 '>
                                {navItems}
                             </ul>
                        </nav>

                    )}                

                    </div>

                </div>
            </header>

       </div>
    )
}

export default Navbar