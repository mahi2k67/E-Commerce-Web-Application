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
    price: 150000,
    image: "https://bermorzone.com.ph/wp-content/uploads/2022/01/c22-calhoun-main-image-original-021.webp"
  },
  {
    id: 2,
    name: "Phone",
    price: 124999,
    image: "https://image.gsm.mobi/uploads/big/23/11/Google-Pixel-9-Pro-Rose-Quartz.webp"
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