"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import StatsCard from "@/components/StatsCard";
import Chart from "@/components/Chart";

export default function DashboardPage() {
  const [stats, setStats] = useState({ users: 0, products: 0, orders: 0, revenue: 0 });
  const [insights, setInsights] = useState("");

  const generateInsights = async () => {
    const { data } = await axios.post("/api/ai/insights");
    setInsights(data.insights);
  };

  useEffect(() => {
    axios
      .get("/api/dashboard")
      .then((res) => setStats(res.data))
      .catch(() => setStats({ users: 0, products: 0, orders: 0, revenue: 0 }));
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard label="Users" value={stats.users} />
        <StatsCard label="Products" value={stats.products} />
        <StatsCard label="Orders" value={stats.orders} />
        <StatsCard label="Revenue" value={`$${stats.revenue.toFixed(2)}`} />
      </div>

      <Chart
        data={[
          { name: "Current", orders: stats.orders, revenue: stats.revenue },
          { name: "Target", orders: stats.orders + 5, revenue: stats.revenue + 500 },
        ]}
      />

      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold">AI Insights</h3>
          <button
            onClick={generateInsights}
            className="rounded-md bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
          >
            Generate Insights
          </button>
        </div>
        <p className="text-slate-700">{insights || "Generate insights to see business recommendations."}</p>
      </div>
    </div>
  );
}
