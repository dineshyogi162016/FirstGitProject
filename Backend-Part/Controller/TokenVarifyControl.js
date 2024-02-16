const Jwt = require("jsonwebtoken")
const api_token_key = process.env.JWT_SECRET_KEY;


exports.varifyToken = (req, res, next) => {
   let token = req.headers['authorization'];
   if(token){
      Jwt.verify(token, api_token_key , (err, valid) => {
         if(err){
            res.status(401).send({ result: "provide valid token" })
         }
         else{
            next()
         }
      })

   }else{
      res.status(403).send({ result: "Please provide token " } )
   }
} 
