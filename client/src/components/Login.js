import React,{useContext, useState} from 'react'
import {useNavigate} from "react-router-dom"
import { UserContext } from '../App';
import regimg from "../images/SignIn.jpg"
const Login = () => {
    const navigate = useNavigate();
   
    // using usecontext to know which buttons  to show (reg and login) or logout
    const {state , dispatch} = useContext(UserContext)



    const [logdata, setlogdata] = useState({
        email: "",
       password: "",})

       const matchdata= (e)=>{

        const {name,value}=e.target;
        setlogdata({...logdata,[name]:value});
       }
       const confirmdata= async(e)=>{
        e.preventDefault();
        const { email,password}=logdata;
        
          
        const res= await fetch('/signin',{
            method:"post",
            credentials:"include", // use credentials for get and  post req or else mzg or login will be failed
            //POST REQ :-> already tried in contact , mzg is not getting send when cred line was removed,mzg sent when cred line
            //was included 
            // GET REQ:->already tried in contact we were getting redirected to login which means we are going in catch block
            // so we need cred line to check cookies and token thing in authenticate.js
            headers:{
                    "Content-Type" :"application/json",
                    },
            // we convert json data to string as server understand string only
            body: JSON.stringify(
                {email,password}
                )
    
        });
        const data =  await res.json();
        
        // console.log(data);
         if( res.status === 400 || !data ){
            window.alert("Login failed");
                }
                else{
            window.alert("Login Successfully");
            // using use reducer hook  by using dispatch we call reducer function and pass the payload which in turns change 
            // the state same useState we change setuser and user value is changed eventually
            dispatch({type:"login",payload:false})
            navigate("/");      
            
                }
       }

    return (
        <>
        
           <div className="regmain">
        <div className="sign">
             <div className="row ">
     <div className="col-12 col-lg-5  imgincent">
<img src={regimg} alt="" className="img-fluid mt-3" />
            </div>
            <div className="col-12 col-lg-7 signincent">
  
            <h2 className="signhead">SIGN IN</h2>
        <form method="post">
                
                <div className="mb-3 mt-3">
                    <input type="email" className="form-control" placeholder="Enter email"  onChange={matchdata} value={logdata.email} name="email"  />
                </div>
               
                <div className="mb-3">
                    <input type="password" className="form-control" placeholder="Enter password" onChange={matchdata} value={logdata.password} name="password" />
                </div>
                

                <button type="submit" name="signin" onClick={confirmdata} className="btn btn-primary">SIGN IN</button>
            </form></div>
            </div>
            </div>
            </div>  
        </>
    )
}

export default Login
