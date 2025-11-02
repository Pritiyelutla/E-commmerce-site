import axiosClient from "../api/axiosClient";
import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const { cart, total, removeFromCart, clearCart } = useCart();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function checkoutDetails() {
    try {
      const res = await axiosClient.post("/api/checkout", {
      name: formData.name.trim(),
      email: formData.email.trim(),
    });

    if(res.status === 200){
      clearCart();
      setSubmitted(true);
    }else{
      setError("Checkout failed. Please try again.");
    }
    }catch (err) {
      setError("Checkout failed. Please try again.");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    checkoutDetails();
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "500px" }}>
      {error ? 
      (
        <Alert variant="error" className="text-center">
          {error}
        </Alert>
      ) : submitted ? (
        <Alert variant="success" className="text-center">
          Checkout successful!
        </Alert>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="d-grid">
            <Button variant="success" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Container>
  );
};

export default Checkout;
