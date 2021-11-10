const express = require('express')
const router = express.Router()
const Pub = require('../models/pub')


const getPub = async (req, res, next) =>{
    try{
        pub = await Pub.findById(req.params.id)
        if(pub == null){
            return res.status(404).json({message: 'cannot find pub Model'})
        }
    }catch(err){
        return res.status(500).json({message: err.message})
    }
    res.pub = pub
    next()
}

// getting all
router.get('/', async (req, res)=>{
    try{
        const pub = await Pub.find()
        res.json(pub)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})
// getting one
router.get('/:id', getPub, (req, res)=>{
    res.json(res.pub)
})
// creating one
router.post('/', async (req, res)=>{
    const pub = new Pub({
        pubName: req.body.pubName,
        pageSize: req.body.pageSize,
        savedDrinksList: req.body.savedDrinksList
    })
    try {
        const newPub = await pub.save()
        res.status(201).json(newPub)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
// updating one
router.patch('/:id', getPub, async (req, res)=>{
    if(req.body.pubName != null){
        res.pub.pubName = req.body.pubName
    } 
    if(req.body.pageSize != null){
        res.pub.pageSize = req.body.pageSize
    } 
    if(req.body.savedDrinksList != null){
        res.pub.savedDrinksList = req.body.savedDrinksList
    } 
    try {
        const updatedPub = await res.pub.save()
        res.json(updatedPub)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})


// deleting one
router.delete('/:id', getPub, async (req, res)=>{
    try {
        await res.pub.remove()
        res.json({message: 'Deleted Pub'})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})


module.exports = router
