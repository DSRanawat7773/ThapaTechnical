const User = require('../models/user_models');
const bcrypt = require("bcryptjs");

// Home route
const home = async (req, res) => {
    try {
        res.status(200).send("Welcome to the controllers.");
    } catch (error) {
        console.log(error);
    }
}

// Registration route
const register = async (req, res) => {
    try {
        console.log(req.body);
        const { username, email, phone, password } = req.body;

        // Check if user already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        // Create new user
        const userCreated = await User.create({ 
            username,
            email,
            phone,
            password // password will be hashed due to pre-save hook
        });

        // Send response with created user and token
        res.status(201).json({ 
            msg: "Registration Successful",
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
        });
    } catch (error) {
        console.log(error);  // Log the error for debugging
        // res.status(400).json({ msg: "Page not found." });  // Provide a meaningful error response
        next(error);    
    }
}

// ----- LOGIN LOGIC---///

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Debugging: Log the input email and password
        console.log('Login Attempt:', { email, password });

        const userExist = await User.findOne({ email });

        // Debugging: Check if the user was found
        console.log('User Found:', userExist);

        if (!userExist) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Compare password using the schema method
        const isValidPass = await userExist.comparePassword(password);

        // Debugging: Check if the password is valid
        console.log('Password Valid:', isValidPass);

        if (isValidPass) {
            res.status(200).json({ 
                msg: "Login Successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }

    } catch (error) {
        console.log(error);  // Log the error for debugging
        res.status(500).json({ msg: "Internal server error" });  // Provide a meaningful error response
    }
};

//SEND USER DATA - Use Logic



const user = async (req, res) => {
    try {
      // const userData = await User.find({});
      const userData = req.user;
      console.log(userData);
      return res.status(200).json({ userData });
    } catch (error) {
      console.log(` error from user route ${error}`);
    }
  };

module.exports = { home, register, login, user };
