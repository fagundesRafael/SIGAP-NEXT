// components/NaoMotorizadosSearchBar.js
"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function NaoMotorizadosSearchBar({
  searchParams,
  setSearchParams,
}) {
  const [showSearch, setShowSearch] = useState(false);
  const fields = ["procedimento", "numero", "tipo", "marca", "modelo"];

  const handleSubmit = (e) => {
    e.preventDefault();
    // O reset de página pode ser tratado no pai se necessário
  };

  return (
    <div>
      <button
        onClick={() => setShowSearch(!showSearch)}
        className="flex gap-2 items-center text-white py-1 px-2 rounded bg-blue-500 hover:bg-c_text_blue transition duration-300"
      >
        Buscar <FaSearch />
      </button>
      <div
        className={`transition-opacity duration-1000 ease-in-out transform ${
          showSearch ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        {showSearch && (
          <form onSubmit={handleSubmit} className="mb-3 rounded-xl">
            <div className="flex gap-6 mt-2">
              {fields.map((field) => (
                <div key={field}>
                  <label className="flex font-medium text-xs">
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
                    className="text-slate-200 p-1 rounded max-w-[120px] min-w-[100px] h-[28px] bg-c_deep_gray_black border border-gray-500 shadow"
                  />
                </div>
              ))}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
