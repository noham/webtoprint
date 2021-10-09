require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection

db.on('error', (error)=> console.error(error))
db.once('open', ()=> console.log('connected to db'))

//middleware
app.use(cors())
app.use(express.json())

// routes
const drinksRouter = require('./routes/drinks')
app.use('/drinks', drinksRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Listening on port " + PORT + "...");
}); 