require("./Config");
const ProfileSchema = require("./Schema")
const SignupSchema = require("./SignupSchema")
const express = require("express");
const cors = require("cors")
require("dotenv").config()
const app = express();
const port = process.env.MY_PORT;

console.log("port", port)
app.use(cors())
app.use(express.json())



// API for SignUp 

app.post("/signup", async(req,res) => {
   let response = await SignupSchema(req.body)
   let result = response.save()
   res.send(result)
   console.log("signup success: ", response.email)
})

app.get("/SignupDetails", async(req,res) => {
   let response = await SignupSchema.find()
   res.send(response)
})

app.delete("/SignupDetails/:_id", async(req, res) => {
   let response = await SignupSchema.deleteOne(req.params)
   res.send(response)
   
   console.log("Deleted item is : ", response)
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