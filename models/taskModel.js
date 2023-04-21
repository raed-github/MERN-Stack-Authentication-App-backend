const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tasksSchema = new Schema({
    taskName:{
        type:String,
        required: true
    },
    priority:{
        type:Number,
        required: true
    },
    user_id:{
        type: String,
        required: true
    }
},{timestamps:true})
//this module.exports will create a schema for us which will be used to interact with the collection
module.exports = mongoose.model("Task",tasksSchema)