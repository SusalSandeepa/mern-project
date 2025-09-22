import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import orderRouter from "./routes/orderRouter.js";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const app = express()

app.use(cors())

app.use(express.json()) //make unreadable http request to readable form and act as a middleware

app.use(  // middleware for authentication
    (req,res,next)=>{
        let token = req.header("Authorization") //because token is in the header of the request

        if(token != null){
            token = token.replace("Bearer ","") // remove "Bearer" part from the token
            console.log(token) 
            jwt.verify(token, process.env.JWT_SECRET, //verify token and encrypt key to decrypt the encrypted data
                (err, decoded)=>{
                    if(decoded == null){
                        res.json({
                            message: "Invalid token please login again"
                        })
                        return
                    }else{
                        req.user = decoded
                    }
                }
            ) 
        }
        next()
    }
)

const connectionString = process.env.MONGO_URI;

mongoose.connect(connectionString).then(
    ()=>{
        console.log("Database Connected")
    }
).catch(
    ()=>{
        console.log("Database Connection Failed")
    }
)

app.use("/api/users",userRouter)
app.use("/api/products",productRouter)
app.use("/api/orders",orderRouter)

app.listen(5000, 
    ()=>{
        console.log("server is started")
    }
)