const jwt = require("jsonwebtoken")
const userModel = require("../models/user-model")

module.exports.isLoggedin = async(req, res, next) => {
    if (req.path === '/') {
    return next()
  }
    if(!req.cookies.token){
        req.flash("error","You need to Login First")
        return res.redirect("/")
    }
    try{
       const decoded =  jwt.verify(req.cookies.token, process.env.JWT_KEY)
       let user = await userModel
       .findOne({email: decoded.email})
       .select("-password")
       req.user = user
       next();
    }
    catch(err){
        req.flash("error", "something went wrong")
        res.redirect("/")
    }
}