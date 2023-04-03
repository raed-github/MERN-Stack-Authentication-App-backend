const User = require('../models/userModel')

const loginUser = async (req,resp)=>{
    const {userName,password} = req.body
    try{
        const user = await User.loginUser(userName,password)
        resp.status(200).json(user)
    }catch(error){
        resp.status(400).json({error: error.message})
    }
}

const singUpUser = async (req,resp)=>{
    const {userName,password} = req.body
    try{
        const user = await User.signupUser(userName,password)
        resp.status(200).json(user)
    }catch(error){
        resp.status(400).json({error: error.message})
    }
    console.log(resp)

}

module.exports = { loginUser, singUpUser }