const express = require('express')
const router = express.Router()
const User = require('../models/user')




// getting all
router.get('/', async (req, res)=>{
    try{
        // const user = await User.find()
        // res.json(user)


        module.exports = {
            loginUser: function(username, password, callback) {
              User.findOne({username: username}).exec(function(error, user) {
                if (error) {
                  callback({error: true})
                } else if (!user) {
                  callback({error: true})
                } else {
                  user.comparePassword(password, function(matchError, isMatch) {
                    if (matchError) {
                      callback({error: true})
                    } else if (!isMatch) {
                      callback({error: true})
                    } else {
                      callback({success: true})
                    }
                  })
                }
              })
            }
          }






    }catch(err){
        res.status(500).json({message: err.message})
    }
})

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
