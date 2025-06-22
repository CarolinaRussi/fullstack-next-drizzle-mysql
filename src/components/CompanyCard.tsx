"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEdit, FaTrash } from "react-icons/fa";
import Modal from "./Modal";
import { toast } from "react-toastify";

interface CompanyCardProps {
  id: number;
  corporateName: string;
  cnpj: string;
  city: string;
  state: string;
  onDelete: (id: number) => void;
}

export default function CompanyCard({
  id,
  corporateName,
  cnpj,
  city,
  state,
  onDelete,
}: CompanyCardProps) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setShowModal(true);
  };

  const confirmDelete = () => {
    onDelete(id);
    toast.success("Empresa deletada com sucesso!");
    setShowModal(false);
  };

  return (
    <div className="border p-4 rounded bg-white shadow-sm flex justify-between items-center">
      <div>
        <p>
          <strong>Razão Social:</strong> {corporateName}
        </p>
        <p>
          <strong>CNPJ:</strong> {cnpj}
        </p>
        <p>
          <strong>Cidade:</strong> {city} - {state}
        </p>
      </div>
      <div className="flex space-x-3">
        <button
          aria-label="Editar empresa"
          onClick={() => router.push(`/company/${id}/edit`)}
          className="text-teal-700 hover:text-teal-900 cursor-pointer"
        >
          <FaEdit size={20} />
        </button>
        <button
          aria-label="Excluir empresa"
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800 cursor-pointer"
        >
          <FaTrash size={20} />
        </button>
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <p>
            Tem certeza que deseja excluir a empresa{" "}
            <strong>{corporateName}</strong>?
          </p>
          <div className="mt-4 flex justify-end space-x-4">
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 border rounded"
            >
              Cancelar
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Excluir
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
