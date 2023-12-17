const userModel = require('../models/userModel')


//LOGIN USER 
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email, password })
        if (!user) {
            return res.status(404).send('User not found')
        }
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(400).json({
            success: false,

        })
    }
}

//CREATE NEW USER

const registerController = async (req,res) => {
    const { email} = req.body
    const user = await userModel.findOne({email})
    if (user) {
        return res.status(400).send('Email Already Register')
    }
    else{
    try {
        const newUser = new userModel(req.body);
        await newUser.save()
        res.status(201).json({
            success:true,
            newUser,
        })
    } catch (error) {
        console.error(error);  // Log the actual error for debugging
        res.status(400).json({
            success: false,
            error: error.message,  // Send the error message to the client
        });
    }
    }
}

module.exports = { loginController, registerController }