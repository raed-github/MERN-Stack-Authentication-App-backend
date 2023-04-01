const express = require('express')

const router = express.Router()

//GET all tasks
router.get('',(req,resp)=>{
    resp.json({message: 'GET all tasks'})
})

//GET a task by id
router.get('/:id',(req,resp)=>{
    resp.json({message: 'GET a task by id'})
})

//POST a task
router.post('',(req,resp)=>{
    resp.json({message: 'POST a task'})

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