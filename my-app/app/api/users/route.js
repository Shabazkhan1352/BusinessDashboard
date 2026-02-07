import { prisma } from "@/lib/prisma";
import { authMiddleware, getAuthErrorResponse, requireRoles } from "@/lib/authMiddleware";
import bcrypt from "bcryptjs";

export async function GET(req) {
  try {
    const user = authMiddleware(req);
    requireRoles(user, ["ADMIN"]);

    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });

    return Response.json(users);
  } catch (error) {
    return getAuthErrorResponse(error);
  }
}

export async function POST(req) {
  try {
    const admin = authMiddleware(req);
    requireRoles(admin, ["ADMIN"]);

    const { name, email, password, role = "USER" } = await req.json();
    if (!name || !email || !password) {
      return Response.json({ message: "Missing required fields" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });

    return Response.json(user, { status: 201 });
  } catch (error) {
    return getAuthErrorResponse(error);
  }
}
