const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userid:{
        type:String,
        require:true
    },
    amount:{
        type:Number,
        require:[true,'Amount is required']
    },
    type:{
        type:String,
        require:[true,'Type is requried']
    },
    category:{
        type:String,
        require:[true,'Category is requried']
    },
    reference:{
        type:String,

    },
    description:{
        type:String,
        require:[true,'Description is requried']
    },
    date:{
        type:Date,
        require:[true,'Date is required']
    }

},{
    timestamps:true
})


//export 
const transactionModel = mongoose.model('transaction',transactionSchema);
module.exports = transactionModel;