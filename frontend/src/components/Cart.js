function Cart({ cart, total, removeFromCart }) {
    return (
        <div style={{ marginTop: 20 }}>
            <h2>Cart</h2>
            {cart.length === 0 ? (
                <p>Empty</p>
            ) : (
                cart.map((item, i) => (
                    <div key={i}>
                        {item.name} x {item.qty} – ₹{item.price * item.qty}
                        <button onClick={() => removeFromCart(item._id)} style={{ marginLeft: 10 }}>
                            Remove
                        </button>
                    </div>
                ))
            )}
            <h3>Total: ₹{total}</h3>
        </div>
    );
}
export default Cart;
