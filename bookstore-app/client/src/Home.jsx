import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <div className="mb-4 inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            Welcome to Bookify
          </div>

          <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 lg:text-6xl">
            Discover Books with
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Bookify
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Bookify is your full stack online bookstore platform where readers
            can explore books, manage carts, place orders, and enjoy a smooth
            digital reading marketplace experience.
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
                Join Bookify
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
              <p>Books on Bookify</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">24/7</p>
              <p>Online Access</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">Fast</p>
              <p>Orders & Delivery Flow</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-[32px] bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 blur-3xl opacity-40" />

          <div className="relative rounded-[32px] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)] ring-1 ring-gray-100">
            <div className="mb-5 text-center">
              <h2 className="text-2xl font-bold text-gray-900">Why Bookify?</h2>
              <p className="mt-2 text-sm text-gray-600">
                A modern bookstore platform for readers and admins.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-gradient-to-br from-blue-50 to-white p-5 ring-1 ring-blue-100">
                <div className="text-4xl">📚</div>
                <h3 className="mt-4 text-xl font-bold text-gray-900">
                  Smart Browsing
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Search, filter, and explore books in a clean interface.
                </p>
              </div>

              <div className="rounded-3xl bg-gradient-to-br from-indigo-50 to-white p-5 ring-1 ring-indigo-100">
                <div className="text-4xl">🛒</div>
                <h3 className="mt-4 text-xl font-bold text-gray-900">
                  Easy Cart
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Add books, manage quantities, and checkout smoothly.
                </p>
              </div>

              <div className="rounded-3xl bg-gradient-to-br from-purple-50 to-white p-5 ring-1 ring-purple-100">
                <div className="text-4xl">📦</div>
                <h3 className="mt-4 text-xl font-bold text-gray-900">
                  Order Tracking
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Place orders and monitor them from your dashboard.
                </p>
              </div>

              <div className="rounded-3xl bg-gradient-to-br from-pink-50 to-white p-5 ring-1 ring-pink-100">
                <div className="text-4xl">⚙️</div>
                <h3 className="mt-4 text-xl font-bold text-gray-900">
                  Admin Control
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Manage books, stock, and orders through Bookify admin tools.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;