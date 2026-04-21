import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../services/orderService";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

function AdminOrders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders(token);
      setOrders(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch orders", {
        toastId: "admin-orders-fetch-error",
      });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdate = async (id, status) => {
    try {
      await updateOrderStatus(id, { status }, token);
      toast.success("Order updated");
      fetchOrders();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update order");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "20px",
              borderRadius: "8px",
            }}
          >
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>User:</strong> {order.user?.name} ({order.user?.email})</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Payment:</strong> {order.paymentStatus}</p>
            <p><strong>Total:</strong> ₹{order.totalPrice}</p>

            <h4>Items:</h4>
            {order.items.map((item, index) => (
              <p key={index}>
                {item.title} — ₹{item.price} × {item.quantity}
              </p>
            ))}

            <div style={{ marginTop: "10px" }}>
              <button onClick={() => handleUpdate(order._id, "processing")}>
                Mark Processing
              </button>

              <button onClick={() => handleUpdate(order._id, "shipped")}>
                Mark Shipped
              </button>

              <button onClick={() => handleUpdate(order._id, "delivered")}>
                Mark Delivered
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminOrders;
