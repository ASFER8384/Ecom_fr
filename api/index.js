import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRouter from "./routes/user.js"
import authRouter from "./routes/auth.js"

dotenv.config()



mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log("connect");
    })
    .catch((err) => {
        console.log(err);
    })

const app = express();
app.use(express.json())

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "internal server error";
    res.json({
        success:false,
        statusCode,
        message
    })
})


app.listen(5000, () => {
    console.log("Port Running");
})