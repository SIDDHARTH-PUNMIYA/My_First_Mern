
export  const initialState=null;
export  const reducer = (state,action) =>{
if(action.type==="login"){
    // we asigned type as login in login and logout pages 
    return action.payload;  // return boolean values from both pages 
}
return state;
}