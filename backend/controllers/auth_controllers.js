import bcrypt from "bcryptjs";
import User from "../models/user_model.js";
import generateTokenAndSetCookie from "../utils/genTokens.js";

export const signup = async (req, res) => {

    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;


        if (password !== confirmPassword) {
            res.status(400).json({error: "Passwords don't match!"});
            return;
        }

        try {
            const user = await User.findOne({ username });
            if (user) {
                res.status(400).json({error:"Username Already Exixts"});
                return;
            }
        } catch (error) { 
            console.log("error in checking if username already exist: ", error.message);
        }

        // hashing the pass

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password,salt);


        const boyPP = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlPP = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password: hashedPass,
            gender,
            profilepic: gender === "male" ? boyPP : girlPP
        })

       if(newUser){
        // gen jwt token
        generateTokenAndSetCookie(newUser._id,res)

        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilepic: newUser.profilepic

        })
       }
       else{
        res.status(400).json({error:"Invalid user data"});
       }


    } catch (error) {
        console.log("error in signup controller", error.message);
        return res.status(500).json({error: "Internal Server Error"});
    }

}

export const login = async (req, res) => {
    try {

        const {username, password}=req.body;
        const user = await User.findOne({username});
        const isPassValid= bcrypt.compare(password, user? user.password : "")

        if(!user || !isPassValid){
            return res.status(400).json({error:"Invalid username or password"})
        }

        generateTokenAndSetCookie(user._id,res);

        res.status(200).json({
            _id:user._id,
            fullName: user.fullName,
            username: user.username,
            profilepic: user.profilepic
        });

        
    } catch (error) {
        console.log("error in login controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const logout = (req, res) => {
    try {

        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message: "Logged out successfully"})
        
    } catch (error) {
        console.log("error in logout controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}