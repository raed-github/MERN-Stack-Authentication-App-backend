const express = require('express')
const router = express.Router()

const {loginUser,singUpUser} = require('../controllers/userController')

//login route
router.post('/login',loginUser)

//registration route
router.post('/signup',singUpUser)

module.exports = router