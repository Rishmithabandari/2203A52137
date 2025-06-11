import React, { useEffect, useState } from "react";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        const topN = data
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 2)  // 👈 Change 2 to any number (like 3 or 5)
 // Change 2 to show Top N products
        setProducts(topN);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div>
      {products.length === 0 ? (
        <p>Loading products...</p>
      ) : (
        <ul>
          {products.map((p) => (
            <li key={p.id} style={{ marginBottom: "10px" }}>
              <strong>{p.name}</strong> - ₹{p.price} - Rating: {p.rating}
              <br />
              <span style={{ color: p.availability ? "green" : "red" }}>
                {p.availability ? "In Stock" : "Out of Stock"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductList;
