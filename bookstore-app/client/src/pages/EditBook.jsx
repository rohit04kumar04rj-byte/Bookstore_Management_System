import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { getBookById, updateBook } from "../services/bookService";

function EditBook() {
  const { id } = useParams();
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const data = await getBookById(id);
        setFormData({
          title: data.title || "",
          author: data.author || "",
          price: data.price || "",
          genre: data.genre || "",
          stock: data.stock || "",
          isbn: data.isbn || "",
          description: data.description || "",
          imageUrl: data.imageUrl || "",
        });
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load book");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

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

      await updateBook(id, payload, token);
      toast.success("Book updated successfully");
      navigate(`/books/${id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update book");
    }
  };

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading book...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Edit Book</h1>

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

        <button type="submit">Update Book</button>
      </form>
    </div>
  );
}

export default EditBook;
