import { NextResponse } from "next/server";
import { db } from "@/db";
import { company } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Empresa com id inválido" },
        { status: 400 }
      );
    }

    const existingCompany = await db.query.company.findFirst({
      where: eq(company.id, id),
    });

    if (!existingCompany) {
      return NextResponse.json(
        { error: "Empresa não encontrada" },
        { status: 404 }
      );
    }

    await db.delete(company).where(eq(company.id, id));

    return NextResponse.json({ message: "Empresa deletada com sucesso!" });
  } catch (error) {
    return NextResponse.json(
      { error: `Erro ao deletar empresa: ${error}` },
      { status: 500 }
    );
  }
}
