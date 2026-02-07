"use client";

import Skeleton from "@/components/ui/Skeleton";
import { useToast } from "@/components/ui/ToastProvider";
import { useCurrentUser } from "@/lib/useCurrentUser";
import axios from "axios";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const { user } = useCurrentUser();
  const { showToast } = useToast();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/orders")
      .then((res) => setOrders(res.data))
      .catch(() => showToast("Failed to load orders", "error"))
      .finally(() => setLoading(false));
  }, [showToast]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
      <h2 className="mb-1 text-xl font-semibold">Orders</h2>
      <p className="mb-4 text-xs text-slate-500">
        {user?.role === "USER" ? "Showing your own orders only" : "Showing all recent orders"}
      </p>
      {loading ? (
        <Skeleton className="h-56 w-full" />
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500">
              <th>Order ID</th>
              <th>User</th>
              <th>Status</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item) => (
              <tr key={item.id} className="border-t border-slate-100">
                <td className="py-2">{item.id.slice(0, 8)}</td>
                <td>{item.user?.name || "-"}</td>
                <td>{item.status}</td>
                <td>${item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
