import { useState } from "react";
import { loginUser } from "../services/authServices";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(formData);
      login(data.user, data.token);
      toast.success("Welcome back to Bookify");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-6 py-10">
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-cyan-300/30 blur-3xl" />
      <div className="absolute -right-12 bottom-0 h-80 w-80 rounded-full bg-indigo-300/30 blur-3xl" />

      <div className="relative grid w-full max-w-6xl overflow-hidden rounded-[32px] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.12)] ring-1 ring-slate-100 lg:grid-cols-2">
        <div className="hidden flex-col justify-between bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-700 p-10 text-white lg:flex">
          <div>
            <div className="inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
              Welcome Back
            </div>
            <h1 className="mt-6 text-4xl font-black tracking-tight">
              Login to your Bookify account
            </h1>
            <p className="mt-4 max-w-md text-base leading-7 text-blue-100">
              Continue your reading journey, manage orders, and keep your
              favorite books close in one beautiful dashboard.
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur">
              <p className="text-sm font-semibold text-white">Personalized library</p>
              <p className="mt-2 text-sm leading-6 text-blue-100">
                Track purchases, revisit saved books, and enjoy a smoother
                shopping experience every time you sign in.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                <p className="text-2xl font-black">100+</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-blue-100">
                  Titles
                </p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                <p className="text-2xl font-black">24/7</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-blue-100">
                  Access
                </p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                <p className="text-2xl font-black">Fast</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-blue-100">
                  Orders
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center bg-white p-6 sm:p-10">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-lg font-black text-white shadow-lg shadow-blue-200">
                BK
              </div>
              <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-900">
                Sign in
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Access your Bookify account and continue browsing your next
                favorite read.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-semibold text-slate-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-500">
                  <input type="checkbox" className="rounded border-slate-300" />
                  Remember me
                </label>
                <button
                  type="button"
                  className="font-semibold text-blue-600 transition hover:text-blue-700"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 py-3.5 text-base font-bold text-white shadow-[0_18px_35px_rgba(37,99,235,0.24)] transition duration-300 hover:-translate-y-0.5 hover:from-blue-700 hover:via-indigo-700 hover:to-cyan-600"
              >
                Login to Bookify
              </button>
            </form>

            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                New Here
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-100">
              <p className="text-sm text-slate-600">
                Don&apos;t have an account yet?
              </p>
              <Link
                to="/register"
                className="mt-3 inline-flex rounded-2xl border border-blue-200 bg-white px-5 py-2.5 font-semibold text-blue-700 transition hover:bg-blue-50"
              >
                Create your Bookify account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
