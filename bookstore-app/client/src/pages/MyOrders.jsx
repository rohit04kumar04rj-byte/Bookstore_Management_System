import { useEffect, useState } from "react";
import { getMyOrders } from "../services/orderService";
import { toast } from "react-toastify";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getMyOrders();
      setOrders(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch orders", {
        toastId: "my-orders-fetch-error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900">
            My Orders
          </h1>
          <p className="mt-2 text-gray-600">
            Track your orders, check status, and manage your purchases.
          </p>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-3xl bg-white p-6 shadow-sm"
              >
                <div className="mb-4 h-6 w-1/3 rounded bg-gray-200" />
                <div className="h-4 w-1/2 rounded bg-gray-200" />
                <div className="mt-4 h-20 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          /* EMPTY STATE */
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
            <div className="text-5xl">📦</div>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              No Orders Yet
            </h2>
            <p className="mt-2 text-gray-600">
              You haven't placed any orders yet. Start exploring books!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition hover:shadow-lg"
              >
                {/* TOP ROW */}
                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-semibold text-gray-900">
                      #{order._id.slice(-6)}
                    </p>
                  </div>

                  <div
                    className={`rounded-full px-4 py-1 text-sm font-semibold ${getStatusStyle(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </div>
                </div>

                {/* BOOKS */}
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-2xl bg-gray-50 p-4"
                    >
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {item.book.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <p className="font-semibold text-blue-600">
                        ₹{item.book.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                {/* BOTTOM */}
                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-gray-500">
                    Placed on{" "}
                    <span className="font-medium text-gray-700">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </p>

                  <p className="text-lg font-bold text-gray-900">
                    Total: ₹{order.totalAmount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrders;
