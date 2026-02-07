import { verifyToken } from "@/lib/auth";

export function authMiddleware(req) {
  const authHeader = req.headers.get("authorization");
  const cookieToken = req.cookies?.get("token")?.value;

  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : cookieToken;

  if (!token) {
    throw new Error("No token provided");
  }

  return verifyToken(token);
}

export function requireRoles(user, allowedRoles = []) {
  if (!allowedRoles.includes(user.role)) {
    throw new Error("Forbidden");
  }
}
