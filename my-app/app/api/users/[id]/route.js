import { prisma } from "@/lib/prisma";
import { authMiddleware, getAuthErrorResponse, requireRoles } from "@/lib/authMiddleware";

export async function PUT(req, { params }) {
  try {
    const admin = authMiddleware(req);
    requireRoles(admin, ["ADMIN"]);

    const data = await req.json();
    const user = await prisma.user.update({
      where: { id: params.id },
      data: {
        name: data.name,
        email: data.email,
        role: data.role,
      },
      select: { id: true, name: true, email: true, role: true },
    });

    return Response.json(user);
  } catch (error) {
    return getAuthErrorResponse(error);
  }
}

export async function DELETE(req, { params }) {
  try {
    const admin = authMiddleware(req);
    requireRoles(admin, ["ADMIN"]);

    await prisma.user.delete({ where: { id: params.id } });
    return Response.json({ message: "User deleted" });
  } catch (error) {
    return getAuthErrorResponse(error);
  }
}
