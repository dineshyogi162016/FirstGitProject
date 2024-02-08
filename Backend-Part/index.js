require("./Config");
require("dotenv").config()
const ProfileSchema = require("./Schema")
const SignupSchema = require("./SignupSchema")
const LoginSchema = require("./LoginSchema")
const express = require("express");
const cors = require("cors")
const Jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const path = require("path")
const cookieParser = require("cookie-parser")
const app = express();
const port = process.env.MY_PORT;
// const api_token_key = process.env.MY_TOKEN_KEY;
const api_token_key = process.env.JWT_SECRET_KEY;
const saltRound = 10;
const Products = require("./products");


app.use(cors())
app.use(express.json())
app.use(cookieParser())

const publicPath =  path.join(__dirname,"404-page.html")
// const publicPath =  __dirname
// console.log("Current Directory : ", publicPath )

// Auth Token Middleware 
const varifyToken = (req, res, next) => {
   let token = req.headers['authorization'];
   if(token){
      Jwt.verify(token, api_token_key , (err, valid) => {
         if(err){
            res.status(401).send({ result: "provide valid token" })
         }
         else{
            next()
         }
      })

   }else{
      res.status(403).send({ result: "Please provide token " } )
   }
} 

// SignUp API 
app.post("/signup", async(req,res) => {
   let userDetails = await SignupSchema(req.body).userDetails
   let signupResponse = await SignupSchema.find() 
   
   var userSignupPassword = userDetails.password;
   let userSignupEmail = userDetails.email;
   let userSignupName = userDetails.name;

   let ifUserExists = signupResponse.find( e => e.userDetails.email === userSignupEmail )
   
   if(ifUserExists){
      res.status(404).send({massage: "User already exist"})
   }else{
      bcrypt.hash(userSignupPassword, saltRound, async(err, salt) => {
         userSignupPassword = salt;

         let signUpToken = Jwt.sign({ userSignupEmail }, api_token_key);
         
         const signInstance = new SignupSchema ({
            userDetails:{
               name: userSignupName,
               email: userSignupEmail,
               password: userSignupPassword
            },
            authToken : signUpToken
         })      
         
         const result = await signInstance.save()
         res.send(result)
         // console.log("signup success: ", result )
         
      })
   }

})


// LogIn API 
app.post("/", async (req,res) => {
   let signupResponse = await SignupSchema.find() 
   let userDetails = await LoginSchema(req.body).userDetails

   var userLoginPassword = userDetails.password;
   let userLoginEmail = userDetails.email;

   // let ifUserExists = signupResponse.find( e => e.email === userDetails.email && e.password === userDetails.password )
   let ifUserExists = signupResponse.find( e => e.userDetails.email === userLoginEmail )

   if(!ifUserExists){
      res.status(404).send({massage: "No User Found"})
   }else{      
      bcrypt.compare(userLoginPassword, ifUserExists.userDetails.password, (err, result)=>{
         if(result){
            bcrypt.hash(userLoginPassword, saltRound, async(err, salt) => {
            
            const LoginToken = Jwt.sign({userLoginEmail}, api_token_key );

            const loginDataInstance = new LoginSchema ({
               userDetails:{
                  email: userLoginEmail,
                  password: salt
               },
               authToken : [LoginToken]
            })

            
            let LoginResponse = await LoginSchema.find() 
            let ifUserSignedIn = await LoginResponse.find( e => e.userDetails.email === userLoginEmail )

            if(!ifUserSignedIn){
               let result = await loginDataInstance.save();
               res.status(200).send({ massage: "Login Success" , loginMeta: {user : result.userDetails.email, token : LoginToken} })
               
            }else{

               let result = await LoginSchema.updateOne(
                  {_id : ifUserSignedIn._id },
                  {$addToSet : {authToken : LoginToken}}
               )

               res.status(200).send({ massage: "Another Login Success" , loginMeta: {user : loginDataInstance.userDetails.email, token : LoginToken } })

            }
            
         })
         }else{
            res.status(404).send({massage: "Wrong Password"})
         }

      })
   }

})


