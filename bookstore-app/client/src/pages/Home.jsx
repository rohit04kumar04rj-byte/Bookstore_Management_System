import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* HERO SECTION */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <div className="mb-4 inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            Discover • Read • Manage • Order
          </div>

      <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 lg:text-6xl">
  The Future of Reading Starts with
  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
    {" "}Bookify
  </span>
</h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Browse books, manage your cart, place orders, and enjoy a smooth
            bookstore experience built with a modern full-stack architecture.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/books"
              className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-md transition hover:from-blue-700 hover:to-indigo-700"
            >
              Explore Books
            </Link>

            {!user ? (
              <Link
                to="/register"
                className="rounded-2xl border border-blue-200 bg-white px-6 py-3 text-base font-semibold text-blue-700 transition hover:bg-blue-50"
              >
                Create Account
              </Link>
            ) : (
              <Link
                to="/profile"
                className="rounded-2xl border border-blue-200 bg-white px-6 py-3 text-base font-semibold text-blue-700 transition hover:bg-blue-50"
              >
                Go to Profile
              </Link>
            )}
          </div>

          <div className="mt-10 flex flex-wrap gap-8 text-sm text-gray-600">
            <div>
              <p className="text-2xl font-bold text-gray-900">100+</p>
              <p>Books Available</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">24/7</p>
              <p>Access Anytime</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">Fast</p>
              <p>Order Management</p>
            </div>
          </div>
        </div>

        {/* HERO VISUAL */}
        <div className="relative">
          <div className="absolute inset-0 rounded-[32px] bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 blur-3xl opacity-40" />

          <div className="relative rounded-[32px] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)] ring-1 ring-gray-100">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-gradient-to-br from-blue-50 to-white p-5 ring-1 ring-blue-100">
                <div className="text-4xl">📚</div>
                <h3 className="mt-4 text-xl font-bold text-gray-900">
                  Smart Browsing
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Search, filter, and explore books with a clean browsing
                  experience.
                </p>
              </div>

              <div className="rounded-3xl bg-gradient-to-br from-indigo-50 to-white p-5 ring-1 ring-indigo-100">
                <div className="text-4xl">🛒</div>
                <h3 className="mt-4 text-xl font-bold text-gray-900">
                  Easy Cart
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Add your favorite books to cart and manage quantities easily.
                </p>
              </div>

              <div className="rounded-3xl bg-gradient-to-br from-purple-50 to-white p-5 ring-1 ring-purple-100">
                <div className="text-4xl">📦</div>
                <h3 className="mt-4 text-xl font-bold text-gray-900">
                  Smooth Orders
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Place orders and track them from your personal dashboard.
                </p>
              </div>

              <div className="rounded-3xl bg-gradient-to-br from-pink-50 to-white p-5 ring-1 ring-pink-100">
                <div className="text-4xl">⚙️</div>
                <h3 className="mt-4 text-xl font-bold text-gray-900">
                  Admin Control
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Manage books, update orders, and control inventory with ease.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE SECTION */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-[32px] bg-white p-8 shadow-sm ring-1 ring-gray-100">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Why Choose Our Bookstore?
            </h2>
            <p className="mt-3 text-gray-600">
              Built for readers and administrators with a simple, modern, and
              efficient experience.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl bg-gradient-to-br from-gray-50 to-white p-6 ring-1 ring-gray-100 transition duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="text-4xl">🔎</div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                Powerful Search
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Quickly find books by title, author, or genre.
              </p>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-gray-50 to-white p-6 ring-1 ring-gray-100 transition duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="text-4xl">📱</div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                Responsive Design
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Enjoy a smooth user experience on desktop and mobile devices.
              </p>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-gray-50 to-white p-6 ring-1 ring-gray-100 transition duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="text-4xl">🔐</div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                Secure Login
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Authentication and protected routes keep user data secure.
              </p>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-gray-50 to-white p-6 ring-1 ring-gray-100 transition duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="text-4xl">📊</div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                Admin Dashboard
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Admins can manage inventory, orders, and store operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-[32px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-12 text-center text-white shadow-lg">
          <h2 className="text-3xl font-bold">
            Start exploring your next favorite book today
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-blue-100">
            Browse our collection, manage your account, and enjoy a seamless
            bookstore experience designed for modern users.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/books"
              className="rounded-2xl bg-white px-6 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              Browse Collection
            </Link>

            {!user && (
              <Link
                to="/register"
                className="rounded-2xl border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Join Now
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;