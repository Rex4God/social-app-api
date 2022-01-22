const  Followers = require('../models/Followers')
const User = require('../models/User')


const suggestUser = async(req, res)=>{
User.findByIdAndUpdate(req.body.userId),{
    
}

}






module.exports ={suggestUser}