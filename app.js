const express = require('express');
const dotenv = require('dotenv');
const cookieparser = require('cookie-parser')
dotenv.config({path: './config.env'});
const app= express();
require("./db/conn");
const User= require('./models/UserSchema');
const port = process.env.PORT || 5000
app.use(express.json()); // to read json data to backend
app.use(express.urlencoded({ extended: false })); 
app.use(cookieparser());

app.use(require('./router/auth'))

//for heroku
if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"))
}


app.listen(port,()=>{
    console.log(`Connection at ${port}`);
})

