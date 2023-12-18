// import userRoutes from "./routes/userRoutes.js";
const express = require('express')
const morgan = require('morgan')
const cors = require('cors');
const  dotenv= require('dotenv')
const connectDb = require('./config/connection')
const path = require('path')
dotenv.config()

//database connection
connectDb()

//rest object
const app=express()

//middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

//static file
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.get("/*", function(_, res) {
  res.sendFile(path.join(__dirname,"./client/build/index.html"),function(err){
     res.status(500).send(err)
  }
    );
});

//routes for user
app.use("/api/v1/users", require("./routes/userRoute"));

//transections routes
app.use("/api/v1/transections", require("./routes/transectionRoutes"));

//port

const PORT =  process.env.PORT || 8080

//listen function
app.listen(PORT, () => {
    console.log(`Daily Expense Management is listening on port  http://localhost:${PORT}`)
  })
