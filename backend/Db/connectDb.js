import mongoose from "mongoose";
import { configDotenv } from "dotenv";



export const connectDb = async () =>{
   try{
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongodb connected:${conn.connection.host}`)
   }
   catch(error){
    console.log("error, connection to mongodb",error.message)
    process.exit(1);
   }
}