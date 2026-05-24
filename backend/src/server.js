import express from "express";
import path from "path";
import {ENV} from "./lib/env.js";


const app=express()


const __dirname=path.resolve();

app.get("/status", (req,res)=>{
    res.send("Running like a cheetah...");
})




//Deployement to express serve the frontend

if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../frontend/dist/index.html")
    );
  });
}

app.listen(ENV.PORT,()=>{
    console.log("Server IS Running",ENV.PORT);
})  