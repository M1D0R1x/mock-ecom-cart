const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB (use local or Atlas URI)
mongoose.connect("mongodb://127.0.0.1:27017/vibe_cart")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

// Schema
const ProductSchema = new mongoose.Schema({ name: String, price: Number });
const Product = mongoose.model("Product", ProductSchema);

const CartSchema = new mongoose.Schema({ productId: String, qty: Number });
const Cart = mongoose.model("Cart", CartSchema);

// Mock Products
const products = [
    { id: 1, name: "T-Shirt", price: 500 },
    { id: 2, name: "Shoes", price: 1200 },
    { id: 3, name: "Bag", price: 800 },
    { id: 4, name: "Watch", price: 2000 },
    { id: 5, name: "Cap", price: 300 }
];

// Routes
app.get("/api/products", (req, res) => res.json(products));

app.post("/api/cart", async (req, res) => {
    const { productId, qty } = req.body;
    const cartItem = new Cart({ productId, qty });
    await cartItem.save();
    res.json(cartItem);
});

app.get("/api/cart", async (req, res) => {
    const cart = await Cart.find();
    const items = cart.map(item => {
        const product = products.find(p => p.id === parseInt(item.productId));
        return { ...product, qty: item.qty };
    });
    const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    res.json({ items, total });
});

app.delete("/api/cart/:id", async (req, res) => {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removed" });
});

app.post("/api/checkout", (req, res) => {
    const { cartItems } = req.body;
    const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
    res.json({ receipt: { total, timestamp: new Date() } });
});

app.listen(5000, () => console.log("Server running on port 5000"));
