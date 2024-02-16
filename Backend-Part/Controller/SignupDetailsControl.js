const SignupSchema = require("../SignupSchema")


// Get signUP data 
exports.GetSignupDetails = async(req,res) => {
   let response = await SignupSchema.find()

   let newResponse = response.map((e) => {
      let data =  e.userDetails; 
      const { password, ...userWithoutPassword } = data;
      return userWithoutPassword
   })

   res.send(newResponse)
}


// Delete Sign Up data 
exports.DeleteSignupDetails = async(req, res) => {
   let response = await SignupSchema.deleteOne(req.params)
   res.send(response)
   
   // console.log("Deleted item is : ", response)
}