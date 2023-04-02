const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new Schema({
    userName:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    }
},{timestamps:true})
//this module.exports will create a schema for us which will be used to interact with the collection
module.exports = mongoose.model("User",usersSchema)