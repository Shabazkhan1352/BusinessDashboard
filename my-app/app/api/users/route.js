import { prisma } from "@/lib/prisma";
import { authMiddleware } from "@/lib/authMiddleware";

export async function GET(req) {
  try {
    authMiddleware(req);

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return Response.json(users);
  } catch (error) {
    return Response.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
}
