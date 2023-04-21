const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createJwtToken = (_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn:'1d'})
}

const loginUser = async (req,resp)=>{
    const {userName,password} = req.body
    try{
        const user = await User.loginUser(userName,password)
        //create token
        const token = createJwtToken(user._id)
        resp.status(200).json({userName: user.userName,token})
    }catch(error){
        resp.status(400).json({error: error.message})
    }
}

const singUpUser = async (req,resp)=>{
    const {userName,password} = req.body
    try{
        const user = await User.signupUser(userName,password)
        //create token
        const token = createJwtToken(user._id)
        resp.status(200).json({userName: user.userName,token})
    }catch(error){
        resp.status(400).json({error: error.message})
    }
}
module.exports = { loginUser, singUpUser }