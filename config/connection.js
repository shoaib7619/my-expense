const mongoose = require('mongoose');
const colors = require("colors");
MONGO_URL="mongodb+srv://shoaib7619:11665%40Shoaib@cluster0.fqnfm03.mongodb.net/expenseapp"
const connectDb = async () =>{
    try {
        await mongoose.connect(MONGO_URL)
        console.log(`Server is running on ${mongoose.connection.host}`.bgCyan.white);
    } catch (error) {
        console.log(`${error}`.bgRed)
    }
};
module.exports=connectDb;
