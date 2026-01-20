const userModel = require("../models/user-model")
const bcrypt = require('bcrypt')
const generateToken = require('../utils/generatetoken')

module.exports.registeruser = async function(req,res) {
    try{
        let{fullname, email, password} = req.body
        if(fullname.length  < 5 || password.length < 5 ){
            req.flash("error", "minimum 5 character require")
            return res.redirect('/')
        }
        let user = await userModel.findOne({email})
        if(user){
            req.flash("error","You already have an Account. please Login")
            return res.redirect('/')
        }
        bcrypt.genSalt(10,  (err, salt) => {
            bcrypt.hash(password, salt, async (err, hashpassword) => {
                let createdUser = await userModel.create({
                    fullname,
                    email,
                    password : hashpassword
                })
                let token = generateToken(createdUser)
                res.cookie("token" , token)
                res.redirect("/shop")
            })
         })
        }
        catch(err){
            req.flash("error",err.message)
            return res.redirect('/')
        }
    }

module.exports.loginuser = async function(req,res) {
    try{
        let {email, password} = req.body
    let user = await userModel.findOne({email})
    if(!user){
        req.flash("error","Password and E-mail are incorrect")
        return res.redirect("/")
    }
    bcrypt.compare(password, user.password, (err, result) => {
        if(!result){
            req.flash("error","Password and E-mail are incorrect")
            return res.redirect("/")
        }
        else{
            let token = generateToken(user)
            res.cookie("token" , token)
            res.redirect("/shop")
        }
        
    })
    }
    catch(err) {
        req.flash("error",err.message)
        return res.redirect("/")
    }
}

module.exports.logoutuser = async function(req,res) {
     res.cookie("token","")
    res.redirect('/')
}