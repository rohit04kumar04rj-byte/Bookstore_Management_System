import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { placeOrder } from "../services/orderService";
import { toast } from "react-toastify";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalItems,
    totalPrice,
    clearCart,
  } = useCart();

  const { token, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (isCheckingOut) {
      return;
    }

    if (!isAuthenticated) {
      toast.error("Please login to place an order");
      navigate("/login");
      return;
    }

    try {
      setIsCheckingOut(true);
      const orderPayload = {
        items: cartItems.map((item) => ({
          book: item._id,
          quantity: item.quantity,
        })),
      };

      await placeOrder(orderPayload, token);
      clearCart();
      toast.success("Order placed successfully");
      navigate("/my-orders");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[80vh] bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 text-center shadow-sm">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 text-4xl">
            🛒
          </div>
          <h1 className="mb-3 text-3xl font-bold text-gray-900">Your cart is empty</h1>
          <p className="mb-8 text-gray-600">
            Looks like you haven’t added any books yet. Start exploring and add
            your favorite books to the cart.
          </p>
          <Link
            to="/books"
            className="inline-block rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Browse Books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="mt-2 text-gray-600">
            Review your selected books and proceed to checkout.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* LEFT SIDE - CART ITEMS */}
          <div className="space-y-5 lg:col-span-2">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col gap-5 rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md md:flex-row"
              >
                <div className="h-40 w-full overflow-hidden rounded-xl bg-gray-100 md:w-32">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {item.title}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      by {item.author}
                    </p>
                    <p className="mt-3 text-lg font-bold text-blue-600">
                      ₹{item.price}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => decreaseQuantity(item._id)}
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-lg font-semibold text-gray-700 hover:bg-gray-100"
                      >
                        -
                      </button>

                      <span className="min-w-[32px] text-center text-base font-medium text-gray-800">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item._id)}
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-lg font-semibold text-gray-700 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <p className="text-base font-semibold text-gray-800">
                        ₹{item.price * item.quantity}
                      </p>

                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE - SUMMARY */}
          <div>
            <div className="sticky top-24 overflow-hidden rounded-[32px] bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)] ring-1 ring-gray-100">
              <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 px-6 py-7 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-200">
                  Checkout
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight">
                  Order Summary
                </h2>
                <p className="mt-2 max-w-sm text-sm leading-6 text-blue-100">
                  Review your cart, confirm your total, and place your order in
                  one smooth step.
                </p>
              </div>

              <div className="space-y-6 p-6">
                <div className="grid gap-3">
                  <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                    <span className="text-slate-500">Items in cart</span>
                    <span className="font-semibold text-slate-900">{totalItems}</span>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                    <span className="text-slate-500">Subtotal</span>
                    <span className="font-semibold text-slate-900">₹{totalPrice}</span>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                    <span className="text-slate-500">Delivery</span>
                    <span className="font-semibold text-emerald-600">Free</span>
                  </div>
                </div>

                <div className="rounded-[28px] border border-blue-100 bg-blue-50/70 p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-slate-900">Total</span>
                    <span className="text-3xl font-black text-blue-700">
                      ₹{totalPrice}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Taxes and shipping details are already simplified for a
                    cleaner checkout experience.
                  </p>
                </div>

                <div className="rounded-[28px] border border-slate-100 bg-slate-50 p-5">
                  <p className="text-sm font-semibold text-slate-800">
                    Why checkout with Bookify
                  </p>
                  <div className="mt-3 space-y-2 text-sm text-slate-600">
                    <p>Fast order placement linked to your account.</p>
                    <p>Clear stock visibility before confirmation.</p>
                    <p>Easy tracking later from your orders page.</p>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 py-3.5 text-base font-semibold text-white shadow-[0_18px_35px_rgba(37,99,235,0.22)] transition duration-300 hover:-translate-y-0.5 hover:from-blue-700 hover:via-indigo-700 hover:to-cyan-600 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {isCheckingOut ? "Placing Order..." : "Proceed to Checkout"}
                </button>

                <Link
                  to="/books"
                  className="block rounded-2xl border border-slate-200 bg-white py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
