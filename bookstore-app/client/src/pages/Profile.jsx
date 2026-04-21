import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function Profile() {
  const { user } = useAuth();
  const { totalItems } = useCart();

  const isAuthenticated = !!user;

  const formatText = (value) => {
    if (!value) return "";
    return value
      .split(" ")
      .map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(" ");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-6 py-12">
        <div className="mx-auto max-w-3xl rounded-[28px] bg-white p-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.08)] ring-1 ring-gray-100">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-4xl shadow-md">
            👤
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            Login to view your profile
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-gray-600">
            Access your account details, track your orders, manage your cart,
            and enjoy a better bookstore experience.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/login"
              className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              Go to Login
            </Link>

            <Link
              to="/register"
              className="rounded-xl border border-blue-600 px-6 py-3 font-medium text-blue-600 transition hover:bg-blue-50"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const displayName = formatText(user.name);
  const displayRole = formatText(user.role);
  const roleLabel = user.role === "admin" ? "Administrator" : "Customer";

  const initials =
    user?.name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            My Profile
          </h1>
          <p className="mt-2 text-base text-gray-600">
            Welcome back. Here is your account overview and quick access to the
            important sections of your bookstore account.
          </p>
        </div>

        <div className="grid gap-8 xl:grid-cols-12">
          {/* LEFT PROFILE CARD */}
          <div className="xl:col-span-4">
            <div className="rounded-[30px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] ring-1 ring-gray-100">
              <div className="rounded-t-[30px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-6">
                <div className="flex items-start justify-between">
                  <div />
                  <span className="rounded-full bg-white/20 px-4 py-2 text-xs font-semibold tracking-wide text-white backdrop-blur">
                    {roleLabel}
                  </span>
                </div>

                {/* FIXED AVATAR AREA */}
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-white shadow-lg">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 text-3xl font-bold text-blue-700">
                      {initials}
                    </div>
                  </div>

                  <div className="min-w-0">
                    <h2 className="truncate text-2xl font-bold text-white">
                      {displayName}
                    </h2>
                    <p className="mt-1 truncate text-sm text-blue-100">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-4 ring-1 ring-blue-100 transition duration-300 hover:shadow-md">
                    <p className="text-xs font-medium uppercase tracking-wide text-blue-600">
                      Role
                    </p>
                    <p className="mt-2 text-lg font-bold text-gray-900">
                      {displayRole}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-4 ring-1 ring-purple-100 transition duration-300 hover:shadow-md">
                    <p className="text-xs font-medium uppercase tracking-wide text-purple-600">
                      Cart Items
                    </p>
                    <p className="mt-2 text-lg font-bold text-gray-900">
                      {totalItems === 0 ? "Empty" : totalItems}
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">Profile Access</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-green-500" />
                    <span className="font-semibold text-green-600">
                      Verified Account
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Link
                    to="/my-orders"
                    className="block w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-center font-semibold text-white transition duration-300 hover:from-blue-700 hover:to-indigo-700"
                  >
                    View My Orders
                  </Link>

                  <Link
                    to="/cart"
                    className="block w-full rounded-xl border border-gray-200 px-5 py-3 text-center font-semibold text-gray-700 transition hover:bg-gray-50"
                  >
                    Open Cart
                  </Link>

                  <Link
                    to="/books"
                    className="block w-full rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 text-center font-semibold text-blue-700 transition hover:bg-blue-100"
                  >
                    Browse Books
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6 xl:col-span-8">
            {/* TOP STATS */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-gray-100 transition duration-300 hover:-translate-y-1 hover:shadow-md">
                <p className="text-sm text-gray-500">Profile Type</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {displayRole}
                </p>
              </div>

              <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-gray-100 transition duration-300 hover:-translate-y-1 hover:shadow-md">
                <p className="text-sm text-gray-500">Cart Count</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {totalItems}
                </p>
              </div>

              <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-gray-100 transition duration-300 hover:-translate-y-1 hover:shadow-md">
                <p className="text-sm text-gray-500">Access Level</p>
                <p className="mt-2 text-2xl font-bold text-blue-600">
                  {user.role === "admin" ? "Full" : "Standard"}
                </p>
              </div>

              <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-gray-100 transition duration-300 hover:-translate-y-1 hover:shadow-md">
                <p className="text-sm text-gray-500">Account Status</p>
                <p className="mt-2 text-2xl font-bold text-green-600">
                  Active
                </p>
              </div>
            </div>

            {/* PERSONAL INFO */}
            <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Personal Information
                  </h3>
                  <p className="mt-1 text-gray-600">
                    Your current account details saved in the system.
                  </p>
                </div>

                <div className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                  Verified Account
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-5 transition duration-300 hover:shadow-md">
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="mt-2 text-lg font-semibold text-gray-900">
                    {displayName}
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-5 transition duration-300 hover:shadow-md">
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="mt-2 break-all text-lg font-semibold text-gray-900">
                    {user.email}
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-5 transition duration-300 hover:shadow-md">
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="mt-2 text-lg font-semibold text-gray-900">
                    {displayRole}
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-5 transition duration-300 hover:shadow-md">
                  <p className="text-sm text-gray-500">Membership</p>
                  <p className="mt-2 text-lg font-semibold text-gray-900">
                    Standard Plan
                  </p>
                </div>
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <h3 className="text-2xl font-bold text-gray-900">Quick Actions</h3>
              <p className="mt-1 text-gray-600">
                Move quickly to the sections you are most likely to use.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <Link
                  to="/books"
                  className="group flex flex-col gap-2 rounded-3xl border border-gray-100 bg-gradient-to-br from-blue-50 to-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="text-4xl">📚</div>
                  <h4 className="text-xl font-semibold text-gray-900 group-hover:text-blue-700">
                    Explore Books
                  </h4>
                  <p className="text-sm text-gray-600">
                    Discover new arrivals, trending titles, and your next read.
                  </p>
                </Link>

                <Link
                  to="/my-orders"
                  className="group flex flex-col gap-2 rounded-3xl border border-gray-100 bg-gradient-to-br from-indigo-50 to-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="text-4xl">📦</div>
                  <h4 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-700">
                    Order History
                  </h4>
                  <p className="text-sm text-gray-600">
                    Track placed orders and monitor their current status.
                  </p>
                </Link>

                <Link
                  to="/cart"
                  className="group flex flex-col gap-2 rounded-3xl border border-gray-100 bg-gradient-to-br from-purple-50 to-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="text-4xl">🛒</div>
                  <h4 className="text-xl font-semibold text-gray-900 group-hover:text-purple-700">
                    My Cart
                  </h4>
                  <p className="text-sm text-gray-600">
                    Review selected books and continue to checkout.
                  </p>
                </Link>

                {user.role === "admin" ? (
                  <Link
                    to="/admin/orders"
                    className="group flex flex-col gap-2 rounded-3xl border border-gray-100 bg-gradient-to-br from-emerald-50 to-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="text-4xl">⚙️</div>
                    <h4 className="text-xl font-semibold text-gray-900 group-hover:text-emerald-700">
                      Admin Controls
                    </h4>
                    <p className="text-sm text-gray-600">
                      Manage orders, monitor operations, and control the store.
                    </p>
                  </Link>
                ) : (
                  <Link
                    to="/books"
                    className="group flex flex-col gap-2 rounded-3xl border border-dashed border-gray-200 bg-gradient-to-br from-pink-50 to-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="text-4xl">✨</div>
                    <h4 className="text-xl font-semibold text-gray-900 transition-colors duration-300 group-hover:text-pink-700">
                      Keep Exploring
                    </h4>
                    <p className="text-sm text-gray-600">
                      Discover more books and build your next order.
                    </p>
                  </Link>
                )}
              </div>
            </div>

            {/* ACCOUNT INSIGHTS */}
            <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <h3 className="text-2xl font-bold text-gray-900">Account Insights</h3>
              <p className="mt-1 text-gray-600">
                A quick glance at your bookstore activity.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-gray-50 p-5 ring-1 ring-gray-100">
                  <p className="text-sm text-gray-500">Books in Cart</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">
                    {totalItems}
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-5 ring-1 ring-gray-100">
                  <p className="text-sm text-gray-500">Current Role</p>
                  <p className="mt-2 text-3xl font-bold text-blue-600">
                    {user.role === "admin" ? "Admin" : "User"}
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-5 ring-1 ring-gray-100">
                  <p className="text-sm text-gray-500">Profile Status</p>
                  <p className="mt-2 text-3xl font-bold text-green-600">
                    Ready
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
