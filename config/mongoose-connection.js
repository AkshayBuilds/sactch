const mongoose = require('mongoose')
const dbgr = require('debug')("development: mongoose")
require('dotenv').config()

dbgr
mongoose
.connect(process.env.MONGO_URI)
.then(() => {
    dbgr('MongoDb Connected SuccessFully')
})
.catch((err) => {
    dbgr(err)
})