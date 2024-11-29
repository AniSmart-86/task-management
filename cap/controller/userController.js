import validator from "validator";
import bcrypt from 'bcryptjs'
import userModel from "../model/userModels.js";
import jwt from 'jsonwebtoken'
import asyncHandler from "express-async-handler";




const RegisterUser = asyncHandler(async (req, res)=>{

try {

    const {name, email, password} = req.body
    console.log(req.body);

    if(!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Please fill all required fields" });
    }
  
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }
  
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }
  
    const userExists = await userModel.findOne({email});
    if (userExists) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }
  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    
    const userData = {
        name,
        email,
        password: hashedPassword
    }

    const newUser = new userModel(userData)
    const user = await newUser.save();
  
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn:'2d'});
  
    res.status(201).json({ success: true, token });
    
} catch (error) {
    console.log(error)
        return res.json({success: false, message: error.message})
}


});



// API FOR LOGIN
const LoginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if all required fields are provided
      if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" });
      }
  
      // Find the user by email
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ success: false, message: "User does not exist" });
      }
  
      // Compare the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: "Wrong password or email" });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "2d" });
  
      // Send success response
      return res.status(200).json({ success: true, token });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  


  
// API FOR USER PROFILE
const getProfile = async(req, res)=>{

try {
    
const { userId } = req.body
const userData = await userModel.findById(userId).select('-password')
res.json({success: true, userData})

} catch (error) {
    console.log(error)
        res.json({success: false, message: error.message})
}

};





export { RegisterUser, LoginUser, getProfile}

