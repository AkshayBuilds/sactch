const express = require('express');
const app = express();
const cookieparser = require('cookie-parser')
const path = require('path')
const db = require('./config/mongoose-connection')
const ownerRoutes = require('./routes/ownersRouter')
const usersRoutes = require('./routes/usersRouter')
const productsRoutes = require('./routes/productsRouter')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", "ejs")
app.use(cookieparser())

app.use('/owners', ownerRoutes)
app.use('/users', usersRoutes)
app.use('/products', productsRoutes)

app.listen(3000)