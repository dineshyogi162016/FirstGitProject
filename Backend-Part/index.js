require("./Config");
const ProfileSchema = require("./Schema")
const express = require("express");
const cors = require("cors")
require("dotenv").config()
const app = express();
const port = process.env.MY_PORT;

console.log("port", port)
app.use(cors())
app.use(express.json())

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