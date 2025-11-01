import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cart } = useCart();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">E-Com Cart</Link>
        <div>
          <Link className="btn btn-outline-light me-2" to="/">Products</Link>
          <Link className="btn btn-outline-light" to="/cart">
            Cart ({cart?.length || 0})
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
