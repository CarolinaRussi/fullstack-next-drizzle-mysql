"use client";

import { useState, useEffect } from "react";
import CompanyCard from "@/components/CompanyCard";
import { useRouter } from "next/navigation";

type Company = {
  id: number;
  corporateName: string;
  cnpj: string;
  city: string;
  state: string;
};

export default function HomePage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const router = useRouter();

  async function fetchCompanies() {
    const res = await fetch("/api/company");
    const data = await res.json();
    setCompanies(data);
  }

  useEffect(() => {
    fetchCompanies();
  }, []);

  async function handleDelete(id: number) {
    await fetch(`/api/company/${id}`, { method: "DELETE" });
    fetchCompanies();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Lista de Empresas</h2>
        <button
          onClick={() => router.push("/company/create")}
          className="bg-teal-700 hover:bg-teal-800 text-white text-sm px-4 py-2 rounded cursor-pointer"
        >
          Nova Empresa
        </button>
      </div>
      {companies.length === 0 ? (
        <p className="text-gray-500">Nenhuma empresa cadastrada ainda.</p>
      ) : (
        <div className="space-y-2">
          {companies.map((e) => (
            <CompanyCard
              key={e.id}
              id={e.id}
              corporateName={e.corporateName}
              cnpj={e.cnpj}
              city={e.city}
              state={e.state}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
