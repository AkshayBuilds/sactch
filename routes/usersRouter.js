const express = require('express')
const router = express.Router()
const {registeruser, loginuser, logoutuser} = require('../controllers/AurthCantroller')
const { isLoggedin } = require('../middlewares/isLoggedin')

router.post('/register', registeruser)

router.post('/login', loginuser)

router.get('/logout', logoutuser)

module.exports = router;