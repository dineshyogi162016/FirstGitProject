const { default: mongoose } = require("mongoose");

const SignupSchema = new mongoose.Schema({
   userDetails: {
      name: String,
      email: String,
      password: String
   },
   authToken: String
})

module.exports = mongoose.model("SignupDetails", SignupSchema);