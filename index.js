//to load .env file (require('dotenv').config()) is used
require('dotenv').config()

//import express 
const express = require('express')

//import cors
const cors = require('cors')

//import router
const router = require('./Routes/routes')

//import db
require('./DB/connection')

// for reference only const middlewares = require('./Middlewares/appMiddleware')



//to create express server
const pfServer = express()

//use cors
pfServer.use(cors())

//parse json data using server app
pfServer.use(express.json())
// for reference only pfServer.use(middlewares.appMiddleware())


//use router
pfServer.use(router)


//customise port for server app
const PORT = 4000 || process.env.PORT

//exports uploads folder
pfServer.use('/uploads',express.static('./uploads'))


//to run server app use listen()
pfServer.listen(PORT,()=>{
    console.log(`Project Fair Server Started at port: ${PORT}`);
})

//resolve request to localhost:4000
pfServer.get('/',(req,res)=>{
    res.send(`<h1>Project Fair Server Started and waiting for client request!!!</h1>`)
})

//