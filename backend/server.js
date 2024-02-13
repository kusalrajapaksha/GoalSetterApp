const express = require('express')
const dotenv = require('dotenv').config()
const {errorHanlder} = require('./middleware/errorMiddleware')

const port = process.env.PORT || 5000

const app = express()

const goalsRoutes = require('./routes/goalRoutes')


app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use('/api/goals', goalsRoutes)

app.use(errorHanlder)

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})

