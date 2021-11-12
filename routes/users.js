const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require("bcryptjs")
const saltRounds = 10

// getting all
router.get('/', async (req, res)=>{
    try{
        const user = await User.find()
        res.json(user)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})
// password encrypting
const encrypt = (password)=>{
    bcrypt.genSalt(saltRounds, function (saltError, salt) {
        if (saltError) {
          throw saltError
        } else {
          bcrypt.hash(password, salt, function(hashError, hash) {
            if (hashError) {
              throw hashError
            } else {
              return hash
            }
          })
        }
      })
}

// creating one
router.post('/', async (req, res)=>{
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

module.exports = router
