const SignupSchema = require("../SignupSchema")
const LoginSchema = require("../LoginSchema")
const bcrypt = require("bcrypt")
const saltRound = 10;
const Jwt = require("jsonwebtoken")
const api_token_key = process.env.JWT_SECRET_KEY;

// Signup API 
const SignUpAPI = async(req,res) => {
   let userDetails = await SignupSchema(req.body).userDetails
   let signupResponse = await SignupSchema.find() 
   
   var userSignupPassword = userDetails.password;
   let userSignupEmail = userDetails.email;
   let userSignupName = userDetails.name;

   let ifUserExists = signupResponse.find( e => e.userDetails.email === userSignupEmail )
   
   if(ifUserExists){
      res.status(404).send({warning: "User already exist"})
   }else{
      bcrypt.hash(userSignupPassword, saltRound, async(err, salt) => {
         userSignupPassword = salt;

         let signUpToken = Jwt.sign({ userSignupEmail }, api_token_key);
         
         const signInstance = new SignupSchema ({
            userDetails:{
               name: userSignupName,
               email: userSignupEmail,
               password: userSignupPassword
            },
            authToken : signUpToken
         })      
         
         const result = await signInstance.save()
         if(result){
            res.status(200).send({success: "Resistration successfull"})
         }
         
      })
   }

}

// Login API 
const LogInAPI =  async (req,res) => {
   let signupResponse = await SignupSchema.find() 
   let userDetails = await LoginSchema(req.body).userDetails

   var userLoginPassword = userDetails.password;
   let userLoginEmail = userDetails.email;

   // let ifUserExists = signupResponse.find( e => e.email === userDetails.email && e.password === userDetails.password )
   let ifUserExists = signupResponse.find( e => e.userDetails.email === userLoginEmail )

   if(!ifUserExists){
      res.status(404).send({warning: "No User Found"})
   }else{      
      bcrypt.compare(userLoginPassword, ifUserExists.userDetails.password, (err, result)=>{
         if(result){
            bcrypt.hash(userLoginPassword, saltRound, async(err, salt) => {
            
            const LoginToken = Jwt.sign({userLoginEmail}, api_token_key );

            const loginDataInstance = new LoginSchema ({
               userDetails:{
                  email: userLoginEmail,
                  password: salt
               },
               authToken : [LoginToken]
            })

            
            let LoginResponse = await LoginSchema.find() 
            let ifUserSignedIn = await LoginResponse.find( e => e.userDetails.email === userLoginEmail )

            if(!ifUserSignedIn){
               let result = await loginDataInstance.save();
               res.status(200).send({ success: "Login Success" , loginMeta: {user : result.userDetails.email, token : LoginToken} })
               
            }else{
               let result = await LoginSchema.updateOne(
                  {_id : ifUserSignedIn._id },
                  {$addToSet : {authToken : LoginToken}}
               )

               res.status(200).send({ success: "Another Login Success" , loginMeta: {user : loginDataInstance.userDetails.email, token : LoginToken } })

            }
            
         })
         }else{
            res.status(404).send({warning: "Wrong Password"})
         }

      })
   }

}

// LogOutAll API 
const LogOutAll = async (req, res) => {
   const userMail = req.query.email;
   
   let LoginResponse = await LoginSchema.find() 
   let ifUserExists = await LoginResponse.find( e => e.userDetails.email === userMail )
   
   if(ifUserExists){
      const response = await LoginSchema.deleteOne({"_id" : ifUserExists._id})
      res.status(200).send({success: "LogOut All Accounts Success"})
   }else{
      res.status(404).send({error: "No User Found"})
   }

}

// LogOut API 
const LogOut = async (req, res) => {

   const userMail = req.query.email;
   const currentUserToken = req.query.token;
   
   let LoginResponse = await LoginSchema.find() 
   let ifUserExists = await LoginResponse.find( e => e.userDetails.email === userMail )
   
   if(ifUserExists){
      let number = ifUserExists.authToken.length

      if(number > 1){
         const response = await LoginSchema.updateOne(
            {"_id": ifUserExists._id },
            {$pull: {authToken: currentUserToken}}
         )
         res.status(200).send({success: "LogOut Success"})
         
      }else{
         const response = await LoginSchema.deleteOne({"_id" : ifUserExists._id})
         res.status(200).send({success: "LogOut SuccessFull"})
      }
   }
}


module.exports = {SignUpAPI, LogInAPI, LogOut, LogOutAll}