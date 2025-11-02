import React, { createContext, useContext, useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchCart = async () => {
    try {
      const res = await axiosClient.get("/api/cart");
      setCart(res.data.detailedCart || []);
      setTotal(res.data.total || 0);
    } catch (err) {
      console.error("Error fetching cart:", err.message);
    }
  };

  const addToCart = async (productId, qty = 1) => {
    try {
      await axiosClient.post("/api/cart", { productId, qty });
      await fetchCart();
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const removeFromCart = async (id) => {
    try {
      await axiosClient.delete(`/api/cart/${id}`);
      await fetchCart();
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const clearCart = async () => {
    setCart([]);
    setTotal(0);
  };

  useEffect(() => {
    fetchCart();
  }, []);
  
  return (
    <CartContext.Provider value={{ cart, total, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
