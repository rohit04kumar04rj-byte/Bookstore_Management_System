import { useState } from "react";
import { registerUser } from "../services/authServices";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(formData);
      toast.success("Account created successfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Registration failed");
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-6 py-10">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[32px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] lg:grid-cols-2">

        {/* LEFT SIDE - BRAND */}
        <div className="hidden flex-col justify-between bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-10 text-white lg:flex">
          <div className="text-left">
            <h1 className="text-3xl font-bold">📚 Bookify</h1>
          </div>

          <div className="my-auto">
            <h2 className="text-2xl font-semibold">
              Join Bookify today 🚀
            </h2>
            <p className="mt-3 text-blue-100">
              Create your account and start exploring thousands of books,
              managing your cart, and placing orders seamlessly.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="p-8 sm:p-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Create your Bookify account
          </h2>

          <p className="mt-2 text-gray-600">
            Sign up and start your reading journey today.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* NAME */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-base font-semibold text-white transition duration-300 hover:from-blue-700 hover:to-indigo-700"
            >
              Create Account
            </button>
          </form>

          {/* FOOTER */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
