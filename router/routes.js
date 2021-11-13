const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");
const cookieParser = require("cookie-parser");

require("../db/conn");
const User = require("../model/schema");

router.get("/", (req, res) => {
  res.send("Hello World at Home router js");
});

router.use(cookieParser());

// USER REGISTRATION CODE

// // Registration of User through promise method
// router.post("/register", (req, res) => {
//     const {name, email, work, phone, password, cpassword} = req.body;
//     if (!name || !email || !work || !phone || !password || !cpassword) {
//         return res.status(400).json({error: "Please fill all the fields properly .... "})
//     }
//     User.findOne({email})
//         .then((userExist) => {
//             if (userExist) {
//                 return res.status(422).json({error: "Email already exist...."})
//             }
//             const user = new User({name, email, work, phone, password, cpassword})
//             user.save().then(() => {
//                 res.status(201).json({message: "User successfully created ....."});
//             }).catch((err) => res.status(500).json({message: "Failed to registration ....."}))
//         }).catch(err => {console.log(err)})
//     // res.json( { message: req.body } )
//     // res.send("Registration of the user.....")
// })

// Registration of User through Async-Await method
router.post("/register", async (req, res) => {
  const { name, email, work, phone, password, cpassword } = req.body;
  if (!name || !email || !work || !phone || !password || !cpassword) {
    return res
      .status(422)
      .json({ error: "Please fill all the fields properly .... " });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email already exist...." });
    } else if (password !== cpassword) {
      return res
        .status(422)
        .json({ error: "Passwords are not matching ...." });
    } else {
      const user = new User({ name, email, work, phone, password, cpassword });
      await user.save();
      return res
        .status(201)
        .json({ message: "User successfully created ....." });
    }
  } catch (error) {
    console.log(err);
  }
});

// USER LOGIN CODE
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please fill the credentials ..... " });
    }


    // Find the given email in DB emails
    const userLogin = await User.findOne({ email: email });
    // console.log(userLogin);

    // Compare the given password with DB password

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if (!isMatch) {
        res.status(400).json({ error: "Invalid credentials in routes file ....." });        
      } else {        
        const token = await userLogin.generateAuthToken();
        console.log(`Login Token is ==> ` + token);
  
        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly:true
        });
          res.status(200).json({ message: "User signin successfully ....." });
      }
    } else {        
      res.status(400).json({ error: "Invalid credentials in routes file ....." });
    }
  } catch (error) {
    console.log(error);
  }
});

// About us page code
router.get("/about", authenticate ,(req, res) => {
  // console.log(`Web Token is : ${req.cookies.jwtoken}`)
  console.log("Middleware authenticate is called ..... ")
  res.send(req.rootUser);
})

// Get Home & Contact us data code
router.get("/getdata", authenticate ,(req, res) => {
  res.send(req.rootUser);
})

router.post("/contact", authenticate, async (req, res) => {
      try {
          const {name, email, phone, message} = req.body;

          if (!name || !email || !phone || !message) {
              console.log("Error in constact form ...")
              return res.json({error: "Please fill the contact form properly .... "})
          }

          const userContact = await User.findOne({_id: req.userID})

          if (userContact) {
            const userMessage = await userContact.addMessage(name, email, phone, message );

            await userContact.save();

            res.status(201).json({message: "User contact successfully ... "})

          }

      } catch (error) {
          console.log(error)
      }

  })

  // Logout code
router.get("/logout", (req, res) => {
  console.log("Hello! my logout page ..... ");
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("User Logout ... ");
})
  

module.exports = router;
