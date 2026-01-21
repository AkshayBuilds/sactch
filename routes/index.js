const express = require('express')
const { isLoggedin } = require('../middlewares/isLoggedin')
const router = express.Router()
const productModel = require("../models/product-model")
const userModel = require("../models/user-model")

router.get('/', (req,res) => {
    let error = req.flash("error")
    res.render('index', {error, loggedin: false})
})

router.get('/addtocart/:productid', isLoggedin ,async (req,res) => {
    try{
    let user = await userModel.findOne({email: req.user.email})
    user.cart.push(req.params.productid)
    await user.save()
    req.flash("success", "added to cart ")
    res.redirect('/shop')
    }
    catch(err){
        req.flash("error", "something Went Wrong")
        res.redirect('/shop')
    }
})
router.get('/shop', isLoggedin ,async (req,res) => {
    let products = await productModel.find()
    let success = req.flash('success')
    let error = req.flash('error')
    res.render("shop", {products, success, error})
})

router.get('/cart', isLoggedin ,async (req,res) => {
    let user = await userModel
    .findOne({email: req.user.email})
    .populate('cart')
    res.render("cart", {user})
})

router.get('/admin',async (req,res) => {
    let products = await productModel.find()
    res.render("admin", {products})
})



module.exports = router;