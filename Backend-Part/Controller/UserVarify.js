const ProfileSchema = require("../Schema")
const path = require("path")
const express = require("express")
const app = express();

let  publicPath = __dirname
publicPath = path.resolve(publicPath, "..")

// let dirPath = path.join(publicPath, "views")
// console.log("dirPath", publicPath)

// app.use(express.static(publicPath))

const UserVarifyy = async (req, res) => {
   const UserID = req.params.key;

   try {
      const response = await ProfileSchema.updateOne(
         req.params,
         {
            $set: { "isVarified" : true }
         }
      );

      if(response){
         // res.status(200).send({massage: "User varification success"})
         res.sendFile(path.join(publicPath,"VarificationSuccess.html"))
      }

   } catch (error) {
      console.log("Error in User varification")
   }
} 

module.exports = UserVarifyy ;