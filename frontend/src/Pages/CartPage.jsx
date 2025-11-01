import React from "react";
import { useCart } from "./context/CartContext";

const CartPage = () => {
  const { cart, total, removeFromCart } = useCart();

  if (!cart || cart.length === 0) {
    return <div className="container mt-4"><h5>Your cart is empty.</h5></div>;
  }

  return (
    <div className="container mt-4">
      <h3>Your Cart</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item._id}>
              <td>{item.productId}X</td>
              <td>{item.qty}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeFromCart(item.productId)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4>Total: ₹{total}</h4>
    </div>
  );
};

export default CartPage;
