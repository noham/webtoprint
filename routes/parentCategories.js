const express = require('express')
const router = express.Router()
const Category = require('../models/parentCategory')


const getCategory = async (req, res, next) =>{
    try{
        category = await Category.findById(req.params.id)
        if(category == null){
            return res.status(404).json({message: 'cannot find Category Model'})
        }
    }catch(err){
        return res.status(500).json({message: err.message})
    }
    res.category = category
    next()
}

// getting all
router.get('/', async (req, res)=>{
    try{
        const category = await Category.find()
        res.json(category)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})
// getting one
router.get('/:id', getCategory, (req, res)=>{
    res.json(res.category)
})
// creating one
router.post('/', async (req, res)=>{
    const category = new Category({
        categoryName: req.body.categoryName,
        parentCategoryName: req.body.parentCategoryName
    })
    try {
        const newCategory = await category.save()
        res.status(201).json(newCategory)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
// updating one
router.patch('/:id', getCategory, async (req, res)=>{
    if(req.body.parentCategoryName != null){
        res.category.parentCategoryName = req.body.parentCategoryName
    } 
    try {
        const updatedCategory = await res.category.save()
        res.json(updatedCategory)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
// deleting one
router.delete('/:id', getCategory, async (req, res)=>{
    try {
        await res.category.remove()
        res.json({message: 'Deleted category'})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})


module.exports = router
