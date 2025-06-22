import { NextResponse } from "next/server";
import { db } from "@/db";
import { license } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const result = await db.insert(license).values({
      number: data.number,
      environmentalAgency: data.environmentalAgency,
      issuedAt: new Date(data.issuedAt),
      expiresAt: new Date(data.expiresAt),
      companyId: Number(data.companyId),
    });

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

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const companyId = url.searchParams.get("companyId");
    if (!companyId) {
      return NextResponse.json(
        { error: "Id da Empresa faltando!" },
        { status: 400 }
      );
    }

    const licenses = await db.query.license.findMany({
      where: eq(license.companyId, Number(companyId)),
    });

    return NextResponse.json(licenses);
  } catch (error) {
    return NextResponse.json(
      { error: `Falha ao buscar pela empresa: ${error}` },
      { status: 500 }
    );
  }
}
