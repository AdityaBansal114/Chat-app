import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth_routes.js";
import connectToDB from "./db/connectToDB.js";
import message_routes from "./routes/message_routes.js"
import userRoutes from "./routes/user_routes.js";

const app= express();
const PORT= process.env.PORT ;

dotenv.config();


app.use(express.json());
app.use(cookieParser());

app.use("/api/auth/",authRoutes);
app.use("/api/messages",message_routes);
app.use("/api/users",userRoutes)

app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.listen(PORT,()=>{
    connectToDB();
    console.log(`server running ${PORT}`);
}) 