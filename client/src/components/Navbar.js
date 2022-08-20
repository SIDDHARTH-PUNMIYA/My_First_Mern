import React, { useContext } from 'react'
import "bootstrap/dist/css/bootstrap.css"
import {NavLink} from 'react-router-dom'
import { UserContext } from '../App'
const Navbar = () => {
// created useContext  to use state value to show which button to show
  const {state , dispatch} = useContext(UserContext)


    return (
        <>
        
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/">Navbar</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/about">AboutMe</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/contact">ContactUs</NavLink>
        </li>
        {/* if state is true then logout button is displayed as user is logged in and vice versa using ternary operator */}
     {   state ?
      <>
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">Login</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/signup">Registration</NavLink>
        </li>
        </>
        :<li className="nav-item">
          <NavLink className="nav-link" to="/logout">Logout</NavLink>
        </li> 
          

     }
       
        
       
      </ul>
     
    </div>
  </div>
</nav>
        </>
    )
}

export default Navbar
