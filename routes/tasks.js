const express = require('express')

const router = express.Router()

const {getTasks,getTaskById,createTask,deleteTask,updateTask} = require('../controllers/tasksController')

const {cache} = require('../middleware/caching')

const {requireAuthentication} = require('../middleware/requireAuthentication')

//require authentication for all task routes
router.use(requireAuthentication)

//GET all tasks
router.get('', cache,getTasks)

//GET a task by id
router.get('/:id',cache, getTaskById)

//POST a task
router.post('',createTask)

//DELETE a task by id
router.delete('/:id',deleteTask)

//Update a task
router.patch('/:id',updateTask)

module.exports = router
