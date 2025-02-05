import express from "express";
import dotenv from "dotenv"
import { connectDb } from "./Db/connectDb.js";
import authroutes from './routes/auth.routes.js'
import cookieParser from "cookie-parser";
import cors from 'cors'

dotenv.config();



const app =express()
app.use(cors({
    origin: "http://localhost:5173",  // Allow only your frontend origin
    credentials: true  // Allow cookies and authentication headers
}));

const PORT =process.env.PORT || 5001


app.use(express.json()) // parsing the body 
app.use(cookieParser());
app.use('/api/auth', authroutes)



app.listen(PORT,()=>{
    connectDb()
    console.log(`port listening at the port ${PORT}`)
})