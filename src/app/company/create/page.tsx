"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewCompany() {
  const router = useRouter();
  const [form, setForm] = useState({
    corporateName: "",
    cnpj: "",
    zipCode: "",
    city: "",
    state: "",
    district: "",
    complement: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/company", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push("/");
      } else {
        const error = await res.json();
        alert("Erro: " + error.message || "Erro ao cadastrar empresa");
      }
    } catch (error) {
      alert(`Erro ao conectar com o servidor: ${error}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Nova Empresa</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        {[
          { label: "Razão Social", name: "corporateName" },
          { label: "CNPJ", name: "cnpj" },
          { label: "CEP", name: "zipCode" },
          { label: "Cidade", name: "city" },
          { label: "Estado", name: "state" },
          { label: "Bairro", name: "district" },
          { label: "Complemento", name: "complement" },
        ].map(({ label, name }) => (
          <div key={name}>
            <label className="block text-sm font-medium">{label}</label>
            <input
              type="text"
              name={name}
              value={form[name as keyof typeof form]}
              onChange={handleChange}
              className="mt-1 w-full border rounded px-3 py-2"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-800"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
