import { NextResponse } from "next/server";
import { db } from "@/db";
import { company } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const result = await db.insert(company).values(data);
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

export async function GET() {
  try {
    const result = await db.select().from(company);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: `Erro ao buscar empresas: ${error}` },
      { status: 500 }
    );
  }
}
