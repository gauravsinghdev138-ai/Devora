import express from "express";
import {ENV} from "./lib/env.js";


const app=express()

app.get("/", (req,res)=>{
    res.send("Running");
})

app.listen(ENV.PORT,()=>{
    console.log("Server IS Running");
})  