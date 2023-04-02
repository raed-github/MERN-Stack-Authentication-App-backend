const User = require('../models/userModel')

const loginUser = async (req,resp)=>{
    const {userName,password} = req.body
    if (!userName || !password) {
        throw Error('All fields must be filled')
    }
    const user = await User.findOne({ userName })
    if (!user) {
        throw Error('Incorrect email')
    }
    resp.status(200).json(user)
}

const singUpUser = async (req,resp)=>{
    const {userName,password} = req.body
    const exists = await User.findOne({userName})
    if(exists){
        throw Error('user name alread exists in database')
    }
    try{
        const user = await User.create({userName,password})
        resp.status(200).json(user)
    }catch(error){
        resp.status(400).json({error: error.message})
    }
    console.log(resp)

}

module.exports = { loginUser, singUpUser }