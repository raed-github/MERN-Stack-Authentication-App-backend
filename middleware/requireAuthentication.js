const jwt = require('jsonwebtoken')
const {logger} = require('../util/logging')
const User = require('../models/userModel')

const requireAuthentication = async (req,resp,next)=>{
    logger.log('info', `verifying authorization`);
    //verify authentication
    const authorization = req.headers.authorization
    logger.log('info', `authorization code =${authorization}`);
    if(!authorization){
        logger.log('info', `Authorization token not found`);
        return resp.status(401).json({error: 'Authorization token required'})
    }
    const token = authorization.split(' ')[1]
    try{
        const {_id} = jwt.verify(token,process.env.SECRET)
        req.user= await User.findOne({_id}).select('_id')
        logger.log('info', `Authorized Request`);
        next()
    }catch(error){
        logger.log('info', `UnAuthorized Request`);
        resp.status(401).json('UnAuthorizedRequest')
    }
}
module.exports = {requireAuthentication}