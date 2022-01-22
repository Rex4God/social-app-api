const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
      userID:{
       type: String,
       required:true,
        },
  countryCode:{
       type: String,
       min: 3,
       max: 6,
      },
   Dob:{
  type:Date,
  default: Date.now(),
  },
  emailAddress:{
    type: String,
    required: [true, " Please Provide your email Address"],
    match: [
     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
     unique: true,
  },
  emailverify:{
      type: Boolean,
      default: false,
  },
  fullname:{
      type: String,
  },
  gender:{
      type: String,
  },
  password:{
      type: String,
      required:[true, 'Please provide your Password details'],
      unique: true,
  },
  phoneNumber:{
      type:String,
      required:  [true, 'Please provide phone number'],
      unique:true,
  },
  profilePic:{
      type: String,
  },
  registerDate:{
      type: Date,
      default: Date.now(),
  },
registerType:{
    type: String,
},
status: {
    type: String,
    enum: ['active', 'inactive', 'offline'],
    default: 'active',
},
subscription:{
    type: String,
    enum:['basic', 'advance'],
    default: 'basic',
},
userName:{
    type: String,
    required:[true,'Please provide your username'],
    unique: true,
},
wallet:{
    type: Number,
},
deviceOS:{
    type: String,
    enum:['android','ios'],
    default:'android',
},
deviceToken: {
    type: String,
},
loginType:{
    type: String,
},

})

 userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  })
  
  userSchema.methods.createJWT = function () {
    return jwt.sign(
      { _id: this.userID, fullname: this.fullname},
      process.env.JWT_SECRET,
      {
      expiresIn: process.env.LIFE_TIME,
      }
    )
  }
  
userSchema.methods.comparePassword = async function (canditatePassword) {
const isMatch = await bcrypt.compare(canditatePassword, this.password)
return isMatch
  }

module.exports =mongoose.model('User', userSchema)