const express = require('express');
const { loginController, registerController } = require('../controller/userController');

//route obj
const router = express.Router();

//POST || LOGIN USER
router.post('/login',loginController)

//POST || REGISTER USER
router.post('/register',registerController)
// export
module.exports = router;