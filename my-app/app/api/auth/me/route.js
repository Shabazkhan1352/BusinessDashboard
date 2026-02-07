import { authMiddleware } from "@/lib/authMiddleware";

export async function GET(req) {
  try {
    const user = authMiddleware(req);
    return Response.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
}
