function ProductList({ products, addToCart }) {
    return (
        <div>
            <h2>Products</h2>
            {products.map(p => (
                <div key={p.id} style={{ margin: "8px 0" }}>
                    {p.name} – ₹{p.price}
                    <button onClick={() => addToCart(p.id)} style={{ marginLeft: 10 }}>
                        Add
                    </button>
                </div>
            ))}
        </div>
    );
}
export default ProductList;
