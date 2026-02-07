"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const logout = async () => {
    await axios.post("/api/auth/logout");
    router.push("/login");
  };

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      <h1 className="text-xl font-semibold">Business Management Dashboard</h1>
      <button
        onClick={logout}
        className="rounded-md bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-700"
      >
        Logout
      </button>
    </header>
  );
}
