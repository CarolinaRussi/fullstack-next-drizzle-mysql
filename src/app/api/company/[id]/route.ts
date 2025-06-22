import { NextResponse } from "next/server";
import { db } from "@/db";
import { company } from "@/db/schema";
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
        { error: "Empresa com id inválido" },
        { status: 400 }
      );
    }
    const data = await req.json();

    const result = await db.update(company).set(data).where(eq(company.id, id));

    return NextResponse.json(
      { message: "Empresa criada com sucesso", result },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Erro ao criar empresa: ${error}` },
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
        { error: "Empresa com id Inválido" },
        { status: 400 }
      );
    }

    const result = await db.query.company.findFirst({
      where: eq(company.id, id),
    });

    if (!result) {
      return NextResponse.json(
        { error: "Empresa não encontrada." },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: `Erro ao buscar empresa: ${error}` },
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
