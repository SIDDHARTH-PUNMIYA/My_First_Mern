import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Contact = () => {

    const nav = useNavigate();
    const [userdata, setuserdata] = useState({name :"",email:"",phone:"",message:""});
    

    const userchange = (e) => {
        const { name, value } = e.target;
        setuserdata({ ...userdata, [name]: value });
    }
    
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
            setuserdata({...userdata,name:data.name,email:data.email,phone:data.phone});
            if (!res.status === 200) {
                throw new Error("YOU DONT HAVE A TOKEN")
            }
        } catch (e) {
            console.log(e);
            nav("/login")
        }
    }
    useEffect(() => {
        // we cant use async function in useEffect    
        Aboutrender();

    }, [])

const sendmessage = async(e)=>{
        e.preventDefault();
        const { name,email,phone,message}=userdata;
        
            const res= await fetch('/senddata',{
                method:"post",
                credentials:"include",
               headers:{
                        "Content-Type" :"application/json" 
                        // we told express to use express.json() so we need to set header to app/json in app.js
                },
                // we convert json data to string as server understand string only
                body: JSON.stringify({name,email,phone,message})
         // server can access the data by req.body send by the client
            });
             await res.json();
            if( res.status === 422 || !res){
        window.alert("Message Not Sent!!!");
            }else{
                
        window.alert("Message  Sent!!!");
        setuserdata({...userdata,message:""});
        
            }
        }
        


    return (
        <>
            <div className="mt-5 d-flex justify-content-evenly ourcontact">

                <div className="ourinfo">
                    <h3>Phone</h3>
                    <p>+9112334566</p>

                </div>
                <div className="ourinfo"> <h3>Email</h3>
                    <p>sid@gmail.com</p>
                </div>
                <div className="ourinfo"> <h3>Address</h3>
                    <p>New Delhi,India</p>
                </div>
            </div>


            <div className="container mt-4">
                <div className="contactcent">
                    <div className="incont">
                        <h2 className="text-capitalize">Get in touch with us</h2>
                        <div className="row">
                            <div className="col-12 col-lg-4">
                                <div className="mb-3 mt-3">
                                    <input type="text" className="form-control" onChange={userchange} value={userdata.name} placeholder="Your Name" name="name" />
                                </div>
                            </div>
                            <div className="col-12 col-lg-4">
                                <div className="mb-3 mt-3">
                                    <input type="email" className="form-control" onChange={userchange} value={userdata.email} placeholder="Your email" name="email" />
                                </div>
                            </div>
                            <div className="col-12 col-lg-4">
                                <div className="mb-3 mt-3">
                                    <input type="number" className="form-control" onChange={userchange} value={userdata.phone} placeholder="Your Phone" name="phone" />
                                </div>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-12 col-lg-12">
                                <div className="mb-3 mt-3">
                                    <textarea style={{ resize: 'none' }} type="text" className="form-control" onChange={userchange} value={userdata.message} placeholder="Your Mesage" name="message" />
                                </div>
                            </div>
                        </div>
                        <button type="submit" name="message" onClick={sendmessage} className="btn btn-primary">Send Message</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact
