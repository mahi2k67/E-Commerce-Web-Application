const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const products = [
  {
    id: 1,
    name: "Laptop",
    price: 50000,
    image: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    name: "Phone",
    price: 20000,
    image: "https://via.placeholder.com/150"
  }
];

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});