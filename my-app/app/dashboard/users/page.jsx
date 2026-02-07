"use client";

import Skeleton from "@/components/ui/Skeleton";
import { useToast } from "@/components/ui/ToastProvider";
import { useCurrentUser } from "@/lib/useCurrentUser";
import axios from "axios";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const { user, loading: userLoading } = useCurrentUser();
  const { showToast } = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "ADMIN") {
      return;
    }

    axios
      .get("/api/users")
      .then((res) => setUsers(res.data))
      .catch(() => showToast("Failed to load users", "error"))
      .finally(() => setLoading(false));
  }, [showToast, user]);

  if (userLoading) return <Skeleton className="h-72 w-full" />;
  if (user?.role !== "ADMIN") {
    return <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-700">Access denied.</div>;
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">Users</h2>
      {loading ? (
        <Skeleton className="h-56 w-full" />
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500">
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => (
              <tr key={item.id} className="border-t border-slate-100">
                <td className="py-2">{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
