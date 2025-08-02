import { useRef, useState,useEffect } from "react";
import { db } from "../../Firebase"
import { ref, onValue } from "firebase/database";

const AllMessages =()=>{
    const [dbArr, setDbArr] = useState([]);
    
    useEffect(()=>{
        //read msg from database: use same ref when writing database
        const userRef = ref(db, 'users/');
        
        onValue(userRef, (snapshot)=>{
            const allDbData = snapshot.val();
            const dbDataArr = Object.values(allDbData);
            console.log(dbDataArr);
            setDbArr(dbDataArr);        
        })
    }, [])
    
   


    return (
       <div className="w-full">
            <h1 className=" text-center py-4 font-bold"> All Messages  </h1>
            <div className="grid grid-cols-2 gap-6 mt-8">
                {
                    dbArr.map((item,i)=>(
                        <div key={i} className="shadow-lg py-2 px-4 rounded-lg bg-gray-300 text-lg">
                            <p><span className="w-48 inline-block">Id:</span>{item.id}</p>
                            <p><span className="w-48 inline-block">Date:</span>{item.date}</p>
                            <p><span className="w-48 inline-block">Name:</span>{item.name}</p>
                            <p><span className="w-48 inline-block">Message Received:</span>{item.msg }</p>
                        </div>
                    ))
                }
            </div>
       </div>
    )
}

export default AllMessages