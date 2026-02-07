"use client";

import Chart from "@/components/Chart";
import StatsCard from "@/components/StatsCard";
import Skeleton from "@/components/ui/Skeleton";
import { useToast } from "@/components/ui/ToastProvider";
import { useCurrentUser } from "@/lib/useCurrentUser";
import axios from "axios";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { user, loading: userLoading } = useCurrentUser();
  const { showToast } = useToast();
  const [stats, setStats] = useState({ users: 0, products: 0, orders: 0, revenue: 0 });
  const [insights, setInsights] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/dashboard")
      .then((res) => setStats(res.data))
      .catch(() => showToast("Could not load dashboard metrics", "error"))
      .finally(() => setLoading(false));
  }, [showToast]);

  const generateInsights = async () => {
    try {
      const { data } = await axios.post("/api/ai/insights");
      setInsights(data.insights);
      showToast("AI insights generated", "success");
    } catch {
      showToast("Failed to generate insights", "error");
    }
  };

  const cards = [
    { label: "Orders", value: stats.orders },
    { label: "Revenue", value: `$${stats.revenue.toFixed(2)}` },
    { label: "Products", value: stats.products },
    ...(user?.role === "ADMIN" ? [{ label: "Users", value: stats.users }] : []),
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm">
        <p className="text-sm text-slate-500">Welcome, {userLoading ? "..." : user?.email}</p>
        <h2 className="text-2xl font-semibold">{user?.role || "USER"} Workspace</h2>
        <p className="mt-1 text-sm text-slate-500">
          {user?.role === "ADMIN"
            ? "You can manage users, products and orders."
            : user?.role === "MANAGER"
              ? "You can manage products and orders."
              : "You can monitor your orders and business updates."}
        </p>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <StatsCard key={card.label} label={card.label} value={card.value} />
          ))}
        </div>
      )}

      <Chart
        data={[
          { name: "Current", orders: stats.orders, revenue: stats.revenue },
          { name: "Target", orders: stats.orders + 8, revenue: stats.revenue + 800 },
        ]}
      />

      <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold">AI Insights</h3>
          <button
            onClick={generateInsights}
            className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
          >
            Generate Insights
          </button>
        </div>
        <p className="whitespace-pre-line text-sm text-slate-700">
          {insights || "Generate insights to see business recommendations."}
        </p>
      </div>
    </div>
  );
}
