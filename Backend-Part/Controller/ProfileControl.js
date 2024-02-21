const ProfileSchema = require("../Schema")

const GetProfile = async (req, res) => {
   let response = await ProfileSchema.find();
   let loginUser = await req.headers['user']

   let ProfileDetails = await response.find(e => e.user === loginUser )
   if(ProfileDetails){
      res.status(200).send(ProfileDetails);
   }else{
      res.status(404).send({error: "No profile found"})
   }

   // console.log("Profile data", ProfileDetails);
}


const CreateProfile = async (req, res) => {
   let response = await ProfileSchema(req.body)
   let result = await response.save()

   if(result){
      res.status(200).send({success: "Create profile success"})
      // console.log("your data saved: ", result)
   }else{
      res.status(500).send({warning: "Something went wrong"})
   }
}


const DeleteProfile = async (req, res) => {
   const response = await ProfileSchema.deleteOne(req.params);
   
   if(response.deletedCount === 1){
      res.status(200).send({success: "Delete profile success"})
   }else{
      res.status(500).send({warning: "Something went wrong"})
   }

}

const UpdateProfile = async (req, res) => {
   const response = await ProfileSchema.updateOne(
      req.params,
      {
         $set: req.body
      }
   );
   
   if(response){
      res.status(200).send({success: "Update profile success"})
      // console.log("your data saved: ", result)
   }else{
      res.status(500).send({warning: "Something went wrong"})
   }

}


module.exports = {GetProfile, CreateProfile, DeleteProfile, UpdateProfile}