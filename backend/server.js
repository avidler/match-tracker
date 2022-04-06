const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const port = process.env.port || 5000
const {errorHandler} = require("./middleware/errorMiddleware") 
const connectDB = require('./config/db')

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/usermatches', require('./routes/matchRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`App start on port ${port}`))

