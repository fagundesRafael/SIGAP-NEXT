// components/SessionMotos.js
"use client";

import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

export default function SessionMotos({ motos, setMotos }) {
  const [marcaInput, setMarcaInput] = useState("");
  const [modeloInput, setModeloInput] = useState("");
  const [showModeloInput, setShowModeloInput] = useState(false);
  const [error, setError] = useState("");
  const [deleteModalData, setDeleteModalData] = useState(null);

  function handleAddMarca() {
    if (!marcaInput.trim()) return;
    const existing = motos.find(
      (item) => item.marca.toLowerCase() === marcaInput.trim().toLowerCase()
    );
    if (!existing) {
      setMotos([...motos, { marca: marcaInput.trim(), modelos: [] }]);
    }
    setShowModeloInput(true);
  }

  function handleAddModelo() {
    if (!modeloInput.trim()) return;
    const index = motos.findIndex(
      (item) =>
        item.marca.toLowerCase() === marcaInput.trim().toLowerCase()
    );
    if (index === -1) {
      setError("Marca não encontrada. Adicione a marca primeiro.");
      return;
    }
    if (motos[index].modelos.includes(modeloInput.trim())) {
      setError("Modelo já existe para essa marca.");
      return;
    }
    setError("");
    const updated = [...motos];
    updated[index].modelos.push(modeloInput.trim());
    setMotos(updated);
    setModeloInput("");
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
      const updated = motos.filter(
        (item) => item.marca !== deleteModalData.brand
      );
      setMotos(updated);
    } else if (deleteModalData.type === "model") {
      const updated = motos.map((item) => {
        if (item.marca === deleteModalData.brand) {
          return { ...item, modelos: item.modelos.filter((m) => m !== deleteModalData.model) };
        }
        return item;
      });
      setMotos(updated);
    }
    setDeleteModalData(null);
  }

  function handleCancelDelete() {
    setDeleteModalData(null);
  }

  return (
    <div className="mb-6 p-4 rounded bg-c_deep_gray_black relative">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Inserir marca da moto"
          value={marcaInput}
          onChange={(e) => setMarcaInput(e.target.value)}
          className=" text-slate-200 bg-c_deep_gray_black p-1 rounded w-full border border-gray-500 shadow"
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
        <div className="flex items-center gap-2 mt-2">
          <input
            type="text"
            placeholder="Modelo da moto"
            value={modeloInput}
            onChange={(e) => setModeloInput(e.target.value)}
            className=" text-slate-200 bg-c_deep_gray_black p-1 rounded w-full border border-gray-500 shadow"
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
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="mt-4">
        <h3 className="font-bold">Marcas e Modelos Registrados:</h3>
        {motos.length === 0 ? (
          <p>Nenhuma marca registrada.</p>
        ) : (
          <ul>
            {motos.map((item, idx) => (
              <li key={idx} className="flex flex-wrap items-center gap-2">
                <strong>{item.marca}</strong>
                <button
                  onClick={() => requestDeleteBrand(item.marca)}
                  className="text-red-500"
                >
                  <TiDeleteOutline size={20} />
                </button>
                <span>:</span>
                {item.modelos.map((modelo, i) => (
                  <span key={i} className="flex italic text-sm items-center gap-1">
                    {modelo}
                    <button
                      onClick={() => requestDeleteModel(item.marca, modelo)}
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
