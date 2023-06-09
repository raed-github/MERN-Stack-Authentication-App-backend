const Task = require('../models/taskModel')
const mongoose = require('mongoose')

//get tasks
const getTasks = async (req,resp)=>{
    //user object was already added to the object in the auth middleware
    const user_id = req.user._id
    const tasks = await Task.find({user_id}).sort({createAt: -1})
    resp.status(200).json(tasks)
}

//get workout by id
const getTaskById = async (req,resp)=>{
    const {id} = req.params
    //check if id is a valid id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return resp.status(404).json({error: "task not found"})
    }
    const task = await Task.findById(id)
    if(!task){
        return resp.status(404).json({error: 'task not found'})
    }
    resp.status(200).json(task)
}

//create tasks
const createTask = async (req,resp) => {
    const {taskName,priority} = req.body
    let emptyFields = []
    if(!taskName){
        emptyFields.push('taskName')
    }
    if(!priority){
        emptyFields.push('priority')
    }
    if(emptyFields.length>0){
        return resp.status(400).json({error:'Please fill in all fields',emptyFields})
    }
    try{
        //user object was already added to the object in the auth middleware
        const user_id = req.user._id
        const task = await Task.create({taskName,priority,user_id})
        resp.status(200).json(task)
    }catch(error){
        resp.status(400).json({error: error.message})
    }
}

//delete task
const deleteTask=async (req,resp)=>{
    const {id} = req.params
    //check if id is a valid id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return resp.status(404).json({error: "task not found"})
    }
    const task = await Task.findOneAndDelete({_id: id})
    if(!task){
        return resp.status(404).json({error: 'task not found'})
    }
    resp.status(200).json({message: "task deleted"})
}

//update task
const updateTask = async (req,resp)=>{
    const {id} = req.params
    //check if id is a valid id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return resp.status(404).json({error: "task not found"})
    }
    //what ever properties are in the request will be added to the findOneAndUpdate method  
    const task = await Task.findOneAndUpdate({_id:id},
        {...req.body})
    if(!task){
        return resp.status(404).json({error: 'task not found'})
    }
    resp.status(200).json(task)
}
module.exports={
    getTasks,
    getTaskById,
    createTask,
    deleteTask,
    updateTask
}