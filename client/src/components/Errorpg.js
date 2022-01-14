import React from 'react'
import { NavLink } from 'react-router-dom'

const Errorpg = () => {
    return (
        <> 
         <div id="notfound">
             <div className="notfound">
                 <div className="notfound_404">
                     <h1>404</h1>
                 </div>
                 <h2>We are sorry, page not found !</h2>
                 <p className="mb-5">
                     The page would might be looking for might not available or is temporarily unavailable
                 </p>
                 <NavLink to="/" className="tohome btn btn-dark">  Back To Home</NavLink>
             </div>
         </div>   
        </>
        )
}

export default Errorpg
