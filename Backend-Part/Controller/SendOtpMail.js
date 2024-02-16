const nodemailer = require("nodemailer")
const express = require("express")
const app = express()
const GenerateOTP = require("otp-generator")

app.use(express.json())

const SendVarificationMail = async(req, res) => {
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

module.exports = SendVarificationMail ;

