const express = require('express');
const app = express()
const logger = require('morgan')
require('dotenv').config();
const connectDB = require('./config/connect')
const authRouter  = require('./routes/users')
const followersRouter =  require('./routes/follower')
const authenticateUser = require('./middlewares/authentication');
// error handler
const notFoundMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');





//Middlewares Declaration
app.use(express.json());
app.use(express.urlencoded({extended: false }))
app.use(logger('dev'))




// Routing Declaration
 app.use('/api/v1', authRouter)
 app.use('/api/v1',authenticateUser, followersRouter)


//Error Handler Middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);







//Server Connection Configuration

    const port = process.env.PORT || 5000
    const start =async() =>{
    try{
    await connectDB(process.env.MONGO_URI)
    const server =app.listen(port,console.log(`Server is listening at ${port}.....`))
    process.on("unhandledRejection", (err,promise)=>{
     console.log(`Logged Error ${err}`);
     server.close(()=>process.exit(1))
     });
    console.log('CONNECTED TO THE DATABASE @LOCALHOST 27017')
}catch(error){
    console.log(error)
}

} 
start()







