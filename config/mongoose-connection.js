const mongoose = require('mongoose')
require('dotenv').config()

let isConnected = false

async function connectDB() {
  if (isConnected) return

  await mongoose.connect(process.env.MONGO_URI)
  isConnected = true
  console.log('MongoDB connected')
}

connectDB()