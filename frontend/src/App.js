import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [category, setCategory] = useState('');
  const [n, setN] = useState(''); // Number of products to fetch
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  const categories = [
    "Phone", "Computer", "TV", "Earphone", "Tablet", "Charger",
    "Mouse", "Keypad", "Bluetooth", "Pendrive", "Remote",
    "Speaker", "Headset", "Laptop", "PC"
  ];

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/category/${category}/products`, {
        params: {
          n: n, 
        },
      });
      setProducts(response.data);
      setError('');
    } catch (e) {
      setError('An error occurred while fetching products');
      setProducts([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (category) {
      fetchProducts();
    } else {
      setError('Please select a category');
    }
  };

  return (
    <div className="App">
      <h1>E-commerce Product Fetcher</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Category: </label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">--Select Category--</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Quantity</label>
          <input
            type="number"
            value={n}
            onChange={(e) => setN(e.target.value)}
          /><br/>
           <label>Rating</label>
          <input
            type="number"
            value={n}
            onChange={(e) => setN(e.target.value)}
          />
        </div>
        <button type="submit">Fetch Products</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <h2>Products</h2>
        {products.length > 0 ? (
          <ul>
            {products.map((product, index) => (
              <li key={index}>
                <strong>{product.name}</strong> - Rating: {product.rating} - Price: ${product.price}
              </li>
            ))}
          </ul>
        ) : (
          <p>products avaiable</p>
        )}
      </div>
    </div>
  );
}

export default App;