const express = require('express')
const router = express.Router()
const Drink = require('../models/drink')


const getDrink = async (req, res, next) =>{
    try{
        drink = await Drink.findById(req.params.id)
        if(drink == null){
            return res.status(404).json({message: 'cannot find Drink Model'})
        }
    }catch(err){
        return res.status(500).json({message: err.message})
    }
    res.drink = drink
    next()
}

// getting all
router.get('/', async (req, res)=>{
    try{
        const drink = await Drink.find()
        res.json(drink)
    }catch(err){
        res.status(statusCode >= 100 && statusCode < 600 ? err.code : 500)
        // res.status(500).json({message: err.message})
    }
})
// getting one
router.get('/:id', getDrink, (req, res)=>{
    res.json(res.drink)
})
// creating one
router.post('/', async (req, res)=>{
    const drink = new Drink({
        DrinkName: req.body.DrinkName,
        Description: req.body.Description,
        provenance: req.body.provenance,
        vintage: req.body.vintage,
        menuCatType: req.body.menuCatType,
        perPubPricing: req.body.perPubPricing
    })
    try {
        const newDrink = await drink.save()
        res.status(201).json(newDrink)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
// updating one
router.patch('/:id', getDrink, async (req, res)=>{
    if(req.body.DrinkName != null){
        res.drink.DrinkName = req.body.DrinkName
    }
    if(req.body.Description != null){
        res.drink.Description = req.body.Description
    }
    if(req.body.provenance != null){
        res.drink.provenance = req.body.provenance
    }
    if(req.body.vintage != null){
        res.drink.vintage = req.body.vintage
    }
    if(req.body.menuCatType != null){
        res.drink.menuCatType = req.body.menuCatType
    }    
    if(req.body.perPubPricing != null){
        res.drink.perPubPricing = req.body.perPubPricing
    }    
    try {
        const updatedDrink = await res.drink.save()
        res.json(updatedDrink)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
// deleting one
router.delete('/:id', getDrink, async (req, res)=>{
    try {
        await res.drink.remove()
        res.json({message: 'Deleted Drink'})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})


module.exports = router
