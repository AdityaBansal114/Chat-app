import path from 'path'
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth_routes.js";
import connectToDB from "./db/connectToDB.js";
import message_routes from "./routes/message_routes.js"
import userRoutes from "./routes/user_routes.js";
import { app, server } from "./socket/socket.js";

const PORT= process.env.PORT ;

const __dirname = path.resolve();

dotenv.config();


app.use(express.json());
app.use(cookieParser());

app.use("/api/auth/",authRoutes);
app.use("/api/messages",message_routes);
app.use("/api/users",userRoutes)

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname, "frontend" , "dist" , "index.html"));
})

server.listen(PORT,()=>{
    connectToDB();
    console.log(`server running ${PORT}`);
}) 