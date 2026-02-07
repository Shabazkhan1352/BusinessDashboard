import { prisma } from "@/lib/prisma";
import { authMiddleware } from "@/lib/authMiddleware";

export async function GET(req) {
  try {
    authMiddleware(req);

    const [users, products, orders, revenue] = await Promise.all([
      prisma.user.count(),
      prisma.product.count(),
      prisma.order.count(),
      prisma.order.aggregate({ _sum: { total: true } }),
    ]);

    return Response.json({
      users,
      products,
      orders,
      revenue: revenue._sum.total || 0,
    });
  } catch {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
}
