const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

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

usersSchema.statics.loginUser = async function(userName, password) {
    if (!userName || !password) {
        throw Error('All fields must be filled')
    }
    const user = await this.findOne({userName})
    if (!user) {
        throw Error('Incorrect email')
    }
    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw Error('Incorrect password')
    }
    return user
}

usersSchema.statics.signupUser = async function(userName, password) {
    if(!userName||!password){
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(userName)){
        throw Error('Not a valid email')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Not a strong password')
    }
    const exists = await this.findOne({userName})
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    if(exists){
        throw Error('user name alread exists in database')
    }
    const user = await this.create({userName,password: hashedPassword})
    return user
}
//this module.exports will create a schema for us which will be used to interact with the collection
module.exports = mongoose.model("User",usersSchema)