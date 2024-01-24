require("./Config");
const ProfileSchema = require("./Schema")
const SignupSchema = require("./SignupSchema")
const LoginSchema = require("./LoginSchema")
const express = require("express");
const cors = require("cors")
const Jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()
const app = express();
const port = process.env.MY_PORT;
const api_token_key = process.env.MY_TOKEN_KEY;
const saltRound = 10;
app.use(cors())
app.use(express.json())



// const varifyToken = (req, res, next) => {
//    let token = req.headers['authorization'];
//    if(token){
//       token = token.split(" ")
//       console.log("Token find well: ", token[1])

//       Jwt.verify(token, api_token, (err, valid) => {
//          if(err){
//             res.status(401).send({ result: "Please provide valid token" })
//          }
//          else{
//             next()
//          }
//       })

//    }else{
//       res.status(403).send({ result: "Please provide token in headers" } )
//    }
// } 



// this is for generating token 

   // Jwt.sign({result}, api_token, {expiresIn: "2h"}, (err, token) => {
   //    if(err){
   //       res.send("Something error in Token Generating:")
   //    }
   //    res.send({result, aut: token})

   //    console.log("Authorization: ", {result, aut: token} )
   // })


app.post("/signup", async(req,res) => {
   let userDetails = await SignupSchema(req.body).userDetails
   
   var userSignupPassword = userDetails.password;
   let userSignupEmail = userDetails.email;
   let userSignupName = userDetails.name;

   bcrypt.hash(userSignupPassword, saltRound, async(err, salt) => {
      userSignupPassword = salt;

      let signUpToken = Jwt.sign({userDetails}, api_token_key);
      
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
      console.log("signup success: ", result )
      
   })

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
      res.send("No User Found")
   }else{   
      bcrypt.compare(userLoginPassword, ifUserExists.userDetails.password, (err, result)=>{
         if(result){
            bcrypt.hash(userLoginPassword, saltRound, async(err, salt) => {
            
               const LoginToken = Jwt.sign({userDetails}, api_token_key );

            const loginDataInstance = new LoginSchema ({
               userDetails:{
                  email: userLoginEmail,
                  password: salt
               },
               authToken : LoginToken
            })

            console.log("Login Salt", loginDataInstance)

            let result = await loginDataInstance.save();
            res.send(result)

         })

         }else{
            res.send("Password was not matched ")
         }

      })
   }

})



app.get("/SignupDetails", async(req,res) => {
   let response = await SignupSchema.find()
   res.send(response)
})

app.delete("/SignupDetails/:_id", async(req, res) => {
   let response = await SignupSchema.deleteOne(req.params)
   res.send(response)
   
   // console.log("Deleted item is : ", response)
})


// API for MyProfile 

app.get("/profile", async (req, res) => {
   let response = await ProfileSchema.find();
   res.send(response);
   // console.log("Profile data", response);
})

app.post("/profile", async (req, res) => {
   let response = await ProfileSchema(req.body)
   let result = await response.save()
   res.send(result)
   // console.log("your data saved: ", result)
})

app.delete("/profile/:_id", async (req, res) => {
   const response = await ProfileSchema.deleteOne(req.params);
   res.send(response);
   // console.log(response)
})

app.put("/profile/:_id", async (req, res) => {
   const response = await ProfileSchema.updateOne(
      req.params,
      {
         $set: req.body
      }
   );
   res.send(response);
   // console.log("Update successfully: ", response)
})





app.listen(port, () => {
   console.log(`Server is running on port http://localhost:${port}`);
})