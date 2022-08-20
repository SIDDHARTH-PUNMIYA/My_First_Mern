const bcr = require("bcryptjs");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema =new mongoose.Schema({
  name:{
        type:String,
        required:true,
    },
     email:{
        type:String,
        required:true,
       unique:[true,"email id present already"],
       validate(val){
           if(!validator.isEmail(val)){
 throw new Error("Invalid ");
           }
       }
    },
    phone:{
        type:Number,
        required:true,
        min:10,
        unique:[true," phone no. already  present "],
    },
    work:{
        type:String,
        required:true, 
    },
   password:{
       type:String,
       required:true,
   },
   confirmpassword:{
       type:String,
       required:true,
        
   },
   date:{
type:Date,
default:Date.now()
   },
   tokens:[{
       token:{
        type:String,
        required:true,
       
       }
   }],
   messagedata:[ {
    name:{
        type:String,
        required:true,
    },
   
    email:{
        type:String,
        required:true,
       unique:[true,"email id present already"],
       validate(val){
           if(!validator.isEmail(val)){
 throw new Error("Invalid ");
           }
       }
    },
    phone:{
        type:Number,
        required:true,
        min:10,
        unique:[true," phone no. already  present "],
    },
    message:{
        type:String,
        required:true,
    }
   }]
   
})
//password hashing 
UserSchema.pre("save",async function (next) {
    if(this.isModified("password")){
        this.password=await bcr.hash(this.password,12);
        this.confirmpassword=await bcr.hash(this.confirmpassword,12);
    }
    next();
    
})

// token generation for login

UserSchema.methods.generateAuthToken = async function(){
try {
    let token = jwt.sign({_id: this._id},process.env.SECRETKEY);
    this.tokens=this.tokens.concat({token:token});
    
    await this.save();
    return token;
} catch (e) {
    console.log(e);
}
}

// mzg addition from client contact page to server
// if we need to fill other fields in database which are not filled during registration we need to do it like this
UserSchema.methods.usermzg =async function (name,email,phone,message) {
    try {
        // we have to concat like this when dealing with array of objs
        this.messagedata=this.messagedata.concat({name,email,phone,message})
        await this.save();
        return this.messagedata;
        } catch (e) {
        console.log(e);
    }
}

const User = mongoose.model("User",UserSchema)

module.exports=User;