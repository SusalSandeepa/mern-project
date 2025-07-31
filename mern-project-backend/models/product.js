import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        productID : {
            type: String, //because product id jsut not a number it's mixed with letters and numbers
            required: true,
            unique: true, // only one id for only  one product
        },
        name : {
            type: String,
            required: true,
        },
        altnames : {
            type: [String], // we take it as an array because there aren't only one name, names >= 1
            default: [], // if some one didn't give alt names, it wiil be display as an empty array
            required: true
        },
        description : {
            type: String,
            required: true
        },
        images : {
            type: [String],
            default: [],
            required: true
        },
        price : {       //discounted price
            type: Number,
            required: true
        },
        labelledPrice : {  //original labelled price
            type: Number,
            required: true
        },
        category : {
            type: String,
            required: true
        }
    }
)

const Product = mongoose.model("Product", productSchema);
export default Product