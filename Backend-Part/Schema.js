const {default: mongoose} = require("mongoose");

const ProfileSchema = new mongoose.Schema({
   firstName: String,
   lastName: String,
   phoneNo: String,
   age: Number,
   state: String,
   city: String,
   gender: String,
   hobbies: String,
   user:String,
   isVarified: Boolean
})

module.exports = mongoose.model("profiledata", ProfileSchema)