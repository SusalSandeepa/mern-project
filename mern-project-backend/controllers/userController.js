import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function createUser(req,res){

    const hashedPassword = bcrypt.hashSync(req.body.password,10) // hash the password by 10 times(salting rounds)

    const user = new User(
        {
            email : req.body.email,
            firstName : req.body.firstName, 
            lastName : req.body.lastName,
            password: hashedPassword
        }
    )

    user.save().then(
        ()=>{
            res.json({
                message: "User created successfully"
            })
        }
    ).catch(
        ()=>{
            res.json({
                message: "Failed to create user"
            })
        }
    )
}

export function loginUser(req,res){
    User.findOne(
        {
            email: req.body.email // find if the email is already registered in the database
        }
    ).then(
        (user)=>{
            if(user == null){
                res.status(404).json( 
                    {
                        message: "User not found"
                    }
                )
            }else{
                const isPasswordMatching = bcrypt.compareSync(req.body.password, user.password) // compare the entered password and hash value in the db is matching
                if(isPasswordMatching){

                    const token = jwt.sign(
                        {
                            email: user.email,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            role: user.role,
                            isEmailVerified: user.isEmailVerified
                        }, // encrypt user data and save them as a token to store sensitive data like login details

                        "jwt-secret" // encrpt key
                    )
                    res.json(
                        {
                            message: "Login Successful",
                            token: token
                        }
                    )
                }else{
                    res.status(401).json( 
                        {
                            message: "Invalid Password"
                        }
                    )
                }
            }
        }
    )
}

export function isAdmin(req){
    if(req.user == null){  // check if there any user
        return false;      //return means stop (if user not logged in)
    }
    if(req.user.role != "admin"){ // if there is any user check the user role(admin or user)
        return false;             // stop if user is not an admin  
    }

    return true; // if user is an admin return the true value(continue the process)
}
