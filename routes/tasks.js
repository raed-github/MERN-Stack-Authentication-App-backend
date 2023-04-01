const express = require('express')

const router = express.Router()

const Task = require('../models/taskModel')

//GET all tasks
router.get('',(req,resp)=>{
    resp.json({message: 'GET all tasks'})
})

//GET a task by id
router.get('/:id',(req,resp)=>{
    resp.json({message: 'GET a task by id'})
})

//POST a task
router.post('',async(req,resp)=>{
    const {name,priority} = req.body
    try{
        const task = await Task.create({name,priority})
        resp.status(200).json(task)
    }catch(error){
        resp.status(400).json({error: error.message})
    }
})

//DELETE a task by id
router.delete('/:id',(req,resp)=>{
    resp.json({message: 'DELETE a task by id'})
})

//Update a task
router.patch('/:id',(req,resp)=>{
    resp.json({message: 'Update a task'})
})

module.exports = router