import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data));
  }, []);

  const loginAsUser = () => {
    setLoggedIn(true);
    setRole("user");
  };

  const loginAsAdmin = () => {
    setLoggedIn(true);
    setRole("admin");
  };

  const logout = () => {
    setLoggedIn(false);
    setRole("");
    setCart([]);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeProduct = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
  };

  const placeOrder = () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const newOrder = {
      id: Date.now(),
      items: cart,
      status: "Pending"
    };

    setOrders([...orders, newOrder]);
    setCart([]);
    alert("Order placed successfully!");
  };

  if (!loggedIn) {
    return (
      <div className="container">
        <h1>🛒 Welcome to E-Commerce Store</h1>
        <p>Select your role to continue</p>

        <button onClick={loginAsUser}>Login as User</button>
        <br /><br />
        <button onClick={loginAsAdmin}>Login as Admin</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>🛒 E-Commerce Store</h1>
      <p>Shop smart, track orders easily</p>

      <p>Logged in as: <b>{role}</b></p>
      <button onClick={logout}>Logout</button>

      {role === "user" && (
        <>
          <h2>Products</h2>
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

          <h2>Your Cart ({cart.length})</h2>

          <div className="products">
            {cart.map((item, index) => (
              <div className="card" key={index}>
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
              </div>
            ))}
          </div>

          <p>
            <b>Total: ₹
            {cart.reduce((sum, item) => sum + item.price, 0)}
            </b>
          </p>

          <button onClick={placeOrder}>Place Order</button>

          <h2>Order Tracking</h2>
          {orders.map((order) => (
            <div className="card" key={order.id}>
              <p>Order ID: {order.id}</p>
              <p>
                Status: <span className="status">{order.status}</span>
              </p>
              <p>Items: {order.items.length}</p>
            </div>
          ))}
        </>
      )}

      {role === "admin" && (
        <>
          <h2>⚙️ Admin Dashboard</h2>

          <div className="products">
            {products.map((product) => (
              <div className="card" key={product.id}>
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>₹{product.price}</p>

                <button onClick={() => removeProduct(product.id)}>
                  Delete Product
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;