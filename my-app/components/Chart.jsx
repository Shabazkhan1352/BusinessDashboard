"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function Chart({ data }) {
  return (
    <div className="h-64 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="mb-3 font-semibold">Revenue vs Orders</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#2563eb" />
          <Bar dataKey="orders" fill="#93c5fd" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
