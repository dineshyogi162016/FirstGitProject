const nodemailer = require("nodemailer")

let senderMail = 'verona.collier@ethereal.email'
let senderPass = '21Pu2VPN7s6AJhMPkn'

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
            res.status(200).send({massage: "Mail has been sent"})
            console.log("Mail has been sent.")
         }
      })

   } catch (error) {
      console.log("Something went wrong!")
   }
}


module.exports = SendVarificationMail;