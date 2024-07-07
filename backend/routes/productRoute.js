const express = require("express");
const {
  addProducts,
  getProducts,
  getStatistics,
  getBarcharts,
} = require("../controllers/productController");
const app = express();

app.post("/products/new", addProducts);
app.get("/product", getProducts);
app.get("/statistics", getStatistics);
app.get("/barchart", getBarcharts);

module.exports = app;
