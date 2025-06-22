"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type Company = {
  corporateName: string;
  cnpj: string;
  zipCode: string;
  city: string;
  state: string;
  district: string;
  complement: string;
};

type CompanyFormProps = {
  mode: "create" | "edit";
  companyId?: string;
};

const labelsMap: Record<keyof Company, string> = {
  corporateName: "Nome da Empresa",
  cnpj: "CNPJ",
  zipCode: "CEP",
  city: "Cidade",
  state: "Estado",
  district: "Bairro",
  complement: "Complemento",
};

export default function CompanyForm({ mode, companyId }: CompanyFormProps) {
  const router = useRouter();

  const [form, setForm] = useState<Company>({
    corporateName: "",
    cnpj: "",
    zipCode: "",
    city: "",
    state: "",
    district: "",
    complement: "",
  });

  useEffect(() => {
    if (mode === "edit" && companyId) {
      fetch(`/api/company/${companyId}`)
        .then((res) => res.json())
        .then((data) => setForm(data))
        .catch(() => alert("Falha ao carregar empresa"));
    }
  }, [mode, companyId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = mode === "edit" ? "PUT" : "POST";
    const url = mode === "edit" ? `/api/company/${companyId}` : "/api/company";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success("Empresa criada com sucesso!");
        router.push("/");
      } else {
        const error = await res.json();
        toast.error("Erro: " + (error.message || "Falha ao salvar empresa"));
      }
    } catch (error) {
      const errorMessage =
        error && typeof error === "object" && "message" in error
          ? (error as { message?: string }).message
          : "Falha ao salvar empresa";
      toast.error("Error: " + errorMessage);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
      max-w-4xl mx-auto p-6 
      grid grid-cols-1 gap-6   /* Mobile: 1 coluna */
      sm:grid-cols-2           /* Tela >= 640px: 2 colunas */
    "
    >
      {Object.entries(form).map(([name, value]) => {
        if (name === "id") return null;

        const isFullWidth = name === "corporateName";
        const isCNPJ = name === "cnpj";

        return (
          <div key={name} className={isFullWidth ? "col-span-2" : ""}>
            <label className="block text-sm font-medium mb-1">
              {labelsMap[name as keyof Company]}
            </label>
            <input
              type="text"
              name={name}
              value={value}
              onChange={handleChange}
              required
              readOnly={isCNPJ && mode === "edit"}
              className={`w-full border rounded px-3 py-2 ${
                isCNPJ && mode === "edit"
                  ? "bg-gray-100 cursor-not-allowed opacity-60"
                  : ""
              }`}
            />
          </div>
        );
      })}
      <div className="col-span-2">
        <button
          type="submit"
          className="bg-teal-700 text-white px-6 py-3 rounded hover:bg-teal-800 w-full cursor-pointer"
        >
          {mode === "edit" ? "Salvar Alterações" : "Criar Empresa"}
        </button>
      </div>
    </form>
  );
}
