// components/SessionArmas.js
"use client";

import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";

export default function SessionArmas({ armas, setArmas }) {
  const [marcaInput, setMarcaInput] = useState("");
  const [modeloInput, setModeloInput] = useState("");
  const [calibreInput, setCalibreInput] = useState("");
  const [showModeloInput, setShowModeloInput] = useState(false);
  const [showCalibreInput, setShowCalibreInput] = useState(false);
  const [error, setError] = useState("");

  function handleAddMarca() {
    if (!marcaInput.trim()) return;
    const existing = armas.find(
      (item) => item.marca.toLowerCase() === marcaInput.trim().toLowerCase()
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

  function handleDeleteMarca(marca) {
    if (
      window.confirm(
        `Deseja deletar a marca "${marca}" e todos os seus modelos?`
      )
    ) {
      const updated = armas.filter((item) => item.marca !== marca);
      setArmas(updated);
      if (marca.toLowerCase() === marcaInput.trim().toLowerCase()) {
        setMarcaInput("");
        setShowModeloInput(false);
        setModeloInput("");
        setShowCalibreInput(false);
        setCalibreInput("");
      }
    }
  }

  function handleDeleteModelo(marca, modelo) {
    if (
      window.confirm(
        `Deseja deletar o modelo "${modelo}" da marca "${marca}"?`
      )
    ) {
      const updated = armas.map((item) => {
        if (item.marca === marca) {
          return {
            ...item,
            modelos: item.modelos.filter((m) => m.modelo !== modelo),
          };
        }
        return item;
      });
      setArmas(updated);
    }
  }

  const matchingBrand = armas.find(
    (item) => item.marca.toLowerCase() === marcaInput.trim().toLowerCase()
  );
  const matchingModelo =
    matchingBrand &&
    matchingBrand.modelos.find(
      (m) => m.modelo.toLowerCase() === modeloInput.trim().toLowerCase()
    );

  return (
    <div className="mb-6 p-4 border rounded bg-gray-800">
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
            placeholder="Modelo da arma"
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
            matchingBrand.modelos.find(
              (m) =>
                m.modelo.toLowerCase() === modeloInput.trim().toLowerCase()
            ) && (
              <button type="button" onClick={() => handleDeleteModelo(matchingBrand.marca, modeloInput.trim())} className="text-red-500">
                <TiDeleteOutline size={24} />
              </button>
            )}
        </div>
      )}
      {showCalibreInput && (
        <div className="flex items-center gap-2 mt-2">
          <input
            type="text"
            placeholder="Calibre da arma"
            value={calibreInput}
            onChange={(e) => setCalibreInput(e.target.value)}
            className="p-2 rounded text-black"
          />
          {calibreInput.trim() !== "" && (
            <button type="button" onClick={handleAddCalibre} className="text-green-500">
              <IoIosAddCircle size={24} />
            </button>
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
              <li key={idx}>
                <strong>{item.marca}:</strong>{" "}
                {item.modelos.map((m, i) => (
                  <span key={i}>
                    {m.modelo} (Calibre: {m.calibre})
                    {i < item.modelos.length - 1 ? ", " : ""}
                  </span>
                ))}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
