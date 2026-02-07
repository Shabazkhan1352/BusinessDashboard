"use client";

import Skeleton from "@/components/ui/Skeleton";
import { useToast } from "@/components/ui/ToastProvider";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const { showToast } = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => setProducts(res.data))
      .catch(() => showToast("Failed to load products", "error"))
      .finally(() => setLoading(false));
  }, [showToast]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">Products</h2>
      {loading ? (
        <Skeleton className="h-56 w-full" />
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500">
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.id} className="border-t border-slate-100">
                <td className="py-2">{item.name}</td>
                <td>${item.price}</td>
                <td>{item.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
