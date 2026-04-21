const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Bookstore API is running");
});

app.get("/api", (req, res) => {
  res.json({
    message: "Bookstore API is running",
    availableRoutes: [
      "POST /api/register",
      "POST /api/login",
      "GET /api/me",
      "GET /api/books",
      "GET /api/books/:id",
      "POST /api/books",
      "PUT /api/books/:id",
      "DELETE /api/books/:id",
      "POST /api/orders",
      "GET /api/orders/my-orders",
      "GET /api/orders",
      "PUT /api/orders/:id/status",
    ],
  });
});

app.use("/api", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);

module.exports = app;
