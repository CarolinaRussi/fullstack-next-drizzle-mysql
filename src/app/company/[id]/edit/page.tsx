"use client";

import LicenseList from "@/app/license/page";
import CompanyForm from "@/components/CompanyForm";
import { useParams } from "next/navigation";

export default function EditCompanyPage() {
  const { id } = useParams();

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Empresa</h1>
      <CompanyForm mode="edit" companyId={id as string} />
      {id && <LicenseList companyId={id as string} />}
    </div>
  );
}
