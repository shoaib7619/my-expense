const express = require('express');
const { addTransaction, getAllTransaction ,editTransaction,deleteTransaction} = require('../controller/transactionController');

//route obj
const router = express.Router();

//routes post method
router.post('/add-transaction',addTransaction);

//routes get method
router.post('/get-transaction',getAllTransaction);

//Edit routes method
router.post('/edit-transaction',editTransaction);

// Delete routes method
router.post('/delete-transaction',deleteTransaction);



// export
module.exports = router;