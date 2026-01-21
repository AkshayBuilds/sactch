const mongoose = require('mongoose')
require('dotenv').config()

let isConnected = false

async function connectDB() {
  if (isConnected) return

  try {
    await mongoose.connect(process.env.MONGO_URI)
    isConnected = true
    console.log('MongoDB Connected')
  } catch (err) {
    console.error('MongoDB connection failed:', err)
    process.exit(1)
  }
}

module.exports = connectDB
