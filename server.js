const express = require('express')

const app = express()


app.get('/',(req,res)=>{
    res.json(`application is running on port ${port}`)
})

const port = 4000

app.listen(port,()=>{
    console.log(`app is running on port ${port}`)
})