const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')

 const login =async(req, res) => {
    const {
        loginId,
         password
      } = req.body;
      const user = await User.findOne({
          $or: [{
              "emailAddress": loginId
          }, {
              "phoneNumber": loginId
          }, {
              "userName": loginId
          }]
      });
      
    if (!user || !(await user.comparePassword(password))) {
     return res.status(StatusCodes.BAD_REQUEST).json({message:'Invalid Credentials'}) 
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ user:{ 
      phoneNumber: user.phoneNumber,
      emailAddress: user.emailAddress,
      gender: user.gender,
      status: user.status,
      userName:user.userName
    },token })
  };



  module.exports ={
      login
  }