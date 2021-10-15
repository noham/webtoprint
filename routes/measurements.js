const express = require('express')
const router = express.Router()
const Measurement = require('../models/measurement')


const getMeasurement = async (req, res, next) =>{
    try{
        measurement = await Measurement.findById(req.params.id)
        if(measurement == null){
            return res.status(404).json({message: 'cannot find Measurement Model'})
        }
    }catch(err){
        return res.status(500).json({message: err.message})
    }
    res.measurement = measurement
    next()
}

// getting all
router.get('/', async (req, res)=>{
    try{
        const measurement = await Measurement.find()
        res.json(measurement)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})
// getting one
router.get('/:id', getMeasurement, (req, res)=>{
    res.json(res.measurement)
})
// creating one
router.post('/', async (req, res)=>{
    const measurement = new Measurement({
        measurement: req.body.measurement,
    })
    try {
        const newMeasurement = await measurement.save()
        res.status(201).json(newMeasurement)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
// updating one
router.patch('/:id', getMeasurement, async (req, res)=>{
    if(req.body.measurement != null){
        res.measurement.measurement = req.body.measurement
    } 
    try {
        const updatedMeasurement = await res.measurement.save()
        res.json(updatedMeasurement)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
// deleting one
router.delete('/:id', getMeasurement, async (req, res)=>{
    try {
        await res.measurement.remove()
        res.json({message: 'Deleted category'})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})


module.exports = router
