const Task = require('../models/taskModel')
const mongoose = require('mongoose')

//get tasks
const getTasks = async (req,resp)=>{
    const tasks = await Task.find({}).sort({createAt: -1})
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
    const {name,priority} = req.body
    try{
        const task = await Task.create({name,priority})
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