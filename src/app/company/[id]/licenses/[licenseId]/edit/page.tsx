"use client";

import LicenseForm from "@/components/LicenseForm";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function EditLicensePage() {
  const params = useParams();
  const companyId = params.companyId as string;
  const licenseId = params.licenseId;

  const [licenseToEdit, setLicenseToEdit] = useState(null);

  useEffect(() => {
    async function fetchLicense() {
      const res = await fetch(`/api/license/${licenseId}`);
      if (res.ok) {
        const data = await res.json();
        setLicenseToEdit(data);
      } else {
        toast.error("Não foi possível trazer as informações da licença");
      }
    }
    fetchLicense();
  }, [licenseId]);

  if (!licenseToEdit) return <p>Carregando licença...</p>;

  return (
    <div>
      <h1>Editar Licença</h1>
      <LicenseForm
        companyId={parseInt(companyId)}
        licenseToEdit={licenseToEdit}
      />
    </div>
  );
}
