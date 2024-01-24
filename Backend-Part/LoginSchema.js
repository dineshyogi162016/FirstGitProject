const {default: mongoose} = require("mongoose")

const LoginSchema = new mongoose.Schema({
   userDetails :{
      email: String,
      password: String
   },
   authToken: String
})

module.exports = mongoose.model("LoginDatas",LoginSchema)