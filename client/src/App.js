import React, { createContext, useReducer } from 'react';
import Navbar from './components/Navbar'
import { Route,Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Logout from './components/Logout';
import Signup from './components/Signup';
import Errorpg from './components/Errorpg';
import './App.css'
import { initialState, reducer } from './reducer/UseReducer';
// we create context so that we can use in all pages envelpoed in in usercontext.provider as we pass state,dispatch
// as values
export const UserContext = createContext();


function App() {

const [state, dispatch] = useReducer(reducer,initialState ) // defined use of reducer in different file 

  return (
   <>
   <UserContext.Provider value={{state,dispatch}}>
     <Navbar/>
     <Routes>
     <Route exact path="/" element={ <Home/>}>   </Route>
     <Route path="/about"  element={ <About/>}>  </Route>
     <Route path="/contact"  element={ <Contact/>}>  </Route>
     <Route path="/login"  element={ <Login/>}>  </Route>
     <Route path="/signup"  element={ <Signup/>}>   </Route>
     <Route path="/logout"  element={ <Logout/>}>   </Route>
     <Route path="*"  element={ <Errorpg/>}>   </Route> 
     </Routes>
     </UserContext.Provider>
   </>
  );
}

export default App;

