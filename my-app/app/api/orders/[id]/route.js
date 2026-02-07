import { prisma } from "@/lib/prisma";
import { authMiddleware, requireRoles } from "@/lib/authMiddleware";

export async function PUT(req, { params }) {
  try {
    const user = authMiddleware(req);
    requireRoles(user, ["ADMIN", "MANAGER"]);

    const { status } = await req.json();

    const order = await prisma.order.update({
      where: { id: params.id },
      data: { status },
    });

    return Response.json(order);
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
