// const mongoose = require("mongoose");
const express = require("express");
const app = express();
const env = require("dotenv");
// env.config({path: "./.env"});
env.config();
require("./db/conn");
const User = require("./model/schema");

// Due to the below code, postman will show response in json format
app.use(express.json());

// Routes are acquired from the routes.js file
app.use(require("./router/routes"));

const port = process.env.PORT || 4000;

// Middleware
// const middleware = (req, res, next) => {
//     console.log(`Middleware is working`);
//     next();
// }

// app.get("/", (req, res) => {
//     res.send("Hello World at Home app js");
// })

// app.get("/about", middleware , (req, res) => {
//     res.send("About page");
// })

// app.get("/contact", (req, res) => {
//     // res.cookie("test", "ashraf")
//     res.send("Contact page");
// })

// app.get("/signin", (req, res) => {
//     res.send("Login page");
// })

app.get("/logout", (req, res) => {
    res.send("Logout page");
})

// Heroku Step No. 3
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    // const path = require("path");
    // app.get("*", (req, res) => {
    //     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    // })
}

//Run the server
app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})