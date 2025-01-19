import express from "express";
import dotenv from "dotenv"
import { connectDb } from "./Db/connectDb.js";
import authroutes from './routes/auth.routes.js'
import cookieParser from "cookie-parser";

dotenv.config();



const app =express()


const PORT =process.env.PORT ||5000


app.use(express.json()) // parsing the body 
app.use(cookieParser());
app.use('/api/auth', authroutes)



app.listen(PORT,()=>{
    connectDb()
    console.log("port listening at the port 3000")
})