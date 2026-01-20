const express = require('express')
const router = express.Router()
const ownerModel = require('../models/owner-model')
const productModel = require("../models/product-model")
const { isLoggedin } = require('../middlewares/isLoggedin')



if(process.env.NODE_ENV === "development"){
    router.post('/create',async (req,res) => {
        let owners = await ownerModel.find()
        if(owners.length > 0){
            return res.status(504).send("You don't have permisiion to create owner")
        }

        let{fullname, email,password} = req.body

        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password
        })
        res.status(201).send(createdOwner)
    })
}

router.get('/admin',isLoggedin, (req,res) => {
     let error = req.flash("error")
     let success = req.flash("success")
    res.render("createproducts",  {error ,success})
})

router.get('/products/delete', async (req,res) => {
    let products = await productModel.deleteMany()
    res.redirect('/admin')
})

router.get('/login', (req,res) => {
    res.render('owner-login',{ loggedin: false})
})

router.post("/admin/login", (req,res) => {
    res.redirect("/admin")
})

module.exports = router;