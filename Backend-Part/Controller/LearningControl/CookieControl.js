
// Use for get cookie 
const SetCookie = (req, res) => {
   res.cookie("newcookieToken", "MyCookies", { maxAge: 60000 , httpOnly: true } ).send("cookie is successfully set")
   let cookie = req.cookies
   console.log("cookie", cookie)
}

// Use for delete cookie 
const ClearCookie = (req, res) => {
   res.clearCookie("newcookieToken");
   res.send("Cookie Cleared ")
}

module.exports = {SetCookie, ClearCookie}