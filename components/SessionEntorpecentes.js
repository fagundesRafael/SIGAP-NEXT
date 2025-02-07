// components/SessionEntorpecentes.js
"use client";

import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";

export default function SessionEntorpecentes({ entorpecentes, setEntorpecentes }) {
  const [tipoInput, setTipoInput] = useState("");
  const [error, setError] = useState("");

  function handleAddTipo() {
    if (!tipoInput.trim()) return;
    if (
      entorpecentes.find(
        (t) => t.toLowerCase() === tipoInput.trim().toLowerCase()
      )
    ) {
      setError("Tipo já existe.");
      return;
    }
    setError("");
    setEntorpecentes([...entorpecentes, tipoInput.trim()]);
    setTipoInput("");
  }

  function handleDeleteTipo(tipo) {
    if (window.confirm(`Deseja deletar o tipo "${tipo}"?`)) {
      setEntorpecentes(entorpecentes.filter((t) => t !== tipo));
    }
  }

  return (
    <div className="mb-6 p-4 border rounded bg-gray-800">
      <h2 className="text-lg font-bold mb-2">Sessão Entorpecentes</h2>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Tipo de entorpecente"
          value={tipoInput}
          onChange={(e) => setTipoInput(e.target.value)}
          className="p-2 rounded text-black"
        />
        {tipoInput.trim() !== "" && (
          <button type="button" onClick={handleAddTipo} className="text-green-500">
            <IoIosAddCircle size={24} />
          </button>
        )}
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="mt-4">
        <h3 className="font-bold">Tipos Registrados:</h3>
        {entorpecentes.length === 0 ? (
          <p>Nenhum tipo registrado.</p>
        ) : (
          <ul>
            {entorpecentes.map((tipo, idx) => (
              <li key={idx}>
                {tipo}{" "}
                <button type="button" onClick={() => handleDeleteTipo(tipo)} className="text-red-500">
                  <TiDeleteOutline size={20} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
