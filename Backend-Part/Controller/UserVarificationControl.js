const nodemailer = require("nodemailer")
const ProfileSchema = require("../Schema")
const path = require("path")
const GenerateOTP = require("otp-generator")

let senderMail = 'pierce.corkery@ethereal.email'
let senderPass = 'J13cvEDAh8gzKXAVNE'

let  publicPath = __dirname

publicPath = path.resolve(publicPath, "..")


const SendVarificationMail = (req, res) =>{
   const user = req.query ;

   try {   
      const trasnporter =  nodemailer.createTransport({
         host: "smtp.ethereal.email",
         port: 587,
         auth: {
            user: senderMail ,
            pass: senderPass
         }
      })

      const mailOptions = {
         from: senderMail,
         to: user.mail ,
         subject: "Account varification mail",
         html: `<h4>Hii ${user.name} , If You want varify your account then Click <a href="http://localhost:4000/UserVarify/${user.userid}" > <button>Varify</button> </a> button </h4>`
      }

      trasnporter.sendMail(mailOptions, (err, info) => {
         if(err){
            res.status(500).send({error: "Mail not sent"})
         }else{
            res.status(200).send({success: "Mail has been sent"})
         }
      })

   } catch (error) {
      res.status(500).send({warning: "Something went wrong"})
   }
}


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


const SendOtpMail = async(req, res) => {
   const email = req.params.key;
   console.log("email", email)
   try {
      const trasnporter = nodemailer.createTransport({
         host: 'smtp.ethereal.email',
         port: 587,
         secure: false ,
         auth: {
            user: 'lazaro70@ethereal.email',
            pass: 'AAYQ2bbbDxxwVvvMTN'
         }
      })
   
      const OTP = GenerateOTP.generate(4, {upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false})
      // const OTP = GenerateOTP.generate(10, { specialChars: false })
      console.log("OTP is : ", OTP)

      const mailOptions = {
         from : 'lazaro70@ethereal.email',
         to : email,
         subject : 'For OTP varification.',
         html: `<h3>Hi, Please Varify your OTP is : -- [ ${OTP} ] -- </h3>`
      }
   
      trasnporter.sendMail(mailOptions, (error, info) => {
         if(error){
            console.log("Error", error)
         }else{
            res.send("Mail has been Sent")
            console.log("Email has been sent", info.response)
         }
      })

   } catch (error) {
      console.log("error : ", error)
   }
  

}


module.exports = {SendVarificationMail, UserVarifyy, SendOtpMail} 