import { NextResponse } from "next/server";
import { db } from "@/db";
import { license } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Licença com id inválido" },
        { status: 400 }
      );
    }
    const data = await req.json();

    const result = await db.update(license).set(data).where(eq(license.id, id));

    return NextResponse.json(
      { message: "Licença criada com sucesso", result },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Erro ao criar licença: ${error}` },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Licença com id Inválido" },
        { status: 400 }
      );
    }

    const result = await db.query.license.findFirst({
      where: eq(license.id, id),
    });

    if (!result) {
      return NextResponse.json(
        { error: "Licença não encontrada." },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: `Erro ao buscar licença: ${error}` },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Licença com id inválido" },
        { status: 400 }
      );
    }

    const existingCompany = await db.query.license.findFirst({
      where: eq(license.id, id),
    });

    if (!existingCompany) {
      return NextResponse.json(
        { error: "Licença não encontrada" },
        { status: 404 }
      );
    }

    await db.delete(license).where(eq(license.id, id));

    return NextResponse.json({ message: "Licença deletada com sucesso!" });
  } catch (error) {
    return NextResponse.json(
      { error: `Erro ao deletar licença: ${error}` },
      { status: 500 }
    );
  }
}
