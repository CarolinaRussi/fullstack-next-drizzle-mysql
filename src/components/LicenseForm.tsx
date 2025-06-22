"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type License = {
  number: string;
  environmentalAgency: string;
  issuedAt: string;
  expiresAt: string;
};

type LicenseFormProps = {
  companyId: number;
  licenseToEdit?: License & { id: number };
  onClose: () => void;
  onSuccess: () => void;
};

export default function LicenseForm({
  companyId,
  licenseToEdit,
  onClose,
  onSuccess,
}: LicenseFormProps) {
  const [form, setForm] = useState<License>({
    number: "",
    environmentalAgency: "",
    issuedAt: "",
    expiresAt: "",
  });

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

    const payload = {
      companyId,
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
        onSuccess();
        onClose();
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
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 sm:grid-cols-2 max-w-lg mx-auto"
    >
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
      <div className="sm:col-span-2 flex justify-end gap-4 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="border px-4 py-2 rounded cursor-pointer"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-800 cursor-pointer"
        >
          {licenseToEdit ? "Atualizar Licença" : "Salvar Licença"}
        </button>
      </div>
    </form>
  );
}
