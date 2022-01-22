const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')

 const login =async(req, res) => {
    const {
      emailAddress,
      phoneNumber,
       userName,
       password
    } = req.body;
   
    const user = await User.findOne({
        $or: [{
            "emailAddress": emailAddress
        }, {
            "phoneNumber": phoneNumber
        }, {
            "userName": userName
        }]
    });
    if (!user || !(await user.comparePassword(password))) {
     return res.status(StatusCodes.UNAUTHORIZED).json({message:'Invalid Credentials'}) 
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ user:{ 
      phoneNumber: user.phoneNumber,
      emailAddress: user.emailAddress,
      gender: user.gender,
      status: user.status
    },token })
  };



  module.exports ={
      login
  }