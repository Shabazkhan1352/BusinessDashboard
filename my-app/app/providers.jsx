"use client";

import { ToastProvider } from "@/components/ui/ToastProvider";

export default function Providers({ children }) {
  return <ToastProvider>{children}</ToastProvider>;
}
