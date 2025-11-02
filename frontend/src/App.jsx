import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Table, Modal } from "react-bootstrap";
import ProductCard from "./components/ProductCard";
import { useCart } from "./context/CartContext";
import Checkout from "./Pages/Checkout";
import { Routes, Route, useNavigate } from 'react-router-dom';

const App = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const { cart, total, removeFromCart } = useCart();
  const navigate = useNavigate();


  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Container className="mt-4">
            <h2 className="mb-3">Products</h2>
            <Row>
              {products.map((product) => (
                <Col key={product._id} md={4}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
            <h2 className="mt-5">Cart</h2>
            {!cart || cart.length === 0 ? (
              <p>No items in cart.</p>
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Qty</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item._id}>
                      <td>{item.productName}</td>
                      <td>{item.qty}</td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => removeFromCart(item.productId)}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
            <div className="d-flex justify-content-between align-items-center">
              <h4>Total: ₹{total}</h4>
              <Button
                variant="success"
                onClick={() => setShowModal(true)}
              >
                Checkout
              </Button>
            </div>
            <div></div>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Checkout</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Checkout />
              </Modal.Body>
            </Modal>
          </Container>

        }
      />

      {/* ✅ Proper Route for Checkout */}
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );

};

export default App;
