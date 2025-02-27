// components/SessionEletroeeletronicos.js
"use client";

import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

export default function SessionEletroeeletronicos({ eletro, setEletro }) {
  const [brandInput, setBrandInput] = useState("");
  const [error, setError] = useState("");
  const [deleteModalData, setDeleteModalData] = useState(null);

  function handleAddBrand() {
    if (!brandInput.trim()) return;
    if (eletro.find(item => item.toLowerCase() === brandInput.trim().toLowerCase())) {
      setError("Marca já existe.");
      return;
    }
    setError("");
    setEletro([...eletro, brandInput.trim()]);
    setBrandInput("");
  }

  function requestDeleteBrand(brand) {
    setDeleteModalData({ type: "brand", brand });
  }

  function handleConfirmDelete() {
    if (!deleteModalData) return;
    if (deleteModalData.type === "brand") {
      setEletro(eletro.filter(item => item !== deleteModalData.brand));
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
          placeholder="Inserir marca de Eletro/Eletrônicos"
          value={brandInput}
          onChange={(e) => setBrandInput(e.target.value)}
          className=" text-slate-200 bg-c_deep_gray_black p-1 rounded w-full border border-gray-500 shadow"
        />
        {brandInput.trim() !== "" && (
          <>
            <button type="button" onClick={handleAddBrand} className="text-green-500">
              <IoIosAddCircle size={24} />
            </button>
            <button type="button" onClick={() => requestDeleteBrand(brandInput.trim())} className="text-red-500">
              <TiDeleteOutline size={20} />
            </button>
          </>
        )}
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="mt-2 text-[11px]">
        <h3 className="font-bold">Marcas Registradas:</h3>
        {eletro.length === 0 ? (
          <p>Nenhuma marca registrada.</p>
        ) : (
          <ul>
            {eletro.map((brand, idx) => (
              <li key={idx} className="flex flex-wrap items-center gap-2">
                {brand}
                <button type="button" onClick={() => requestDeleteBrand(brand)} className="text-red-500">
                  <TiDeleteOutline size={20} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {deleteModalData && (
        <ConfirmDeleteModal
          message={`Deseja deletar a marca "${deleteModalData.brand}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}
