function Cart({ cart, total, removeFromCart, onCheckout }) {
    return (
        <div className="card">
            <h2>Cart</h2>
            {cart.length === 0 ? (
                <p>No items in cart.</p>
            ) : (
                <>
                    {cart.map((item, i) => (
                        <div key={i} className="cart-item">
                            <span>{item.name}</span>
                            <span>₹{item.price}</span>
                            <span>x{item.qty}</span>
                            <button onClick={() => removeFromCart(item._id)}>🗑️</button>
                        </div>
                    ))}
                    <h3>Total: ₹{total}</h3>
                    <button className="checkout-btn" onClick={onCheckout}>
                        Proceed to Checkout
                    </button>
                </>
            )}
        </div>
    );
}
export default Cart;
