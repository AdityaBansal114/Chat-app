import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const connectToDB= async()=>{
    try {

        await mongoose.connect(process.env.Mongo_DB_URI);
        console.log("connected to database");
        
    } catch (error) {

        console.log("error conneting to database",error.message)
        
    }
};

export default connectToDB;