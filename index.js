const express = require('express');
const app = express();
const cookieparser = require('cookie-parser')
const path = require('path')
const db = require('./config/mongoose-connection')
const ownerRoutes = require('./routes/ownersRouter')
const usersRoutes = require('./routes/usersRouter')
const productsRoutes = require('./routes/productsRouter')
const indexRoutes = require('./routes/index')
const session = require('express-session')
const flash = require('connect-flash')
const MongoStore = require('connect-mongo')
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", "ejs")
app.use(cookieparser())
app.set('trust proxy', 1)

app.use(session({
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions'
  }),
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: 'lax'
  }
}))
app.use(flash())

app.use('/', indexRoutes)
app.use('/owners', ownerRoutes)
app.use('/users', usersRoutes)
app.use('/products', productsRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('Server running on', PORT)
})