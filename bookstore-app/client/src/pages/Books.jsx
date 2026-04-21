import { useEffect, useState } from "react";
import { getBooks } from "../services/bookService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Books() {
  const [books, setBooks] = useState([]);
  const [brokenImages, setBrokenImages] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchBooks = async () => {
    try {
      setLoading(true);

      const data = await getBooks({
        search,
        genre,
        page,
        limit,
      });

      setBooks(data.books || []);
      setTotalPages(data.totalPages || 1);
      setPage(data.currentPage || 1);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch books from Bookify");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [search, genre, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput.trim());
    setPage(1);
  };

  const handleResetFilters = () => {
    setSearchInput("");
    setSearch("");
    setGenre("");
    setPage(1);
  };

  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              Bookify Collection
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              Explore Books
            </h1>

            <p className="mt-2 max-w-2xl text-gray-600">
              Discover your next favorite read from the Bookify collection.
              Search by title, author, or genre and enjoy a clean, modern
              bookstore browsing experience.
            </p>
          </div>

          <div className="rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 ring-gray-100">
            <p className="text-sm text-gray-500">Showing Now</p>
            <p className="mt-1 text-xl font-bold text-gray-900">
              {loading ? "..." : books.length} books
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Page {page} of {totalPages}
            </p>
          </div>
        </div>

        {/* SEARCH + FILTER */}
        <form
          onSubmit={handleSearch}
          className="mb-10 rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-gray-100"
        >
          <div className="grid gap-4 md:grid-cols-12">
            <div className="md:col-span-5">
              <label className="mb-2 block text-sm font-medium text-gray-600">
                Search Books
              </label>
              <input
                type="text"
                placeholder="Search by title, author, or genre"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="md:col-span-3">
              <label className="mb-2 block text-sm font-medium text-gray-600">
                Filter by Genre
              </label>
              <select
                value={genre}
                onChange={(e) => {
                  setGenre(e.target.value);
                  setPage(1);
                }}
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
              >
                <option value="">All Genres</option>
                <option value="Fiction">Fiction</option>
                <option value="Self Help">Self Help</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="Romance">Romance</option>
                <option value="Biography">Biography</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-600">
                Actions
              </label>
              <button
                type="button"
                onClick={handleResetFilters}
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Reset Filters
              </button>
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="mt-7 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 font-semibold text-white transition duration-300 hover:from-blue-700 hover:to-indigo-700"
              >
                Search
              </button>
            </div>
          </div>
        </form>

        {/* LOADING */}
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-gray-100"
              >
                <div className="h-64 animate-pulse bg-gray-200" />
                <div className="space-y-3 p-5">
                  <div className="h-6 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 animate-pulse rounded bg-gray-200" />
                  <div className="h-10 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        ) : books.length === 0 ? (
          /* EMPTY STATE */
          <div className="rounded-[28px] bg-white p-12 text-center shadow-sm ring-1 ring-gray-100">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 text-4xl">
              📚
            </div>

            <h2 className="text-3xl font-bold text-gray-900">
              No books found
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-gray-600">
              We couldn’t find any books matching your search or filter on
              Bookify. Try a different keyword or reset the filters.
            </p>

            <button
              onClick={handleResetFilters}
              className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            {/* BOOK GRID */}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {books.map((book) => (
                <div
                  key={book._id}
                  className="group overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-gray-100 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-64 overflow-hidden bg-gray-100">
                    {book.imageUrl && !brokenImages[book._id] ? (
                      <img
                        src={book.imageUrl}
                        alt={book.title}
                        onError={() =>
                          setBrokenImages((prev) => ({
                            ...prev,
                            [book._id]: true,
                          }))
                        }
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-center text-gray-400">
                        <div>
                          <div className="text-5xl">📖</div>
                          <p className="mt-2 text-sm">No image available</p>
                        </div>
                      </div>
                    )}

                    <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-blue-700 shadow-sm backdrop-blur">
                      {book.genre}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <h3 className="line-clamp-2 text-xl font-bold text-gray-900">
                        {book.title}
                      </h3>

                      <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-700">
                        ₹{book.price}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500">
                      by{" "}
                      <span className="font-medium text-gray-700">
                        {book.author}
                      </span>
                    </p>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                      {book.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Stock</p>
                        <p
                          className={`text-sm font-semibold ${
                            book.stock > 0 ? "text-green-600" : "text-red-500"
                          }`}
                        >
                          {book.stock > 0
                            ? `${book.stock} available`
                            : "Out of stock"}
                        </p>
                      </div>

                      <Link
                        to={`/books/${book._id}`}
                        className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white transition duration-300 hover:from-blue-700 hover:to-indigo-700"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* PAGINATION */}
            <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-gray-100 sm:flex-row">
              <p className="text-sm text-gray-600">
                Showing page <span className="font-semibold">{page}</span> of{" "}
                <span className="font-semibold">{totalPages}</span>
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPage((prev) => prev - 1)}
                  disabled={page === 1}
                  className="rounded-xl border border-gray-200 px-5 py-2 font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>

                <div className="rounded-xl bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                  {page}
                </div>

                <button
                  type="button"
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={page >= totalPages}
                  className="rounded-xl border border-gray-200 px-5 py-2 font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Books;
