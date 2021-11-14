const express = require('express')
const router = express.Router()
const User = require('../models/user')


router.get('/', async (req, res)=>{
    try{
        let username = req.body.username
        let password = req.body.password
    
        User.findOne({username: username}).exec(function(error, user) {
            if (error) {
                res.json({user: false})
            } else if (!user) {
                res.json({user: false})
            } else {
                user.comparePassword(password, function(matchError, isMatch) {
                    if (matchError) {
                        res.json({user: false})
                    } else if (!isMatch) {
                        res.json({user: false})
                    } else {
                        res.json({user: true})
                    }
                    })
            }
            })
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
