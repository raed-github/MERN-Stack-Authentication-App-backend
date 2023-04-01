const express = require('express')

const router = express.Router()

const {getTasks,getTaskById,createTask,deleteTask,updateTask} = require('../controllers/tasksController')

//GET all tasks
router.get('',getTasks)

//GET a task by id
router.get('/:id',getTaskById)

//POST a task
router.post('',createTask)

//DELETE a task by id
router.delete('/:id',deleteTask)

//Update a task
router.patch('/:id',updateTask)

module.exports = router