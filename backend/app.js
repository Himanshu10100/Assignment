const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

//env file
dotenv.config({ path: "./config/.env" });

//middleware
app.use(express.json());
app.use(
  cors({
    credentials: true,
    withCredentials: true,
    origin: "http://localhost:5173",
  })
);

//routes
const productRoute = require("./routes/productRoute");
app.use("/api/v1", productRoute);

module.exports = app;
