"use client";

import LicenseList from "@/components/LicenseList";
import { useParams } from "next/navigation";

export default function LicensePage() {
  const { id } = useParams();

  return id && typeof id === "string" ? (
    <LicenseList companyId={id} />
  ) : (
    <p>Empresa não encontrada</p>
  );
}
