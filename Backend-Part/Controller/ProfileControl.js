const ProfileSchema = require("../Schema")

const GetProfile = async (req, res) => {
   let response = await ProfileSchema.find();
   let loginUser = await req.headers['user']

   let ProfileDetails = await response.find(e => e.user === loginUser )
   if(ProfileDetails){
      res.status(200).send(ProfileDetails);
   }else{
      res.status(404).send({massage: "No profile found"})
   }

   // console.log("Profile data", ProfileDetails);
}


const CreateProfile = async (req, res) => {
   let response = await ProfileSchema(req.body)
   let result = await response.save()
   res.send(result)
   // console.log("your data saved: ", result)
}


const DeleteProfile = async (req, res) => {
   const response = await ProfileSchema.deleteOne(req.params);
   res.send(response);
   // console.log(response)
}

const UpdateProfile = async (req, res) => {
   const response = await ProfileSchema.updateOne(
      req.params,
      {
         $set: req.body
      }
   );
   res.send(response);
   // console.log("Update successfully: ", response)
}


module.exports = {GetProfile, CreateProfile, DeleteProfile, UpdateProfile}