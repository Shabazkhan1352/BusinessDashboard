import { prisma } from "@/lib/prisma";
import { authMiddleware, getAuthErrorResponse } from "@/lib/authMiddleware";
import { generateInsights } from "@/lib/groq";

export async function POST(req) {
  try {
    authMiddleware(req);

    const [orders, revenue, products] = await Promise.all([
      prisma.order.count(),
      prisma.order.aggregate({ _sum: { total: true } }),
      prisma.product.count(),
    ]);

    const insights = await generateInsights({
      revenue: revenue._sum.total || 0,
      orders,
      products,
    });

    return Response.json({ insights });
  } catch (error) {
    return getAuthErrorResponse(error);
  }
}
