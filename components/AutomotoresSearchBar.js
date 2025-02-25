// components/AutomotoresSearchBar.js
"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function AutomotoresSearchBar({ searchParams, setSearchParams }) {
  const fields = ["procedimento", "numero", "tipo", "marca", "modelo", "placa", "chassi"];

  const handleSubmit = (e) => {
    e.preventDefault();
    // O reset de página poderá ser tratado no componente pai, se necessário.
  };

  return (
    <div>
      <button
        onClick={() => {}}
        // Aqui você pode implementar uma lógica de exibição condicional se desejar
        className="flex gap-2 items-center text-white py-1 px-2 rounded bg-blue-500 hover:bg-c_text_blue transition duration-300"
      >
        Buscar <FaSearch />
      </button>
      <form onSubmit={handleSubmit} className="mb-3 rounded-xl">
        <div className="flex justify-between mt-2">
          {fields.map((field) => (
            <div key={field}>
              <label className="block font-medium text-xs">
                {field.charAt(0).toUpperCase() + field.slice(1)}:
              </label>
              <input
                type="text"
                value={searchParams[field] || ""}
                onChange={(e) =>
                  setSearchParams((prev) => ({ ...prev, [field]: e.target.value }))
                }
                className="text-slate-200 p-1 rounded max-w-[120px] min-w-[100px] h-[28px] bg-c_deep_gray_black border border-gray-500 shadow"
              />
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}
