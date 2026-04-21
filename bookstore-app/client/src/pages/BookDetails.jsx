import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteBook, getBookById } from "../services/bookService";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const { addToCart } = useCart();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const fetchBook = async () => {
    try {
      setLoading(true);
      const data = await getBookById(id);
      setBook(data);
      setImageFailed(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch book");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  const handleDelete = async () => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!shouldDelete) {
      return;
    }

    try {
      await deleteBook(id, token);
      toast.success("Book deleted successfully");
      navigate("/books");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete book");
    }
  };

  const handleAddToCart = () => {
    addToCart(book);
    toast.success(`${book.title} added to cart`);
  };

  const infoCards = book
    ? [
        { label: "Genre", value: book.genre, tone: "from-blue-50 to-white ring-blue-100" },
        { label: "ISBN", value: book.isbn, tone: "from-indigo-50 to-white ring-indigo-100" },
        {
          label: "Stock",
          value: book.stock > 0 ? `${book.stock} available` : "Out of stock",
          tone: "from-emerald-50 to-white ring-emerald-100",
        },
        {
          label: "Reader Match",
          value: "Readers & Collectors",
          tone: "from-amber-50 to-white ring-amber-100",
        },
      ]
    : [];

  if (loading) {
    return (
      <div className="min-h-[90vh] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-6 py-10">
        <div className="mx-auto max-w-6xl animate-pulse overflow-hidden rounded-[32px] bg-white shadow-sm ring-1 ring-gray-100 lg:grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="h-[420px] bg-slate-200" />
          <div className="space-y-5 p-8">
            <div className="h-8 w-28 rounded-full bg-slate-200" />
            <div className="h-12 w-3/4 rounded-2xl bg-slate-200" />
            <div className="h-5 w-1/2 rounded-xl bg-slate-200" />
            <div className="grid gap-4 sm:grid-cols-2">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="h-24 rounded-3xl bg-slate-100" />
              ))}
            </div>
            <div className="h-32 rounded-3xl bg-slate-100" />
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-[90vh] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-6 py-10">
        <div className="mx-auto max-w-3xl rounded-[32px] bg-white p-10 text-center shadow-sm ring-1 ring-gray-100">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 text-4xl">
            📕
          </div>
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900">
            Book not found
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            This title may have been removed or the link may be incorrect. You
            can return to the collection and keep exploring.
          </p>
          <Link
            to="/books"
            className="mt-8 inline-flex rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white transition hover:from-blue-700 hover:to-indigo-700"
          >
            Back to Books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-500">
              <Link to="/" className="transition hover:text-blue-600">
                Home
              </Link>
              <span>/</span>
              <Link to="/books" className="transition hover:text-blue-600">
                Books
              </Link>
              <span>/</span>
              <span className="text-slate-900">{book.title}</span>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Link
                to="/books"
                className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm ring-1 ring-blue-100 transition hover:bg-blue-50"
              >
                Back to Collection
              </Link>
              <div className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                Editor&apos;s Pick
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/70 bg-white/80 px-5 py-4 shadow-sm backdrop-blur ring-1 ring-gray-100">
            <p className="text-sm text-slate-500">Availability</p>
            <p
              className={`mt-1 text-lg font-bold ${
                book.stock > 0 ? "text-emerald-600" : "text-red-500"
              }`}
            >
              {book.stock > 0 ? `${book.stock} in stock` : "Currently unavailable"}
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <div className="overflow-hidden rounded-[36px] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)] ring-1 ring-gray-100">
              <div className="relative min-h-[360px] overflow-hidden bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-100">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.28),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(99,102,241,0.22),_transparent_38%)]" />

                {book.imageUrl && !imageFailed ? (
                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    onError={() => setImageFailed(true)}
                    className="relative h-full w-full object-cover"
                  />
                ) : (
                  <div className="relative flex h-full min-h-[520px] items-center justify-center">
                    <div className="rounded-[32px] bg-white/70 px-10 py-12 text-center shadow-lg backdrop-blur">
                      <div className="text-7xl">📚</div>
                      <p className="mt-4 text-base font-semibold text-slate-600">
                        No cover image available
                      </p>
                    </div>
                  </div>
                )}

                <div className="absolute left-6 top-6 rounded-full bg-white/85 px-4 py-2 text-sm font-bold text-blue-700 shadow-sm backdrop-blur">
                  {book.genre}
                </div>
                <div className="absolute bottom-6 left-6 rounded-2xl bg-slate-900/85 px-5 py-4 text-white shadow-xl backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.25em] text-blue-200">
                    Curated Pick
                  </p>
                  <p className="mt-1 text-lg font-bold">{book.author}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[36px] bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-600">
                Overview
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                {book.title}
              </h1>
              <p className="mt-4 text-lg text-slate-600">
                by <span className="font-semibold text-slate-800">{book.author}</span>
              </p>
              <p className="mt-6 text-base leading-8 text-slate-600">
                {book.description}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {infoCards.map((item) => (
                  <div
                    key={item.label}
                    className={`rounded-[28px] bg-gradient-to-br p-5 ring-1 ${item.tone}`}
                  >
                    <p className="text-sm font-medium text-slate-500">{item.label}</p>
                    <p className="mt-2 text-xl font-bold text-slate-900">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {user?.role === "admin" && (
              <div className="rounded-[30px] bg-slate-50 p-6 ring-1 ring-slate-100">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500">
                      Admin Actions
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      Update this title, change inventory, or remove it from the
                      catalog.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      to={`/admin/edit-book/${book._id}`}
                      className="rounded-2xl bg-white px-5 py-3 font-semibold text-blue-700 shadow-sm ring-1 ring-blue-100 transition hover:bg-blue-50"
                    >
                      Edit Book
                    </Link>
                    <button
                      onClick={handleDelete}
                      className="rounded-2xl bg-red-500 px-5 py-3 font-semibold text-white transition hover:bg-red-600"
                    >
                      Delete Book
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-[36px] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)] ring-1 ring-gray-100">
              <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 px-7 py-8 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-200">
                  Purchase Summary
                </p>
                <p className="mt-3 text-5xl font-black">₹{book.price}</p>
                <p className="mt-2 max-w-sm text-sm leading-6 text-blue-100">
                  A polished addition to your reading list with secure checkout
                  and quick access from your cart.
                </p>
              </div>

              <div className="space-y-6 p-7">
                <div className="grid gap-3">
                  <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                    <span className="text-sm font-medium text-slate-500">Format</span>
                    <span className="font-semibold text-slate-900">Paperback</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                    <span className="text-sm font-medium text-slate-500">Delivery</span>
                    <span className="font-semibold text-emerald-600">Fast dispatch</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                    <span className="text-sm font-medium text-slate-500">Availability</span>
                    <span
                      className={`font-semibold ${
                        book.stock > 0 ? "text-emerald-600" : "text-red-500"
                      }`}
                    >
                      {book.stock > 0 ? "Ready to order" : "Unavailable"}
                    </span>
                  </div>
                </div>

                <div className="rounded-[28px] border border-blue-100 bg-blue-50/60 p-5">
                  <p className="text-sm font-semibold text-blue-800">
                    Why readers choose Bookify
                  </p>
                  <div className="mt-4 space-y-3 text-sm text-slate-600">
                    <p>Curated catalog with smooth ordering and account tracking.</p>
                    <p>Clear inventory visibility before you add anything to cart.</p>
                    <p>Designed for a fast, modern bookstore experience.</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={book.stock === 0}
                    className="rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 px-6 py-3.5 font-semibold text-white shadow-[0_18px_35px_rgba(37,99,235,0.22)] transition duration-300 hover:-translate-y-0.5 hover:from-blue-700 hover:via-indigo-700 hover:to-cyan-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                  >
                    {book.stock === 0 ? "Out of Stock" : "Add to Cart"}
                  </button>

                  <Link
                    to="/books"
                    className="rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-center font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Continue Browsing
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
