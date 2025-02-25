// components/BelicoSearchBar.js
"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function BelicoSearchBar({ searchParams, setSearchParams }) {
  const [showSearch, setShowSearch] = useState(false);
  const fields = ["procedimento", "numero", "tipo", "marca", "modelo", "calibre"];

  const handleSubmit = (e) => {
    e.preventDefault();
    // O reset de página pode ser feito no pai, se necessário.
  };

  return (
    <div>
      <button
        onClick={() => setShowSearch(!showSearch)}
        className="flex gap-2 items-center text-white py-1 px-2 rounded bg-blue-500 hover:bg-c_text_blue transition duration-300"
      >
        {showSearch ? "Fechar" : "Buscar"} <FaSearch />
      </button>
      {showSearch && (
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
                    setSearchParams((prev) => ({
                      ...prev,
                      [field]: e.target.value,
                    }))
                  }
                  className="text-slate-200 p-1 rounded max-w-[140px] min-w-[100px] h-[28px] bg-c_deep_gray_black border border-gray-500 shadow"
                />
              </div>
            ))}
          </div>
        </form>
      )}
    </div>
  );
}
