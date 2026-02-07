"use client";

import { useToast } from "@/components/ui/ToastProvider";
import { useCurrentUser } from "@/lib/useCurrentUser";
import axios from "axios";
import { useRouter } from "next/navigation";
import Skeleton from "./ui/Skeleton";

export default function Navbar() {
  const router = useRouter();
  const { user, loading } = useCurrentUser();
  const { showToast } = useToast();

  const logout = async () => {
    try {
      await axios.post("/api/auth/logout");
      showToast("Logged out successfully", "success");
      router.push("/login");
    } catch {
      showToast("Could not logout. Please try again.", "error");
    }
  };

  return (
    <header className="flex items-center justify-between border-b border-slate-200/80 bg-white/70 px-6 py-4 backdrop-blur">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Dashboard</p>
        <h1 className="text-xl font-semibold">Business Management</h1>
      </div>
      {loading ? (
        <Skeleton className="h-10 w-48" />
      ) : (
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-slate-700">{user?.email}</p>
            <p className="text-xs text-slate-500">Role: {user?.role}</p>
          </div>
          <button
            onClick={logout}
            className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-700"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
