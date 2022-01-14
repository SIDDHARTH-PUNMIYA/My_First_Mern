const  jwt = require('jsonwebtoken');
const User= require('../models/UserSchema');

const authenticate= async(req,res,next) => {
    try {
        const token = req.cookies.jwtmod;
        const verifytoken = jwt.verify(token,process.env.SECRETKEY);
        // console.log(verifytoken+" from autheticate.js");
        const userdata = await User.findOne({_id:verifytoken._id,"tokens.token":token}  );
            if(!userdata){
                throw new Error("User not found ");
            }
            req.token=token; // storing token as req.token so we can use it in router 
            req.userdata = userdata;   // we store data so that we can pass it from server to client
            req.id = userdata._id;
            next();     // so that it does not stuck in this middleware

    } catch (e) {
        res.status(401).send("unauthorized ");
        console.log(e);
    }
}
module.exports=authenticate;