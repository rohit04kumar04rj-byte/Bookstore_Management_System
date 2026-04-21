const { connectDB } = require("../bookstore-app/server/config/db");
const app = require("../bookstore-app/server/app");

module.exports = async (req, res) => {
  try {
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error("Failed to initialize API:", error.message);
    return res.status(500).json({ message: "Server configuration error" });
  }
};
