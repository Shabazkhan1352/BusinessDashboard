"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function Chart({ data }) {
  return (
    <div className="h-80 rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-sm backdrop-blur">
      <h3 className="mb-3 text-sm font-semibold text-slate-700">Performance Snapshot</h3>
      <ResponsiveContainer width="100%" height="92%" minHeight={240}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#2563eb" radius={[8, 8, 0, 0]} />
          <Bar dataKey="orders" fill="#60a5fa" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
