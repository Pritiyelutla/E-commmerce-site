import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    productId : String,
    qty : {type: Number, default: 1}
})

export default mongoose.model("cart",cartSchema);