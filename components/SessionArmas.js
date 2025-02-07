// components/SessionArmas.js
"use client";

import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

export default function SessionArmas({ armas, setArmas }) {
  const [marcaInput, setMarcaInput] = useState("");
  const [modeloInput, setModeloInput] = useState("");
  const [calibreInput, setCalibreInput] = useState("");
  const [showModeloInput, setShowModeloInput] = useState(false);
  const [showCalibreInput, setShowCalibreInput] = useState(false);
  const [error, setError] = useState("");
  const [deleteModalData, setDeleteModalData] = useState(null);

  function handleAddMarca() {
    if (!marcaInput.trim()) return;
    const existing = armas.find(
      (item) =>
        item.marca.toLowerCase() === marcaInput.trim().toLowerCase()
    );
    if (!existing) {
      setArmas([...armas, { marca: marcaInput.trim(), modelos: [] }]);
    }
    setShowModeloInput(true);
  }

  function handleAddModelo() {
    if (!modeloInput.trim()) return;
    const index = armas.findIndex(
      (item) => item.marca.toLowerCase() === marcaInput.trim().toLowerCase()
    );
    if (index === -1) {
      setError("Marca não encontrada. Adicione a marca primeiro.");
      return;
    }
    setShowCalibreInput(true);
  }

  function handleAddCalibre() {
    if (!calibreInput.trim()) return;
    const index = armas.findIndex(
      (item) => item.marca.toLowerCase() === marcaInput.trim().toLowerCase()
    );
    if (index === -1) {
      setError("Marca não encontrada.");
      return;
    }
    if (
      armas[index].modelos.find(
        (m) => m.modelo.toLowerCase() === modeloInput.trim().toLowerCase()
      )
    ) {
      setError("Modelo já existe para essa marca.");
      return;
    }
    setError("");
    const updated = [...armas];
    updated[index].modelos.push({
      modelo: modeloInput.trim(),
      calibre: calibreInput.trim(),
    });
    setArmas(updated);
    setModeloInput("");
    setCalibreInput("");
    setShowCalibreInput(false);
  }

  function requestDeleteBrand(brand) {
    setDeleteModalData({ type: "brand", brand });
  }

  function requestDeleteModel(brand, model) {
    setDeleteModalData({ type: "model", brand, model });
  }

  function handleConfirmDelete() {
    if (!deleteModalData) return;
    if (deleteModalData.type === "brand") {
      const updated = armas.filter(
        (item) => item.marca !== deleteModalData.brand
      );
      setArmas(updated);
    } else if (deleteModalData.type === "model") {
      const updated = armas.map((item) => {
        if (item.marca === deleteModalData.brand) {
          return {
            ...item,
            modelos: item.modelos.filter((m) => m.modelo !== deleteModalData.model),
          };
        }
        return item;
      });
      setArmas(updated);
    }
    setDeleteModalData(null);
  }

  function handleCancelDelete() {
    setDeleteModalData(null);
  }

  return (
    <div className="mb-6 p-4 border rounded bg-gray-800 relative">
      <h2 className="text-lg font-bold mb-2">Sessão Armas e Munições</h2>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Marca da arma"
          value={marcaInput}
          onChange={(e) => setMarcaInput(e.target.value)}
          className="p-2 rounded text-black"
        />
        {marcaInput.trim() !== "" && (
          <>
            <button
              type="button"
              onClick={handleAddMarca}
              className="text-green-500"
            >
              <IoIosAddCircle size={24} />
            </button>
            <button
              type="button"
              onClick={() => requestDeleteBrand(marcaInput.trim())}
              className="text-red-500"
            >
              <TiDeleteOutline size={20} />
            </button>
          </>
        )}
      </div>
      {showModeloInput && (
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Modelo da arma"
              value={modeloInput}
              onChange={(e) => setModeloInput(e.target.value)}
              className="p-2 rounded text-black"
            />
            {modeloInput.trim() !== "" && (
              <>
                <button
                  type="button"
                  onClick={handleAddModelo}
                  className="text-green-500"
                >
                  <IoIosAddCircle size={24} />
                </button>
                <button
                  type="button"
                  onClick={() => requestDeleteModel(marcaInput.trim(), modeloInput.trim())}
                  className="text-red-500"
                >
                  <TiDeleteOutline size={20} />
                </button>
              </>
            )}
          </div>
          {showCalibreInput && (
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Calibre da arma"
                value={calibreInput}
                onChange={(e) => setCalibreInput(e.target.value)}
                className="p-2 rounded text-black"
              />
              {calibreInput.trim() !== "" && (
                <button
                  type="button"
                  onClick={handleAddCalibre}
                  className="text-green-500"
                >
                  <IoIosAddCircle size={24} />
                </button>
              )}
            </div>
          )}
        </div>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="mt-4">
        <h3 className="font-bold">Marcas e Modelos Registrados:</h3>
        {armas.length === 0 ? (
          <p>Nenhuma marca registrada.</p>
        ) : (
          <ul>
            {armas.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <strong>{item.marca}</strong>
                <button
                  onClick={() => requestDeleteBrand(item.marca)}
                  className="text-red-500"
                >
                  <TiDeleteOutline size={20} />
                </button>
                <span>:</span>
                {item.modelos.map((m, i) => (
                  <span key={i} className="flex items-center gap-1">
                    {m.modelo} (Calibre: {m.calibre})
                    <button
                      onClick={() => requestDeleteModel(item.marca, m.modelo)}
                      className="text-red-500"
                    >
                      <TiDeleteOutline size={20} />
                    </button>
                    {i < item.modelos.length - 1 && <span>,</span>}
                  </span>
                ))}
              </li>
            ))}
          </ul>
        )}
      </div>
      {deleteModalData && (
        <ConfirmDeleteModal
          message={
            deleteModalData.type === "brand"
              ? `Deseja deletar a marca "${deleteModalData.brand}" e todos os seus modelos?`
              : `Deseja deletar o modelo "${deleteModalData.model}" da marca "${deleteModalData.brand}"?`
          }
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}
