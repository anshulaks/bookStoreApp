import User from "../model/user.model.js"
import bcryptjs from "bcryptjs"

export const signup=async (req,res)=>{

    try{
const {fullname,email,password}=req.body
const user=await User.findOne({email})    
if(user){
    return res.status(400).json({message:"user already exist"})
}
const hashedPassword=await bcryptjs.hash(password,10);
const createdUser= new User({
    fullname: fullname,
    email: email,
    password: hashedPassword,
})
await createdUser.save()
res.status(201).json({message:"user created successfully",user:{
    _id: createdUser._id,
    fullname: createdUser.fullname,
    email: createdUser.email
}})
}
    catch(error){
console.log("Error: "+ error.message)
res.status(500).json({message:"internal server error"})
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});
        
        // First check if the user exists to avoid calling compare on a null value
        if (!user) {
            console.log("User not found with email:", email);
            return res.status(400).json({message: "Invalid credentials"});
        }
        
        // If user exists, compare the provided password with the hashed password
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            console.log("Password does not match for email:", email);
            return res.status(400).json({message: "Invalid credentials"});
        }

        // If password matches, return success response
        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
            }
        });
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}
