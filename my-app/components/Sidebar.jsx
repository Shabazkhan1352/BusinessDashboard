"use client";

import { useCurrentUser } from "@/lib/useCurrentUser";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Skeleton from "./ui/Skeleton";

const linksByRole = {
  ADMIN: [
    { href: "/dashboard", label: "Overview" },
    { href: "/dashboard/users", label: "Users" },
    { href: "/dashboard/products", label: "Products" },
    { href: "/dashboard/orders", label: "Orders" },
  ],
  MANAGER: [
    { href: "/dashboard", label: "Overview" },
    { href: "/dashboard/products", label: "Products" },
    { href: "/dashboard/orders", label: "Orders" },
  ],
  USER: [
    { href: "/dashboard", label: "Overview" },
    { href: "/dashboard/orders", label: "My Orders" },
  ],
};

export default function Sidebar() {
  const pathname = usePathname();
  const { user, loading } = useCurrentUser();
  const links = linksByRole[user?.role] || linksByRole.USER;

  return (
    <aside className="w-64 border-r border-slate-200/80 bg-white/80 p-5 backdrop-blur">
      <h2 className="mb-1 text-xl font-bold text-blue-700">IntelliDash</h2>
      <p className="mb-6 text-xs text-slate-500">Business Intelligence Platform</p>
      {loading ? (
        <div className="space-y-2">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </div>
      ) : (
        <nav className="space-y-1.5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                pathname === link.href
                  ? "bg-blue-600 text-white shadow"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </aside>
  );
}
