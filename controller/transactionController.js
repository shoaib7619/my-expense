const transactionModel = require("../models/transactionModel")
const moment = require("moment");
const { trace } = require("../routes/transactionRoute");

const getAllTransaction =async (req, res)=>{
    try {
        const {frequency ,selectedDate,type} = req.body
            const transaction  = await transactionModel.find({
            ...(frequency !== 'custom' ?{
                date : {
                    $gt : moment().subtract(Number(frequency), 'd').toDate()
                },
            }   :
                {
                    date : {
                        $gte : selectedDate[0],
                        $lte : selectedDate[1],
                    },
                }),          
            userid : req.body.userid,
            ...(type !=='all' && { type })   

        });
        res.status(200).send(transaction)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            error
        })
    }

}


const addTransaction =async (req,res)=>{
    try {
        const newTransaction  = new transactionModel(req.body);
        await newTransaction.save();
        res.status(201).send("Transaction Create")
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            error
        })
    }

}

const editTransaction = async (req, res) => {
    try {
      const transactionId = req.body.transactionId; // Make sure to use the correct property name
      const updatePayload = req.body.payload;
      // Ensure that the payload is not empty
      if (!Object.keys(updatePayload).length) {
        return res.status(400).send("Update payload is empty");
      }
  
      // Use await for findOneAndUpdate
      const updatedTransaction = await transactionModel.findOneAndUpdate(
        { _id: transactionId },
        updatePayload,
        { new: true } // This option returns the modified document
      );
  
      if (!updatedTransaction) {
        return res.status(404).send("Transaction not found");
      }
  
      res.status(200).send("Edit Successfully");
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  };

  


const deleteTransaction = async(req,res)=>{
    try {
        await transactionModel.findByIdAndDelete( { _id: req.body.transactionId })
        res.status(200).send('Transaction delete Successfully')
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
        
    }
   
}
module.exports={getAllTransaction,addTransaction,editTransaction,deleteTransaction}