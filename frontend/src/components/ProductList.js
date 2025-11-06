import React from "react";

function ProductList({ products, addToCart }) {
    return (
        <div className="card">
            <h2>Products</h2>
            <div className="product-grid">
                {products.map((p) => (
                    <div key={p.id} className="product">
                        <img
                            src={`https://via.placeholder.com/150?text=${p.name}`}
                            alt={p.name}
                            className="product-img"
                        />
                        <h4>{p.name}</h4>
                        <p>₹{p.price}</p>
                        <button onClick={() => addToCart(p.id)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
