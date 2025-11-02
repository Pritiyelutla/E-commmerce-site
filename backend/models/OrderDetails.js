import mongoose from "mongoose";

const orderDetailsSchema = new mongoose.Schema({
    Name: String,
   email: String,
   products: Array,
    totalAmount: Number,
    timestamp: String
})

export default mongoose.model("OrderDetails",orderDetailsSchema);