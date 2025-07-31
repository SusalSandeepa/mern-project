import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import jwt from "jsonwebtoken";

const app = express()

/* 
function success(){
 console.log("server is Started")
} 
*/

app.use(express.json()) //make unreadable http request to readable form and act as a middleware

app.use(  // middleware for authentication
    (req,res,next)=>{
        let token = req.header("Authorization") //because token is in the header of the request

        if(token != null){
            token = token.replace("Bearer ","") // remove "Bearer" part from the token
            console.log(token) 
            jwt.verify(token, "jwt-secret", //verify token and encrypt key to decrypt the encrypted data
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

const connectionString = "mongodb+srv://admin:123@cluster0.vhzzm3n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(connectionString).then(
    ()=>{
        console.log("Database Connected")
    }
).catch(
    ()=>{
        console.log("Database Connection Failed")
    }
)

app.use("/users",userRouter)
app.use("/products",productRouter)

app.listen(5000, 
    ()=>{
        console.log("server is started")
    }
)