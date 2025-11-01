import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection failed:", err));

app.use("/api/products",productRoutes);

app.use("/api", cartRoutes);

app.get("/", (req,res) => res.send("Server is running........"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port 5000"));