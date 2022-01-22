const mongoose = require('mongoose')

const followerSchema = new mongoose.Schema({
         paireID:{
          type: String,
          required: true,
          unique: true,
         },
         createdAt:{
             type: Date,
             default: Date.now(),
         },
         followID: {
             type: String,
             required: true,
            unique: true,
         },
         followRound:{
             type: Number,
         },
         receivedID:{
             type: String,
         },

        senderID:{
            type:String,
        }
})

module.exports =mongoose.model('Followers', followerSchema)