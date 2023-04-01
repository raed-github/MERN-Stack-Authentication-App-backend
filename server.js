require('dotenv').config()

const express = require('express')

const mongoose = require('mongoose')

const app = express()

const taskRoutes = require('./routes/tasks')

const port = process.env.PORT
const mongoURI = process.env.MONGO_URI
console.log(mongoURI)
//middleware
app.use((req,resp,next)=>{
    console.log(req.path,req.method)
    next()
})

app.use(express.json())

//routes
app.use('/api/tasks',taskRoutes)

//connect to DB
mongoose.connect(mongoURI)
    .then(()=>{
        //listen for requests
        app.listen(port,()=>{
            console.log(`app is connected to db and running on port ${port}`)
        })
    }).catch((error)=>{
        console.log(error)
    })