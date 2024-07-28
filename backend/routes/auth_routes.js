import express from "express"
import {signup, login, logout } from "../controllers/auth_controllers.js";
import z from "zod";

const myZodSchema=z.object({
    fullName: z.string(),
    username: z.string(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    gender: z.string()
});

function validateSignup(req,res,next){
    const {fullName, userName, password, confirmPassword, gender}= req.body;
    const obj={
        fullName:fullName,
        username:userName,
        password:password,
        confirmPassword:confirmPassword,
        gender:gender
    }

    const response= myZodSchema.safeParse(obj);
    if(!response.success){
        res.status(400).send("Wrong inputs");
    }

    next();
}



const router =express.Router();

router.post("/login",login);
 
router.post("/signup", signup);

router.post("/logout",logout);

export default router;