import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {
        email : {       //primary key for user 
            type: String,
            required: true, // it means email is essential
            unique: true // it means email must be unique(one email belongs to only one user)
        },

        firstName : {
            type: String,
            required: true
        },

        lastName : {
            type: String,
            required: true
        },

        password : {
            type: String,
            required: true
        },

        role : {
            type : String,
            required : true,
            default : "user" //if someone add a user without assigning the role, it should be a user(type)
        },

        isBlock : {
            type : Boolean,
            default : false
        },

        isEmailVerified : {
            type : Boolean,
            default : false
        },

        image : {
            type : String,
            default : "/user.png"
        }
    }
)

const User = mongoose.model("User",userSchema) //User is collection name(db collection name) other one is schema's name(structure)
export default User