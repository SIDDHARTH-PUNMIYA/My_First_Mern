const express = require('express');
const router = new express.Router();
require("../db/conn");
const User = require('../models/UserSchema');
const bcrypt = require("bcryptjs");
const authenticate = require('../middleware/authenticate');
const cookieparser = require('cookie-parser')
const jwt = require('jsonwebtoken');

// routes

router.post("/register", async (req, res) => {
    try {

        if (req.body.password !== req.body.confirmpassword) {
            res.status(422).send("enter pass and cpass same ");
        } else {
            const user = new User(req.body);
            const createUser = await user.save();
            res.status(201).send(createUser);

        }
    }
    catch (e) {
        res.status(422).send(e);
    }

});



router.post("/signin", async (req, res) => {
    try {
        // console.log(res);
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).send({ "error": "Empty field" })
        }
        const data = await User.findOne({ email: email });

        if (data) {
            const isMatch = await bcrypt.compare(password, data.password);
            const token = await data.generateAuthToken();



            if (!isMatch) {
                res.status(400).json({ mzg: "Invalid login" });
            }
            else {
                res.cookie("jwtmod", token, {
                    expires: new Date(Date.now() + 258920000),
                    httpOnly: true,
                    sameSite: 'none', // this 2 setting are very necessary bcoz we cant use token inside cookie
                    secure: true //  to verify whether is there someone logged in bcoz we are using cors and proxy not available
                    // so we need to use cors and resort to this
                });
                res.json({ mzg: "Succesful login" })

            }

        }
        else {
            res.status(400).json({ mzg: "Invalid login" });

        }

    }
    catch (e) {
        console.log(e);
    }

});

// for about pg datafill
router.get("/about", authenticate, (req, res) => {
    res.send(req.userdata); // if we dont write this then there will be nothing to get from the fetch api
    // we send the data which we will be accessing in About by using fetch api in about.js
})
// for contact us and home page data fill
router.get("/getdata", authenticate, (req, res) => {
    res.send(req.userdata); // if we dont write this then there will be nothing to get from the fetch api
    // we send the data which we will be accessing in About by using fetch api in about.js
})

router.post("/senddata", authenticate, async (req, res) => {
    const { name, email, phone, message } = req.body;
    const data = await User.findOne({ email: req.userdata.email });
    if (data) {

        const addmessage = await data.usermzg(name, email, phone, message)
        await data.save();
        res.status(201).json({ message: "sucessful mzg" })
    }
})
router.get("/logout", authenticate, (req, res) => {
    res.clearCookie('jwtmod',{path:'/'})
    res.status(200).send("userLoggedOut"); 

})

module.exports = router;