"use client";

import LicenseForm from "@/components/LicenseForm";
import { useParams } from "next/navigation";

export default function NewLicenseCompany() {
  const params = useParams();
  const companyId = params.id as string;

  return (
    <div>
      <LicenseForm companyId={parseInt(companyId)} />
    </div>
  );
}
