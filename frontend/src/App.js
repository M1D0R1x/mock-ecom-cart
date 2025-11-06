import React, { useState, useEffect } from "react";
import "./App.css";
import api from "./api";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import CheckoutForm from "./components/CheckoutForm";
import ReceiptModal from "./components/ReceiptModal";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  const fetchCart = async () => {
    const res = await api.get("/cart");
    setCart(res.data.items);
    setTotal(res.data.total);
  };

  const addToCart = async (id) => {
    await api.post("/cart", { productId: id, qty: 1 });
    fetchCart();
  };

  const removeFromCart = async (mongoId) => {
    await api.delete(`/cart/${mongoId}`);
    fetchCart();
  };

  const handleCheckout = async (formData) => {
    const res = await api.post("/checkout", { cartItems: cart });
    setReceipt({
      ...res.data.receipt,
      name: formData.name,
      email: formData.email,
    });
    setShowCheckout(false);
    fetchCart();
  };

  return (
      <div className="container">
        <h1 className="title">🛍️ Vibe Commerce</h1>

        <div className="grid">
          <ProductList products={products} addToCart={addToCart} />
          <Cart
              cart={cart}
              total={total}
              removeFromCart={removeFromCart}
              onCheckout={() => setShowCheckout(true)}
          />
        </div>

        {showCheckout && (
            <CheckoutForm
                onSubmit={handleCheckout}
                onCancel={() => setShowCheckout(false)}
            />
        )}

        {receipt && <ReceiptModal receipt={receipt} onClose={() => setReceipt(null)} />}
      </div>
  );
}

export default App;
