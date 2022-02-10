const express = require("express");
const router = express.Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const authenticate = require('../middleware/authenticate')

require("../database/connection");
const User = require("../models/userSchema");

router.post("/register", async (req, res) => {
  const { name, contact, area, city, license, pan } = req.body;

  if (!name || !contact || !area || !city || !license || !pan) {
    return res.status(422).json({ error: "kindly fill each field properly" });
  }

  try {
    const userExists = await User.findOne({ contact: contact });
    if (userExists) {
      return res.status(422).json({ error: "User Already Exists" });
    } 
    else {
      const user = new User({
        name, contact, area, city, license, pan
      });

      await user.save();
      return res.status(201).json({ message: "User Registered Successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { contact } = req.body;  

    if (!contact) {
      
      return res.status(400).json({ error: "kindly fill each field properly" });
    }
    const userLogin = await User.findOne({ contact: contact });

    if (userLogin) {

      let token = await userLogin.generateAuthToken();
      console.log(token);
       
      res.cookie("jwtoken", token, {
          expires : new Date(Date.now() + 2592000000),
          httpOnly : true
      })

        return res.status(200).json({ message: "User Loggedin Successfully" });
        
    }
    else {
      return res.status(400).json({ error: "Unregistered Number" });
    }

  } 
  catch (err) {
    console.log(err);
  }
});

router.get('/',authenticate,(req,res)=>{ 
  res.send(req.rootUser);
})

router.get('/logout',(req,res)=>{ 
  res.clearCookie('jwtoken', {path : '/'})
  res.status(200).send("User Log out successfully");
})

module.exports = router;
