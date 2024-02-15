const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHanlder} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

const port = process.env.PORT || 5000

connectDB()
const app = express()

const goalsRoutes = require('./routes/goalRoutes')
const usersRoutes = require('./routes/userRoutes')

app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use('/api/goals', goalsRoutes)
app.use('/api/users', usersRoutes)

app.use(errorHanlder)

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})

