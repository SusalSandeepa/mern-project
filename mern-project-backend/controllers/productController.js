import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export async function createProduct(req,res){    

    if (!isAdmin(req)){ // if not admin
        res.status(403).json({
            message: "You are not authorized to create a product"
        });
        return;  //stop the process if user isn't an admin
    }

    try {
        const productData  = req.body; // assign product data details that entered by user into productData

        const product = new Product(productData); // Product means mongoose model we created in product js

        await product.save();  //save product details into database

        res.json({
            message: "Product created successfully",
            product: product,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ //server error
            message: "Failed to create product"
        });
    }
}

export async function getProducts(req,res){  // we do not do authentication and authorization part here, because anyone can view the products(even the users who don't have accounts)
    try {
        const products = await Product.find(); // find products
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Failed to retrieve products",
        });
    }
}

export async function deleteProduct(req,res){    

    if (!isAdmin(req)){ // if not admin
        res.status(403).json({
            message: "You are not authorized to delete a product"
        });
        return;  //stop the process if user isn't an admin
    }

    try {
        
        const productID = req.params.productID // because we don't take productID from req body, we take it from request address (localhost:5000/products/COSM9987)

        await Product.deleteOne({
            productID: productID
        })

        res.json({
            message: "Product deleted successfully"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ //server error
            message: "Failed to delete product"
        });
    }
}

export async function updateProduct(req,res){    

    if (!isAdmin(req)){ // if not admin
        res.status(403).json({
            message: "You are not authorized to update a product"
        });
        return;  //stop the process if user isn't an admin
    }

    try {
        
        const productID = req.params.productID // because we don't take productID from req body, we take it from request address (localhost:5000/products/COSM9987)
        const updatedData = req.body; // get the data to be updated

        await Product.updateOne(
            {productID: productID},
            updatedData   
        );

        res.json({
            message: "Product updated successfully"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ //server error
            message: "Failed to update product"
        });
    }
}

export async function getProductId(req,res){  //to find a product by id
    try {
        const productID = req.params.productID;

        const product = await Product.findOne(
            {
                productID : productID
            }
        )

        if(product == null){
            res.status(404).json({
                message: "Product not found"
            });
        }else{
            res.json(product);
        }

    } catch(err){
        console.error(err);
        res.status(500).json({
            message: "Failed to retrieve product by ID",
        });
    }
}