import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data));
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  const handleCheckout = () => {
    if (!name || !address) {
      alert("Please fill all details");
      return;
    }

    alert("Order placed successfully!");
    setCart([]);
    setName("");
    setAddress("");
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container">
      <h1>E-Commerce Store</h1>

      <h2>Cart Items: {cart.length}</h2>

      <div className="products">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            <button onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <h2>Your Cart</h2>
      <div className="products">
        {cart.map((item, index) => (
          <div className="card" key={index}>
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
            <button onClick={() => removeFromCart(index)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <h2>Checkout</h2>
      <p>Total: ₹{total}</p>

      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <input
        type="text"
        placeholder="Your Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <br /><br />

      <button onClick={handleCheckout}>
        Place Order
      </button>
    </div>
  );
}

export default App;