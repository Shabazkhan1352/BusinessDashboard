import { prisma } from "@/lib/prisma";
import { authMiddleware, requireRoles } from "@/lib/authMiddleware";

export async function PUT(req, { params }) {
  try {
    const user = authMiddleware(req);
    requireRoles(user, ["ADMIN", "MANAGER"]);

    const data = await req.json();
    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        name: data.name,
        price: data.price != null ? Number(data.price) : undefined,
        stock: data.stock != null ? Number(data.stock) : undefined,
      },
    });

    return Response.json(product);
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const user = authMiddleware(req);
    requireRoles(user, ["ADMIN", "MANAGER"]);

    await prisma.product.delete({ where: { id: params.id } });
    return Response.json({ message: "Product deleted" });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
