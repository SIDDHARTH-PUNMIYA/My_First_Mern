import React, { useEffect, useState } from 'react'
import home from '../images/Profile.jpg'
import {useNavigate} from 'react-router-dom'
const About = () => {
const nav = useNavigate();
const [userdata, setuserdata] = useState({});
const Aboutrender= async()=>{
    try {
            const res= await fetch('/about',{
                    method:"GET",
                    credentials:"include",
            headers:{
                    "Content-Type" :"application/json",
                    Accept :"application/json",

                    },
            })

                const data= await res.json();
               setuserdata(data);
                if(!res.status===200){
                    throw new Error("YOU DONT HAVE A TOKEN")
                }
    } catch (e) {
        // console.log(e);
        nav("/login");
    }
}
    useEffect(() => {
     // we cant use async function in useEffect    
       Aboutrender();
    
    }, []);
      
    return (
        <>
            <div className="container  mt-5">
                <div className="aboutcent_main">

                    <div className="aboutcent">
                        <div className="row">
                            <div className="col-12 col-lg-5">
                                <h3 className="mb-5 text-center">Your Profile Pic</h3>
                                <img src={home} alt="your img" className="img-fluid imghandle" />
                            </div>
                            <div className="col-12 col-lg-6 d-flex justify-content-center aboutinfo flex-column">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <h5 className="mb-3">Name:</h5>
                                    </div>
                                    <div className="col-lg-8"><h5 className="mb-3">{userdata.name}</h5>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-4">
                                        <h5 className="mb-3">Email:</h5>
                                    </div>
                                    
                                    <div className="col-lg-8">

                                        <h5 className="mb-3">{userdata.email}</h5>

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-4">
                                        <h5 className="mb-3">Work:</h5>
                                    </div>
                                    <div className="col-lg-8">
                                        <h5 className="mb-3">{userdata.work}</h5>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-4">
                                        <h5 className="mb-3">Phone:</h5>
                                    </div>
                                    <div className="col-lg-8">
                                        <h5 className="mb-3">{userdata.phone}</h5>
                                    </div>
                                </div>

                            </div>
                            <div className="col-12 col-lg-1">

                                <button className="btn editbutton" type="submit" name="btnAddMore"> Edit Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About