// LogOut API 

app.delete("/logoutall", async (req, res) => {
   const userMail = req.query.email;
   
   let LoginResponse = await LoginSchema.find() 
   let ifUserExists = await LoginResponse.find( e => e.userDetails.email === userMail )
   
   if(ifUserExists){
      const response = await LoginSchema.deleteOne({"_id" : ifUserExists._id})
      res.status(200).send({massage: "LogOut All Accounts Success"})
   }else{
      res.status(404).send({massage: "No User Found"})
   }

})


app.delete("/logout", async (req, res) => {

   const userMail = req.query.email;
   const currentUserToken = req.query.token;
   
   let LoginResponse = await LoginSchema.find() 
   let ifUserExists = await LoginResponse.find( e => e.userDetails.email === userMail )
   
   if(ifUserExists){
      let number = ifUserExists.authToken.length

      if(number > 1){
         const response = await LoginSchema.updateOne(
            {"_id": ifUserExists._id },
            {$pull: {authToken: currentUserToken}}
         )
         res.status(200).send({massage: "LogOut Success"})
         
      }else{
         const response = await LoginSchema.deleteOne({"_id" : ifUserExists._id})
         res.status(200).send({massage: "LogOut SuccessFull"})
      }
   }
})



// SignupDetails API 
app.get("/SignupDetails", varifyToken , async(req,res) => {
   let response = await SignupSchema.find()

   let newResponse = response.map((e) => {
      let data =  e.userDetails; 
      const { password, ...userWithoutPassword } = data;
      return userWithoutPassword
   })

   res.send(newResponse)
})

app.delete("/SignupDetails/:_id", varifyToken , async(req, res) => {
   let response = await SignupSchema.deleteOne(req.params)
   res.send(response)
   
   // console.log("Deleted item is : ", response)
})


// API for MyProfile 
app.get("/profile", varifyToken , async (req, res) => {
   let response = await ProfileSchema.find();
   let loginUser = await req.headers['user']

   let ProfileDetails = await response.find(e => e.user === loginUser )
   if(ProfileDetails){
      res.status(200).send(ProfileDetails);
   }else{
      res.status(404).send({massage: "No profile found"})
   }

   // console.log("Profile data", ProfileDetails);
})

app.post("/profile", varifyToken , async (req, res) => {
   let response = await ProfileSchema(req.body)
   let result = await response.save()
   res.send(result)
   // console.log("your data saved: ", result)
})

app.delete("/profile/:_id", varifyToken , async (req, res) => {
   const response = await ProfileSchema.deleteOne(req.params);
   res.send(response);
   // console.log(response)
})

app.put("/profile/:_id", varifyToken , async (req, res) => {
   const response = await ProfileSchema.updateOne(
      req.params,
      {
         $set: req.body
      }
   );
   res.send(response);
   // console.log("Update successfully: ", response)
})


// Searching API 
app.get("/products/:key", async (req, res) => {
   try {
      let key = req.params
      const searchResult = Products.find({
         "$or": [
            {"name": {"regex": ".*"+key+".*", $options : "i" }}
         ]
      })
      res.send(searchResult)
   } catch (error) {
      res.send({error: "Product searching error"})
      console.log("Product searching error")
   }
})




// for cookie set and get throw backend
app.get("/cookie",(req, res) => {
   res.cookie("newcookieToken", "MyCookies", { maxAge: 60000 , httpOnly: true } ).send("cookie is successfully set")

   // Use for get cookie 
   let cookie = req.cookies
   console.log("cookie", cookie)
})

app.get("/clearCookie", (req, res) => {
   res.clearCookie("newcookieToken");
   res.send("Cookie Cleared ")
})


app.get("*", (req, res) => {
   res.sendFile(`${publicPath}`)
})

app.listen(port, () => {
   console.log(`Server is running on port http://localhost:${port}`);
})