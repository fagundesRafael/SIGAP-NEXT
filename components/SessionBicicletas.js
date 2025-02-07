// components/SessionBicicletas.js
"use client";

import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";

export default function SessionBicicletas({ bicicletas, setBicicletas }) {
  const [marcaInput, setMarcaInput] = useState("");
  const [modeloInput, setModeloInput] = useState("");
  const [showModeloInput, setShowModeloInput] = useState(false);
  const [error, setError] = useState("");

  function handleAddMarca() {
    if (!marcaInput.trim()) return;
    const existing = bicicletas.find(
      (item) =>
        item.marca.toLowerCase() === marcaInput.trim().toLowerCase()
    );
    if (!existing) {
      setBicicletas([...bicicletas, { marca: marcaInput.trim(), modelos: [] }]);
    }
    setShowModeloInput(true);
  }

  function handleAddModelo() {
    if (!modeloInput.trim()) return;
    const index = bicicletas.findIndex(
      (item) =>
        item.marca.toLowerCase() === marcaInput.trim().toLowerCase()
    );
    if (index === -1) {
      setError("Marca não encontrada. Adicione a marca primeiro.");
      return;
    }
    if (bicicletas[index].modelos.includes(modeloInput.trim())) {
      setError("Modelo já existe para essa marca.");
      return;
    }
    setError("");
    const updated = [...bicicletas];
    updated[index].modelos.push(modeloInput.trim());
    setBicicletas(updated);
    setModeloInput("");
  }

  function handleDeleteMarca(marca) {
    if (window.confirm(`Deseja deletar a marca "${marca}" e todos os seus modelos?`)) {
      const updated = bicicletas.filter((item) => item.marca !== marca);
      setBicicletas(updated);
      if (marca.toLowerCase() === marcaInput.trim().toLowerCase()) {
        setMarcaInput("");
        setShowModeloInput(false);
        setModeloInput("");
      }
    }
  }

  function handleDeleteModelo(marca, modelo) {
    if (window.confirm(`Deseja deletar o modelo "${modelo}" da marca "${marca}"?`)) {
      const updated = bicicletas.map((item) => {
        if (item.marca === marca) {
          return { ...item, modelos: item.modelos.filter((m) => m !== modelo) };
        }
        return item;
      });
      setBicicletas(updated);
    }
  }

  const matchingBrand = bicicletas.find(
    (item) =>
      item.marca.toLowerCase() === marcaInput.trim().toLowerCase()
  );

  return (
    <div className="mb-6 p-4 border rounded bg-gray-800">
      <h2 className="text-lg font-bold mb-2">Sessão Bicicletas</h2>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Marca da bicicleta"
          value={marcaInput}
          onChange={(e) => setMarcaInput(e.target.value)}
          className="p-2 rounded text-black"
        />
        {marcaInput.trim() !== "" && (
          <button type="button" onClick={handleAddMarca} className="text-green-500">
            <IoIosAddCircle size={24} />
          </button>
        )}
        {matchingBrand && (
          <button type="button" onClick={() => handleDeleteMarca(matchingBrand.marca)} className="text-red-500">
            <TiDeleteOutline size={24} />
          </button>
        )}
      </div>
      {showModeloInput && (
        <div className="flex items-center gap-2 mt-2">
          <input
            type="text"
            placeholder="Modelo da bicicleta"
            value={modeloInput}
            onChange={(e) => setModeloInput(e.target.value)}
            className="p-2 rounded text-black"
          />
          {modeloInput.trim() !== "" && (
            <button type="button" onClick={handleAddModelo} className="text-green-500">
              <IoIosAddCircle size={24} />
            </button>
          )}
          {matchingBrand &&
            modeloInput.trim() !== "" &&
            matchingBrand.modelos.includes(modeloInput.trim()) && (
              <button type="button" onClick={() => handleDeleteModelo(matchingBrand.marca, modeloInput.trim())} className="text-red-500">
                <TiDeleteOutline size={24} />
              </button>
            )}
        </div>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="mt-4">
        <h3 className="font-bold">Marcas e Modelos Registrados:</h3>
        {bicicletas.length === 0 ? (
          <p>Nenhuma marca registrada.</p>
        ) : (
          <ul>
            {bicicletas.map((item, idx) => (
              <li key={idx}>
                <strong>{item.marca}:</strong> {item.modelos.join(", ")}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
