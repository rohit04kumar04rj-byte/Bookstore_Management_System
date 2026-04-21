const Book = require("../models/Book");
const mongoose = require("mongoose");

const escapeRegex = (value = "") =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getBooks = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 5, genre = "" } = req.query;
    const pageNumber = Math.max(1, Number(page) || 1);
    const limitNumber = Math.max(1, Number(limit) || 5);
    const safeSearch = escapeRegex(search.trim());
    const safeGenre = escapeRegex(genre.trim());

    const query = {
      $and: [
        safeGenre ? { genre: new RegExp(safeGenre, "i") } : {},
        {
          $or: [
            { title: new RegExp(safeSearch, "i") },
            { author: new RegExp(safeSearch, "i") },
            { genre: new RegExp(safeSearch, "i") },
          ],
        },
      ],
    };

    const total = await Book.countDocuments(query);
    const totalPages = Math.max(1, Math.ceil(total / limitNumber));
    const safePageNumber = Math.min(pageNumber, totalPages);

    const books = await Book.find(query)
      .sort({ createdAt: -1, _id: -1 })
      .skip((safePageNumber - 1) * limitNumber)
      .limit(limitNumber);

    return res.status(200).json({
      books,
      total,
      currentPage: safePageNumber,
      totalPages,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getBookById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid book id" });
    }

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);

    return res.status(201).json({
      message: "Book created successfully",
      book,
    });
  } catch (error) {
    if (error.name === "ValidationError" || error.code === 11000) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid book id" });
    }

    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({
      message: "Book updated successfully",
      book,
    });
  } catch (error) {
    if (error.name === "ValidationError" || error.code === 11000) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid book id" });
    }

    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
