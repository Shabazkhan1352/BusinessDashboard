import { prisma } from "@/lib/prisma";
import { authMiddleware, requireRoles } from "@/lib/authMiddleware";

export async function GET() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  return Response.json(products);
}

export async function POST(req) {
  try {
    const user = authMiddleware(req);
    requireRoles(user, ["ADMIN", "MANAGER"]);

    const { name, price, stock } = await req.json();
    if (!name || price == null || stock == null) {
      return Response.json({ message: "Missing required fields" }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: { name, price: Number(price), stock: Number(stock) },
    });

    return Response.json(product, { status: 201 });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
