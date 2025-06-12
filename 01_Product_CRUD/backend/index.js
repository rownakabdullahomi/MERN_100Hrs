import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
dotenv.config();

const app = express();
app.use(express.json()); // allows to accept JSON data in req.body


app.post("/api/products", async (req, res) => {
    const product = req.body;
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide all fields.." });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct })
    } catch (error) {
        console.error("Error in creating product", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }


});

app.delete("/api/products/:id", async (req, res) => {
    // const {id} = req.params;
    const id = req.params.id;
    console.log(id);
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product Deleted"});
    } catch (error) {
        res.status(404).json({success: false, message: "Product not found"});
    }
})





app.listen(5000, () => {
    connectDB();
    console.log("Server started at port: 5000");
})