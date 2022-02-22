const express = require('express')
const router = express.Router()
const User = require('../models/user')

const getUser = async (req, res, next) =>{
    try{
        user = await User.findById(req.params.id)
        if(user == null){
            return res.status(404).json({message: 'cannot find User Model'})
        }
    }catch(err){
        return res.status(500).json({message: err.message})
    }
    res.user = user
    next()
}

router.get('/', async (req, res)=>{
    try{
        let username = req.query.user
        let password = req.query.pass

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
        password: req.body.password,
        associatedPub: req.body.associatedPub
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

// updating one
router.patch('/:id', getUser, async (req, res)=>{
      
    if(req.body.username != null){
        res.user.username = req.body.username
    }    
    if(req.body.password != null){
        res.user.password = req.body.password
    }    
    if(req.body.associatedPub != null){
        res.user.associatedPub = req.body.associatedPub
    }    
    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
// deleting one
router.delete('/:id', getUser, async (req, res)=>{
    try {
        await res.user.remove()
        res.json({message: 'Deleted User'})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})
module.exports = router
