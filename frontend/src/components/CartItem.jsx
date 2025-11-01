import React from "react";
import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { removeFromCart } = useCart();
  const price = item.product?.price || item.price || 0;

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <h6>{item.product?.name || "Unnamed Product"}</h6>
        <small>Qty: {item.qty}</small>
      </div>
      <div>
        ₹{price * item.qty}
        <button
          className="btn btn-sm btn-outline-danger ms-3"
          onClick={() => removeFromCart(item.productId)}
        >
          Remove
        </button>
      </div>
    </li>
  );
};

export default CartItem;
