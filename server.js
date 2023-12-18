const express = require('express')
const morgan = require('morgan')
const cors = require('cors');
const  dotenv= require('dotenv')
const connectDb = require('./config/connection')
const path = require('path')

dotenv.config();


//database connection
connectDb()

//rest object
const app=express()

//middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())


//routes for user
app.use('/api/v1/users',require('.routes/userRoute'))

// Transactions routes
app.use('/api/v1/transactions', require('./routes/transactionsRoutes'));

//static file
app.use(express(path.join(__dirname,'./client/build')))

// Catch-all route for serving React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});


//port

const PORT = 8080 || process.env.PORT

//listen function
app.listen(PORT, () => {
    console.log(`Daily Expense Management is listening on port  http://localhost:${PORT}`)
  })