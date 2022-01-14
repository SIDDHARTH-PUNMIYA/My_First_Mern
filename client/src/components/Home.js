import React, { useEffect, useState } from 'react'
const Home = () => {
 const [userdata, setuserdata] = useState({name :"",work:""});
   
 const Aboutrender = async () => {
    try {
        const res = await fetch('/getdata', {
            method: "GET",
            credentials:"include",
             
            headers: {
                "Content-Type": "application/json",

            },
        })

        const data = await res.json();
        setuserdata({...userdata,name:data.name,work:data.work});
        
    } catch (e) {
        console.log(e);
    }
}
useEffect(() => {
    // we cant use async function in useEffect    
    Aboutrender();

}, [])
    return (
        <>
       
        <div className="tocent">
     <p className="pt-5" style={{fontSize:"3rem" ,color:"orangered"}}>Welcome </p>
    { userdata.name ?
            <h1>I AM {userdata.name} and want to  be {userdata.work}</h1>:
            <h1>We are the MERN DEVELOPER</h1>
       } </div>
         </>
    )
}

export default Home
