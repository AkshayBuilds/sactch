const express = require('express')
const router = express.Router()
const upload  = require('../config/multer-config')
const productsModel = require('../models/product-model')

router.post('/create', upload.single('image') ,async (req,res) => {
    try{
         let {name,  price, discount, bgcolor, panelcolor, textcolor} = req.body

    let product = await productsModel.create({
        image: req.file.buffer,
        name,  
        price, 
        discount, 
        bgcolor, 
        panelcolor, 
        textcolor
    })
    req.flash("success", "Product Added successfully")
    res.redirect("/owners/admin")
    }
    catch(err){
        req.flash("error", 'Something went wrong')
        res.redirect('/owners/admin')
    } 
})

module.exports = router;