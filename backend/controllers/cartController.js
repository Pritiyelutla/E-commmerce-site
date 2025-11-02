import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import OrderDetails from "../models/OrderDetails.js";

export const addToCart = async (req, res) =>{
    console.log("addToCart called with body:", req.body);
    try{
        const {productId, qty} = req.body;

        const foundProduct = await Product.findById(productId);
        if(!foundProduct) 
            return res.status(400).json({message: "Product not found"});
        
        const existingCartItem = await Cart.findOne({productId});

        if(existingCartItem){
            const updatedQty = existingCartItem.qty + qty;;
            existingCartItem.qty = updatedQty;
            await existingCartItem.save();
            return res.status(200).json({message: "Cart updated"});
        }
        
        const newItem = new Cart({
            productId,
            qty: qty
        })
        await newItem.save();

        res.status(201).json({message: "cart item added"});
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const productId = id;
    console.log("Removing productId:", productId);

    const existingCartItem = await Cart.findOne({ productId });

    if (!existingCartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    const updatedQty = existingCartItem.qty - 1;

    if (updatedQty <= 0) {
      // delete existingCartItem from cart
      await Cart.deleteOne({ productId: existingCartItem.productId });
      return res.status(200).json({ message: "Item removed from cart" });
    }

    existingCartItem.qty = updatedQty;
    await existingCartItem.save();

    return res.status(200).json({
      message: "Item quantity updated",
      item: existingCartItem,
    });

  } catch (err) {
    console.error("Error removing item from cart:", err);
    res.status(500).json({ message: err.message });
  }
};


export const getCartAndTotal = async(req, res) =>{
    try{
        // getting cart items
        const cartItems = await Cart.find();

       // Manually attach product details
    const detailedCart = await Promise.all(
      cartItems.map(async (item) => {
        const product = await Product.findOne({ _id: item.productId });
        return {
          ...item.toObject(),
          productName: product ? product.name : "Unknown",
          price: product ? product.price : 0,
          totalPrice: product ? product.price * item.qty : 0,
        };
      })
    );

    const total = detailedCart.reduce((sum, item) => sum + item.totalPrice, 0);

    res.json({ detailedCart, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// how to make it post?
export const checkout = async (req, res) => {
    try{
        //total
        const {name, email} = req.body;

        const cartItems = await Cart.find();

        let totalAmount = 0;
        for(let item of cartItems){
            const p = await Product.findById(item.productId);
            if(p){
                totalAmount += p.price * item.qty;
            }
        }

        //timestamp
        const timestamp = new Date().toISOString();
        
        // saving order details
        const newOrder = new OrderDetails({
            Name: name,
            email: email,
            products: cartItems,
            totalAmount,
            timestamp
        });

        await newOrder.save();

        //clearing cart after a checkout
        await Cart.deleteMany();

        res.json({
            message: "Checkout successful",
            totalAmount,
            timestamp
        });
    }catch(err){
        res.status(500).json({message: err.message});
    }
};