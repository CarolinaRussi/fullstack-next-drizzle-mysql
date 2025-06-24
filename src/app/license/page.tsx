"use client";
import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

type License = {
  id: number;
  number: string;
  environmentalAgency: string;
  issuedAt: string;
  expiresAt: string;
};

type CompanyFormProps = {
  companyId?: string;
};

export default function LicenseList({ companyId }: CompanyFormProps) {
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<License | null>(null);
  const router = useRouter();

  const fetchLicenses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/license?companyId=${companyId}`);
      const data = await res.json();
      setLicenses(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      toast.error("Erro ao carregar as licenças da empresa: " + errorMessage);
      setLicenses([]);
    } finally {
      setLoading(false);
    }
  }, [companyId]);

  useEffect(() => {
    if (companyId) fetchLicenses();
  }, [companyId, fetchLicenses]);

  const openDeleteModal = (license: License) => {
    setShowDeleteModal(license);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(null);
  };

  const confirmDelete = async () => {
    if (!showDeleteModal) return;
    try {
      const res = await fetch(`/api/license/${showDeleteModal.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Licença deletada com sucesso!");
        fetchLicenses();
      } else {
        const err = await res.json();
        toast.error("Erro ao deletar licença: " + (err.message || "Erro"));
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      toast.error("Erro de conexão ao deletar licença: " + errorMessage);
    } finally {
      closeDeleteModal();
    }
  };
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Licenças da Empresa</h2>
        <button
          className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-800 cursor-pointer"
          onClick={() => router.push(`/company/${companyId}/licenses/create`)}
        >
          Nova Licença +
        </button>
      </div>

      {loading ? (
        <p>Carregando licenças...</p>
      ) : licenses.length === 0 ? (
        <p className="text-gray-500 mt-4">Nenhuma licença cadastrada.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {licenses.map((license) => (
            <li
              key={license.id}
              className="border rounded p-3 bg-white shadow-sm flex justify-between items-start"
            >
              <div>
                <p>
                  <strong>Número:</strong> {license.number}
                </p>
                <p>
                  <strong>Órgão Ambiental:</strong>{" "}
                  {license.environmentalAgency}
                </p>
                <p>
                  <strong>Emissão:</strong>{" "}
                  {new Date(license.issuedAt).toLocaleDateString("pt-BR", {
                    timeZone: "UTC",
                  })}
                </p>

                <p>
                  <strong>Validade:</strong>{" "}
                  {new Date(license.expiresAt).toLocaleDateString("pt-BR", {
                    timeZone: "UTC",
                  })}
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  aria-label="Editar licença"
                  onClick={() =>
                    router.push(
                      `/company/${companyId}/licenses/${license.id}/edit`
                    )
                  }
                  className="text-teal-700 hover:text-teal-900 cursor-pointer"
                >
                  <FaEdit size={20} />
                </button>
                <button
                  aria-label="Excluir licença"
                  onClick={() => openDeleteModal(license)}
                  className="text-red-600 hover:text-red-800 cursor-pointer"
                >
                  <FaTrash size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {showDeleteModal && (
        <Modal onClose={closeDeleteModal}>
          <p>
            Tem certeza que deseja excluir a licença{" "}
            <strong>{showDeleteModal.number}</strong>?
          </p>
          <div className="mt-4 flex justify-end space-x-4">
            <button
              onClick={closeDeleteModal}
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
