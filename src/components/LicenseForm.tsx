"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type License = {
  number: string;
  environmentalAgency: string;
  issuedAt: string;
  expiresAt: string;
};

type LicenseFormProps = {
  companyId?: number;
  licenseToEdit?: License & { id: number };
};

type Company = {
  id: number;
  corporateName: string;
};

export default function LicenseForm({
  companyId,
  licenseToEdit,
}: LicenseFormProps) {
  const [form, setForm] = useState<License>({
    number: "",
    environmentalAgency: "",
    issuedAt: "",
    expiresAt: "",
  });
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<
    number | undefined
  >(companyId);
  const router = useRouter();

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const res = await fetch("/api/company");
        const data = await res.json();
        setCompanies(data);
        console.log(companies);
      } catch (error) {
        toast.error(`Erro ao carregar empresas: ${error}`);
      }
    }

    fetchCompanies();
  }, []);

  useEffect(() => {
    if (licenseToEdit) {
      setForm({
        number: licenseToEdit.number || "",
        environmentalAgency: licenseToEdit.environmentalAgency || "",
        issuedAt: licenseToEdit.issuedAt
          ? licenseToEdit.issuedAt.slice(0, 10)
          : "",
        expiresAt: licenseToEdit.expiresAt
          ? licenseToEdit.expiresAt.slice(0, 10)
          : "",
      });
    } else {
      setForm({
        number: "",
        environmentalAgency: "",
        issuedAt: "",
        expiresAt: "",
      });
    }
  }, [licenseToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCompanyId) {
      toast.error("Selecione uma empresa antes de salvar.");
      return;
    }

    console.log("form", form);

    const payload = {
      companyId: selectedCompanyId,
      ...form,
    };

    const method = licenseToEdit ? "PUT" : "POST";
    const url = licenseToEdit
      ? `/api/license/${(licenseToEdit as { id: number }).id}`
      : "/api/license";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(
          licenseToEdit
            ? "Licença atualizada com sucesso!"
            : "Licença criada com sucesso!"
        );
        router.push(`/company/${selectedCompanyId}/edit`);
        return;
      } else {
        const err = await res.json();
        toast.error(
          "Erro: " +
            (err.message ||
              (licenseToEdit
                ? "Falha ao atualizar licença"
                : "Falha ao criar licença"))
        );
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      toast.error(
        "Erro de conexão: " +
          (licenseToEdit ? "ao atualizar licença: " : "ao criar licença: ") +
          errorMessage
      );
    }
  };

  return (
    <div className="max-w-2xl w-full mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        {licenseToEdit ? "Editar Licença" : "Nova Licença"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl w-full mx-auto px-4 py-8 grid gap-4 sm:grid-cols-2"
      >
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-1">Empresa</label>
          <select
            value={selectedCompanyId?.toString() ?? ""}
            onChange={(e) => setSelectedCompanyId(parseInt(e.target.value))}
            required
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Selecione uma empresa</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id.toString()}>
                {company.corporateName}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-1">Número</label>
          <input
            type="text"
            name="number"
            value={form.number}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Órgão Ambiental
          </label>
          <input
            type="text"
            name="environmentalAgency"
            value={form.environmentalAgency}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Data de Emissão
          </label>
          <input
            type="date"
            name="issuedAt"
            value={form.issuedAt}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Validade</label>
          <input
            type="date"
            name="expiresAt"
            value={form.expiresAt}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="sm:col-span-2 flex flex-col sm:flex-row justify-end gap-4 pt-4">
          <button
            type="submit"
            className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-800 cursor-pointer"
          >
            {licenseToEdit ? "Atualizar Licença" : "Salvar Licença"}
          </button>
        </div>
      </form>
    </div>
  );
}
