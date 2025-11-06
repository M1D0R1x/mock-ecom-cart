const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ===== Mongo Connection =====
const MONGO_URI =
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/vibe_cart";

mongoose
    .connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB error:", err.message));

// ===== Schemas =====
const CartSchema = new mongoose.Schema({
    productId: Number,
    name: String,
    price: Number,
    qty: Number,
});
const Cart = mongoose.model("Cart", CartSchema);

const TransactionSchema = new mongoose.Schema({
    name: String,
    email: String,
    items: [
        { name: String, price: Number, qty: Number }
    ],
    total: Number,
    timestamp: { type: Date, default: Date.now }
});
const Transaction = mongoose.model("Transaction", TransactionSchema);

// ===== Mock Products =====
const products = [
    { id: 1, name: "T-Shirt", price: 500 },
    { id: 2, name: "Shoes", price: 1200 },
    { id: 3, name: "Bag", price: 800 },
    { id: 4, name: "Watch", price: 2000 },
    { id: 5, name: "Cap", price: 300 }
];

// ===== Routes =====

// 1️⃣ Get products
app.get("/api/products", (req, res) => res.json(products));

// 2️⃣ Add to cart
app.post("/api/cart", async (req, res) => {
    try {
        const { productId, qty } = req.body;
        const product = products.find(p => p.id === productId);
        if (!product) return res.status(404).json({ error: "Product not found" });

        let existing = await Cart.findOne({ productId });
        if (existing) {
            existing.qty += qty;
            await existing.save();
            return res.json(existing);
        }

        const newItem = new Cart({
            productId,
            name: product.name,
            price: product.price,
            qty
        });
        await newItem.save();
        res.json(newItem);
    } catch (err) {
        console.error("Error in POST /api/cart:", err);
        res.status(500).json({ error: "Server error while adding to cart" });
    }
});

// 3️⃣ Get cart
app.get("/api/cart", async (req, res) => {
    try {
        const items = await Cart.find();
        const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
        res.json({ items, total });
    } catch (err) {
        console.error("Error in GET /api/cart:", err);
        res.status(500).json({ error: "Server error while fetching cart" });
    }
});

// 4️⃣ Delete from cart
app.delete("/api/cart/:id", async (req, res) => {
    try {
        const item = await Cart.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ error: "Item not found" });
        res.json({ message: "Item removed" });
    } catch (err) {
        console.error("Error in DELETE /api/cart/:id:", err);
        res.status(500).json({ error: "Server error while deleting item" });
    }
});

// 5️⃣ Checkout
app.post("/api/checkout", async (req, res) => {
    try {
        const { cartItems, name, email } = req.body;
        if (!cartItems || cartItems.length === 0)
            return res.status(400).json({ error: "Cart is empty" });

        const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

        const tx = new Transaction({
            name,
            email,
            items: cartItems.map(i => ({
                name: i.name,
                price: i.price,
                qty: i.qty
            })),
            total
        });
        await tx.save();

        await Cart.deleteMany();

        res.json({
            receipt: {
                id: tx._id,
                name,
                email,
                total,
                timestamp: tx.timestamp
            }
        });
    } catch (err) {
        console.error("Error in POST /api/checkout:", err);
        res.status(500).json({ error: "Server error during checkout" });
    }
});

// 6️⃣ Get all transactions
app.get("/api/transactions", async (req, res) => {
    try {
        const data = await Transaction.find().sort({ timestamp: -1 });
        res.json(data);
    } catch (err) {
        console.error("Error in GET /api/transactions:", err);
        res.status(500).json({ error: "Server error fetching transactions" });
    }
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
