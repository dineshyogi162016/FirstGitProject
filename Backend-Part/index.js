require("./Config");
require("dotenv").config()
const express = require("express");
const cors = require("cors")
const path = require("path")
const cookieParser = require("cookie-parser")
const app = express();
const port = process.env.MY_PORT;

const publicPath =  path.join(__dirname)

// API's in controller 
const {SendVarificationMail, UserVarifyy, SendOtpMail} = require("./Controller/UserVarificationControl")
const {SignUpAPI, LogInAPI, LogOut, LogOutAll} = require("./Controller/AuthControl")
const {varifyToken} = require("./Controller/TokenVarifyControl")
const {GetSignupDetails, DeleteSignupDetails} = require("./Controller/SignupDetailsControl")
const {GetProfile, CreateProfile, DeleteProfile, UpdateProfile} = require("./Controller/ProfileControl")
 
// Learning Controller But Not Use in Project
const {SetCookie, ClearCookie} = require("./Controller/LearningControl/CookieControl")
const SearchInProducts = require("./Controller/LearningControl/SearchingAPI")

// Using MiddleWares 
app.use(cors())
app.use(express.json())
app.use(cookieParser())


// SignUp API 
app.post("/signup", SignUpAPI )

// LogIn API 
app.post("/", LogInAPI)

// LogOut API 
app.delete("/logoutall", LogOut)

// LogOut All API 
app.delete("/logout", LogOutAll )


//Get SignupDetails API 
app.get("/SignupDetails", varifyToken , GetSignupDetails)

//Delete SignupDetails API 
app.delete("/SignupDetails/:_id", varifyToken , DeleteSignupDetails)


// API for MyProfile 
app.get("/profile", varifyToken , GetProfile)

app.post("/profile", varifyToken , CreateProfile)

app.delete("/profile/:_id", varifyToken , DeleteProfile )

app.put("/profile/:_id", varifyToken , UpdateProfile)


// varify user Mail sent
app.get("/varificationMail", SendVarificationMail)

// varify user 
app.get("/uservarify/:_id", UserVarifyy)


// Send Mail API using Controller 
app.get("/sendMail/:key", SendOtpMail )


// Searching API 
app.get("/products/:key", SearchInProducts)


// for cookie set and get throw backend
app.get("/cookie", SetCookie )

app.get("/clearCookie", ClearCookie)


// Show when Wrong request
app.get("*", (req, res) => {
   res.sendFile(`${publicPath}404-page.html`)
})

app.listen(port, () => {
   console.log(`Server is running on port http://localhost:${port}`);
})