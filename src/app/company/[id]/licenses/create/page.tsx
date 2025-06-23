"use client";

import LicenseForm from "@/components/LicenseForm";
import { useParams } from "next/navigation";

export default function NewLicensePage() {
  const params = useParams();
  const companyId = params.companyId as string;

  return (
    <div>
      <LicenseForm companyId={parseInt(companyId)} />
    </div>
  );
}
