import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { createBook } from "../services/bookService";

function AddBook() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    genre: "",
    stock: "",
    isbn: "",
    description: "",
    imageUrl: "",
  });

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
      };

      await createBook(payload, token);
      toast.success("Book added successfully");
      navigate("/books");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add book");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Add Book</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Book title" value={formData.title} onChange={handleChange} />
        <br />
        <br />
        <input type="text" name="author" placeholder="Author name" value={formData.author} onChange={handleChange} />
        <br />
        <br />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} />
        <br />
        <br />
        <input type="text" name="genre" placeholder="Genre" value={formData.genre} onChange={handleChange} />
        <br />
        <br />
        <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} />
        <br />
        <br />
        <input type="text" name="isbn" placeholder="ISBN" value={formData.isbn} onChange={handleChange} />
        <br />
        <br />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          cols="40"
        />
        <br />
        <br />
        <input type="text" name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} />
        <br />
        <br />

        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;
