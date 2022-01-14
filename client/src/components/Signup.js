import React,{useState} from 'react'
import regimg from "../images/SignUp.jpg"
import {useNavigate} from "react-router-dom"
const Signup = () => {
    const navigate = useNavigate();
    const [data, setdata] = useState({
        name: "",
        email: "",
        phone: "",
        work: "",
        password: "",
        confirmpassword: "",
    })
const storedata =(e)=>{
const {name,value}=e.target;
setdata({...data,[name]:value});
}
const sendData= async(e)=>{
e.preventDefault();
const { name,email,phone,work,password,confirmpassword}=data;

    const res= await fetch('/register',{
        method:"post",
        headers:{
                "Content-Type" :"application/json" 
                // we told express to use express.json() so we need to set header to app/json in app.js
        },
        // we convert json data to string as server understand string only
        body: JSON.stringify({name,email,phone,work,password,confirmpassword})
 // server can access the data by req.body send by the client
    });
     await res.json();
    if( res.status === 422 || !res){
window.alert("Registration failed");
    }else{
        
window.alert("Registration Successful");
navigate("/login");

    }
}

    return (
        <>
            <div className="regmain">
                <div className="reg">
                    <div className="row" >
                        <div className="col-12 col-lg-7 signupcent">
                            <h2 className="text-lg-start mt-2 ms-3">SIGN UP</h2>
                            <form method="post">
                                <div className="mb-3 mt-3">
                                    <input type="text" className="form-control" placeholder="Enter Name" name="name" value={data.name} onChange={storedata} />

                                </div>
                                <div className="mb-3 mt-3">
                                    <input type="number" className="form-control" value={data.phone} onChange={storedata} placeholder="Enter your phone number" name="phone" />
                                </div>
                                <div className="mb-3 mt-3">
                                    <input type="email" className="form-control" value={data.email} onChange={storedata} placeholder="Enter email" name="email" />
                                </div>
                                <div className="mb-3 mt-3">
                                    <input type="text" className="form-control" value={data.work} onChange={storedata} placeholder="Enter your Profession" name="work" />
                                </div>
                                <div className="mb-3">
                                    <input type="password" className="form-control" value={data.password} onChange={storedata} placeholder="Enter password" name="password" />
                                </div>
                                <div className="mb-3">
                                    <input type="password" className="form-control" value={data.confirmpassword} onChange={storedata} placeholder="Enter confirm password" name="confirmpassword" />
                                </div>

                                <button type="submit" name="signup" className="btn btn-primary" onClick={sendData}>SIGN UP</button>
                            </form></div>

                        <div className="col-12 col-lg-5 imgcent">
                            <img src={regimg} alt="" className="img-fluid" />
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup
