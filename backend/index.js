import express from "express";
import dotenv from "dotenv"

dotenv.config();



const app =express()
const PORT =process.env.PORT ||5000

app.get('/',(req ,res) =>{
    res.send("hello neeraj kushwaha");
})

app.listen(3000,()=>{
    console.log("port listening at the port 3000")
})