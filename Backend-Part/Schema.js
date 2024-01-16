const {default: mongoose} = require("mongoose");

const ProfileSchema = new mongoose.Schema({
   firstName: String,
   lastName: String,
   phoneNo: Number,
   age: Number,
   state: String,
   city: String,
   gender: String,
   hobbies: String,
   user:String
})

module.exports = mongoose.model("profiledata", ProfileSchema)