const jwt = require("jsonwebtoken");
const User = require("../model/schema");
const env = require("dotenv");
// env.config({path: "./.env"});
env.config();


const authenticate = async (req, res, next) => {  
    console.log("Authenticate file is called ...")
    try {
        const token = req.cookies.jwtoken;
        const verifyToken = await jwt.verify(token, process.env.SECRET_KEY);

        console.log("Verify Token : " + verifyToken)
        
        if (!verifyToken) {
            throw new Error ("Token not matched ... ")
        }

        const rootUser = await User.findOne({_id: verifyToken._id, "tokens.token": token})

        console.log("Root User : " + rootUser)

        if (!rootUser) { throw new Error ("User not found ... ") }

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();
        
    } 
    catch (error) {        
        res.status(401).send("Unauthorized: No token provided ..... ")
        console.log(error)
    }
}

module.exports = authenticate;