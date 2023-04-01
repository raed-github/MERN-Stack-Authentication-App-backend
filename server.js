require('dotenv').config()

const express = require('express')

const app = express()

const taskRoutes = require('./routes/tasks')

//middleware
app.use((req,resp,next)=>{
    console.log(req.path,req.method)
    next()
})

app.use(express.json())

app.use('/api/tasks',taskRoutes)

const port = process.env.PORT

app.listen(port,()=>{
    console.log(`app is running on port ${port}`)
})