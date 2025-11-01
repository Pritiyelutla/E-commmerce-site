import products from "../models/Product.js";

export const getAllProducts = async (req, res) =>{
    try{
        const allproducts = await products.find();
        res.status(200).json(allproducts);
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

