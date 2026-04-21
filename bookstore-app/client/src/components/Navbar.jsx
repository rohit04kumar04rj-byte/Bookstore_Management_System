import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/books", label: "Books" },
];

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { totalItems } = useCart();
  const location = useLocation();
  const showCartButton = location.pathname !== "/login";

  const linkClassName = ({ isActive }) =>
    [
      "rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300",
      isActive
        ? "bg-white text-slate-900 shadow-md ring-1 ring-white/70"
        : "text-slate-600 hover:bg-white/70 hover:text-slate-900",
    ].join(" ");

  return (
    <header className="sticky top-0 z-50 border-b border-white/50 bg-white/80 backdrop-blur-xl">
      <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.16),_transparent_38%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.16),_transparent_32%)]" />

      <nav className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link to="/" className="group flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-cyan-500 to-indigo-600 text-lg font-black text-white shadow-[0_14px_30px_rgba(37,99,235,0.28)] transition-transform duration-300 group-hover:-translate-y-0.5">
            BK
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-blue-600">
              Bookstore
            </p>
            <p className="text-lg font-extrabold tracking-tight text-slate-900">
              Chapter Haven
            </p>
          </div>
        </Link>

        <div className="order-3 flex w-full flex-wrap items-center justify-center gap-2 rounded-[28px] bg-slate-100/80 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] ring-1 ring-slate-200/80 lg:order-2 lg:w-auto">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClassName}>
              {item.label}
            </NavLink>
          ))}

          {isAuthenticated && (
            <>
              <NavLink to="/profile" className={linkClassName}>
                Profile
              </NavLink>
              <NavLink to="/my-orders" className={linkClassName}>
                My Orders
              </NavLink>
            </>
          )}

          {user?.role === "admin" && (
            <>
              <NavLink to="/admin/add-book" className={linkClassName}>
                Add Book
              </NavLink>
              <NavLink to="/admin/orders" className={linkClassName}>
                Manage Orders
              </NavLink>
            </>
          )}
        </div>

        <div className="order-2 flex flex-wrap items-center justify-end gap-3 lg:order-3">
          {showCartButton && (
            <Link
              to="/cart"
              className="group flex items-center gap-3 rounded-full border border-blue-100 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-base text-white shadow-md">
                Cart
              </span>
              <span className="hidden sm:inline">Your Cart</span>
              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700 ring-1 ring-blue-100">
                {totalItems} item{totalItems === 1 ? "" : "s"}
              </span>
            </Link>
          )}

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-slate-300 hover:bg-slate-50"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(37,99,235,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(37,99,235,0.34)]"
              >
                Create Account
              </Link>
            </>
          ) : (
            <>
              <div className="hidden rounded-full border border-emerald-100 bg-emerald-50/80 px-4 py-2 text-sm font-medium text-emerald-700 md:block">
                Welcome, <span className="font-bold">{user?.name}</span>
              </div>
              <button
                onClick={logout}
                className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(15,23,42,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
