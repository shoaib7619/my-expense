const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,'Name must be requried']
    },
    email:{
        type:String,
        required:[true,'Email must be unique'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Password must be requried']
    }
},{
    timestamps: true
})

//erport
const userModel = mongoose.model('users',userSchema)
module.exports = userModel