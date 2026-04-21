const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const { connectDBOrExit } = require("./config/db");
const app = require("./app");

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDBOrExit();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
