const Order = require("../models/Order");
const Book = require("../models/Book");

// Place order
const createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    let totalPrice = 0;
    const orderItems = [];

    for (const item of items) {
      const book = await Book.findById(item.book);

      if (!book) {
        return res.status(404).json({ message: `Book not found: ${item.book}` });
      }

      if (book.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${book.title}`,
        });
      }

      orderItems.push({
        book: book._id,
        title: book.title,
        price: book.price,
        quantity: item.quantity,
      });

      totalPrice += book.price * item.quantity;

      book.stock -= item.quantity;
      await book.save();
    }

    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      totalPrice,
    });

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get current user's orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (status) {
      order.status = status;
    }

    if (paymentStatus) {
      order.paymentStatus = paymentStatus;
    }

    await order.save();

    res.status(200).json({
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
};