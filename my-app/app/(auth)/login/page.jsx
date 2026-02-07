"use client";

import { useToast } from "@/components/ui/ToastProvider";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/auth/login", { email, password }, { withCredentials: true });
      showToast("Welcome back! Login successful.", "success");
      router.push("/dashboard");
    } catch (err) {
      showToast(err.response?.data?.message || "Invalid credentials", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-4">
      <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-blue-300/30 blur-3xl" />
      <div className="absolute -bottom-24 -right-10 h-80 w-80 rounded-full bg-indigo-300/30 blur-3xl" />

      <div className="relative w-full max-w-md rounded-2xl border border-white/30 bg-white/80 p-8 shadow-2xl backdrop-blur">
        <h1 className="text-center text-3xl font-bold text-slate-900">Sign in to IntelliDash</h1>
        <p className="mt-2 text-center text-sm text-slate-500">Secure access for admins, managers and users</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Work email"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none ring-blue-500 focus:ring"
          />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none ring-blue-500 focus:ring"
          />

          <button
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 p-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
