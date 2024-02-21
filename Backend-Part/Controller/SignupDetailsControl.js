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
   let response = await SignupSchema.deleteOne({
      'userDetails.email': req.params.email
   })

   // res.send(response)

   if(response.deletedCount === 1){
      res.status(200).send({success: "Delete Signup Data success"})
   }else{
      res.status(500).send({warning: "Something went wrong"})
   }



   // console.log("Deleted item is : ", response)
}