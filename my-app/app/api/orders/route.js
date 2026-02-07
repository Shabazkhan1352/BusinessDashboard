import { prisma } from "@/lib/prisma";
import { authMiddleware, getAuthErrorResponse } from "@/lib/authMiddleware";

export async function GET(req) {
  try {
    const user = authMiddleware(req);
    const where = user.role === "USER" ? { userId: user.id } : {};

    const orders = await prisma.order.findMany({
      where,
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return Response.json(orders);
  } catch (error) {
    return getAuthErrorResponse(error);
  }
}

export async function POST(req) {
  try {
    const user = authMiddleware(req);
    const body = await req.json();

    const order = await prisma.order.create({
      data: {
        userId: body.userId || user.id,
        total: Number(body.total),
        status: body.status || "PENDING",
      },
    });

    return Response.json(order, { status: 201 });
  } catch (error) {
    return getAuthErrorResponse(error);
  }
}
