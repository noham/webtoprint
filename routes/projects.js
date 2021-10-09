const express = require('express')
const router = express.Router()
const Project = require('../models/project')


const getProject = async (req, res, next) =>{
    try{
        project = await Project.findById(req.params.id)
        if(project == null){
            return res.status(404).json({message: 'cannot find project'})
        }
    }catch(err){
        return res.status(500).json({message: err.message})
    }
    res.project = project
    next()
}

// getting all
router.get('/', async (req, res)=>{
    try{
        const project = await Project.find()
        res.json(project)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})
// getting one
router.get('/:id', getProject, (req, res)=>{
    res.json(res.project)
})
// creating one
router.post('/', async (req, res)=>{
    const project = new Project({
        projectTitle: req.body.projectTitle,
        formats: req.body.formats,
        otherFormatSize: req.body.otherFormatSize,
        ShortSummary: req.body.ShortSummary,
        ProposedTitle: req.body.ProposedTitle,
        OfferDescription: req.body.OfferDescription,
        CalltoActions: req.body.CalltoActions,
        teamMember: req.body.teamMember,
        status: req.body.status,
        clientName: req.body.clientName,
        comments: req.body.comments,
        deadline: req.body.deadline,
        trafficColor: req.body.trafficColor
    })
    try {
        const newProject = await project.save()
        res.status(201).json(newProject)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
// updating one
router.patch('/:id', getProject, async (req, res)=>{
    if(req.body.projectTitle != null){
        res.project.projectTitle = req.body.projectTitle
    }
    if(req.body.formats != null){
        res.project.formats = req.body.formats
    }
    if(req.body.otherFormatSize != null){
        res.project.otherFormatSize = req.body.otherFormatSize
    }
    if(req.body.ShortSummary != null){
        res.project.ShortSummary = req.body.ShortSummary
    }
    if(req.body.ProposedTitle != null){
        res.project.ProposedTitle = req.body.ProposedTitle
    }
    if(req.body.OfferDescription != null){
        res.project.OfferDescription = req.body.OfferDescription
    }
    if(req.body.CalltoActions != null){
        res.project.CalltoActions = req.body.CalltoActions
    }
    if(req.body.teamMember != null){
        res.project.teamMember = req.body.teamMember
    }
    if(req.body.status != null){
        res.project.status = req.body.status
    }
    if(req.body.clientName != null){
        res.project.clientName = req.body.clientName
    }
    if(req.body.comments != null){
        res.project.comments = req.body.comments
    }
    if(req.body.deadline != null){
        res.project.deadline = req.body.deadline
    }
    if(req.body.trafficColor != null){
        res.project.trafficColor = req.body.trafficColor
    }
    
    try {
        const updatedProject = await res.project.save()
        res.json(updatedProject)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
// deleting one
router.delete('/:id', getProject, async (req, res)=>{
    try {
        await res.project.remove()
        res.json({message: 'Deleted Project'})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})


module.exports = router
