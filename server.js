require('dotenv').config()

const express = require('express')

const app = express()

//middleware
app.use((req,resp,next)=>{
    console.log(req.path,req.method)
    next()
})

app.get('/',(req,res)=>{
    res.json(`application is running on port ${port}`)
})

const port = process.env.PORT

app.listen(port,()=>{
    console.log(`app is running on port ${port}`)
})