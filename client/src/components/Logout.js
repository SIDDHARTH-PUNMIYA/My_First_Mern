import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App'

const Logout = () => {

    const {state , dispatch} = useContext(UserContext)

    const nav = useNavigate()
    const Aboutrender = async () => {
        try {
            const res = await fetch('/logout', {
                method: "GET",
                credentials: "include",

                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            })
            if (res) {
                 // using use reducer hook  by using dispatch we call reducer function and pass the payload which in turns change 
            // the state same useState we change setuser and user value is changed eventually
          //to false means user has looged out so false value will display login and reg  button when state is used in  navbar 
                dispatch({type:"login",payload:false})
         
                nav("/login")
            } else {
                throw new Error(res.error)
            }

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
        <div>

        <div className='d-flex align-items-center justify-content-center'>

            <h1 style={{color:"green",fontSize:"3rem"}}>Logout Successful!!!</h1>
        </div>
        </div>
        </>
    )
}

export default Logout
