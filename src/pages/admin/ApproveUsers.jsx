import { db } from "../../Firebase";
import { ref,set } from "firebase/database";
import 'remixicon/fonts/remixicon.css'
import './ApproveUsers.css';
import Swal from 'sweetalert2';

   

const ApproveUsers =()=>{
    // fetch local storage to receive registered teachetrs data
    const allRegisteredUsers = JSON.parse(localStorage.getItem("formValues")) || [];

    const allRegisteredTeachers = allRegisteredUsers.filter((user)=> user.role === "teacher");
    const allRegisteredStudents = allRegisteredUsers.filter((user)=> user.role === "student");
    
    const approveCandidate=(e)=>{
        console.log((e.target));
        Swal.fire({
            title: 'Approved',
            text: 'congrats!',
            icon: 'success',
        }
        )
        
    } 


    const rejectCandidate=(e)=>{
        console.log((e.target));
        Swal.fire({
            title: 'Rejected',
            text: 'Sorry! u r rejected',
            icon: 'error',
        }
        )
        
    } 

    const handleMsg=(e,userId)=>{
        const message = e.target.value.trim();
        if(!message) return;
        
        // write msg 
         set(ref(db, 'users/' + userId),{
           msg : message,
           id: userId
         })
         
         Swal.fire({
             title: 'ok',
             text: 'message sent',
             icon: 'success',
         })

         e.target.value = "";  //reset      
        }





    return (

        <div>
            {/* teachers table */}
            <h1 className='text-center text-xl font-bold mb-4 text-shadow-lg text-shadow-purple-300'>Pending Teachers approval </h1>
            <table >
                <thead>
                    <tr>
                        <th >SN</th>
                        <th >Teacher ID</th>
                        <th >Name of Teacher</th>
                        <th >Age </th>
                        <th >Contact No  </th>
                        <th >Qualification </th>
                        <th >Department </th>
                        <th >Subject of interest</th>
                        <th colSpan={3}>Action </th>

                    </tr>
                </thead>

                <tbody>
                        {
                            allRegisteredTeachers.map((item,index)=>(
                                <tr key={index}>
                                    <td >{index + 1}</td>
                                    <td >{item.teacherId } </td>
                                    <td >{item.fullname } </td>
                                    <td >{item.age }</td>
                                    <td >{item.mobile }</td>
                                    <td >{item.qualification }</td>
                                    <td >Commerce </td>
                                    <td >Accounts </td>
                                    <td >
                                        <button
                                            onClick={(e)=>approveCandidate(e)}
                                            className='btn approve'>Approve</button> 
                                    </td>
                                    <td >
                                        <button 
                                            onClick={(e)=>rejectCandidate(e)}
                                            className='btn reject'>Reject</button>  
                                    </td>
                                    <td >
                                        <textarea
                                            onBlur={(e)=>handleMsg( e,item.teacherId)}
                                            name="Message" id="Message" placeholder='..write msg'/>
                                    </td>
                                </tr>
                            ))
                        }
                   
                </tbody>
            </table>
           

            {/* students table */}
            <h1 className='text-center text-xl font-bold my-4 text-shadow-lg text-shadow-purple-300'>Pending Students approval </h1>
            <table >
                <thead>
                    <tr>
                        <th >SN</th>
                        <th >Student ID</th>
                        <th >Name of Student</th>
                        <th >Age </th>
                        <th >Contact No  </th>
                        <th >School Name </th>
                        <th >Current Class </th>
                        <th >Requested Subject</th>
                        <th colSpan={3}>Action </th>

                    </tr>
                </thead>
                <tbody>

                      {
                            allRegisteredStudents.map((item,index)=>(
                                <tr key={index}>
                                    <td >{index + 1}</td>
                                    <td >{item.studentId } </td>
                                    <td >{item.fullname } </td>
                                    <td >{item.age }</td>
                                    <td >{item.mobile }</td>
                                    <td >{item.school }</td>
                                    <td >{item.class } </td>
                                    <td >Accounts </td>
                                    <td >
                                        <button
                                            onClick={(e)=>approveCandidate(e)}
                                            className='btn approve'>Approve</button>
                                    </td>
                                    <td >
                                        <button 
                                            onClick={(e)=>rejectCandidate(e)}
                                            className='btn reject'>Reject</button>   
                                    </td>
                                    <td >
                                        <textarea 
                                             onBlur={(e)=>handleMsg( e,item.studentId)}
                                            name="Message" id="Message" placeholder='..write msg'/>
                                    </td>
                                </tr>
                            ))
                        }
                   
                </tbody>
            </table>
        </div>
    )
}

export default ApproveUsers