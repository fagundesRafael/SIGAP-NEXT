// app/armasemunicoes/page.js
"use client";

import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";

export default function ArmasEMunicoesPage() {
  const [records, setRecords] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [showSearch, setShowSearch] = useState(false);
  const [searchParams, setSearchParams] = useState({
    procedimento: "",
    numero: "",
    tipo: "",
    marca: "",
    modelo: "",
    calibre: "",
  });
  const limit = 16;

  async function fetchRecords(currentPage, searchObj = {}) {
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        ...searchObj,
      });
      const res = await fetch(`/api/armasemunicoes?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setRecords(data.records);
        setTotal(data.total);
        setPage(data.page);
      }
    } catch (error) {
      console.error("Erro ao buscar registros:", error);
    }
  }

  useEffect(() => {
    fetchRecords(page, searchParams);
  }, [page, searchParams]);

  const totalPages = Math.ceil(total / limit);

  function handleSearchSubmit(e) {
    e.preventDefault();
    setPage(1);
  }

  return (
    <div className="min-h-screen p-2 rounded-md bg-c_deep_black text-white border border-gray-500 shadow">
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="flex gap-2 items-center text-white py-1 px-2 rounded bg-blue-500 hover:bg-c_text_blue transition duration-300"
        >
          {showSearch ? "Fechar" : "Buscar"} <FaSearch />
        </button>
        <Link
          href="/armasemunicoes/registrar"
          className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600 transition duration-600"
        >
          Registrar nova(s) arma(s) e/ou munição(ões)
        </Link>
      </div>

      {showSearch && (
        <form onSubmit={handleSearchSubmit} className="mb-3 rounded-xl">
          <div className="flex justify-between mt-2">
            {["procedimento", "numero", "tipo", "marca", "modelo", "calibre"].map((field) => (
              <div key={field}>
                <label className="block font-medium text-xs">
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                </label>
                <input
                  type="text"
                  value={searchParams[field]}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, [field]: e.target.value })
                  }
                  className="text-slate-200 p-1 rounded max-w-[140px] min-w-[100px] h-[28px] bg-c_deep_gray_black border border-gray-500 shadow"
                />
              </div>
            ))}
          </div>
        </form>
      )}

      <table className="w-full">
        <thead className="bg-blue-900 text-white text-xs">
          <tr>
            {[
              "Proced.",
              "Número",
              "Quantid.",
              "Tipo",
              "Marca",
              "Modelo",
              "Calibre",
              "Cor",
              "Aspecto",
              "Status",
              "Destino",
              "Registrado",
              "Modificado",
              "Obs",
              "Data",
              "Imagem",
              "Ações",
            ].map((col) => (
              <th key={col} className="p-1">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r._id} className="text-xs">
              <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">{r.procedimento}</td>
              <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">{r.numero}</td>
              <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">{`${r.quantidade} ${r.unidMedida} ` }</td>
              {r.tipo === "Arma" ? (<td className="border border-c_deep_black bg-c_deep_gray_black text-red-500 underline text-center p-1">{r.tipo}</td>)
                 : (<td className="border border-c_deep_black bg-c_deep_gray_black text-yellow-400 underline text-center p-1">{r.tipo}</td>)
                    }
              <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">{r.marca}</td>
              <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">{r.modelo}</td>
              <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">{r.calibre}</td>
              <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">{r.cor}</td>
              <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">{r.aspecto}</td>
              {r.status === "restituído" ? 
              (<td className="border border-c_deep_black bg-green-500 text-center text-slate-100 p-1">{r.status}</td>)
                :  (<td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">{r.status}</td>)
                  }
              <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">{r.destino}</td>
              <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1" title={r.createdBy}>
                {r.createdBy.split(" ")[0]}
              </td>
              <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1" title={r.updatedBy}>
                {r.updatedBy ? r.updatedBy.split(" ")[0] : ""}
              </td>
              <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1" title={r.obs}>
                {r.obs && r.obs.length > 6 ? `${r.obs.substring(0, 6)}...` : r.obs}
              </td>
              <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">
                {new Date(r.data).toLocaleDateString()}
              </td>
              <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">
                {r.imagem ? (
                  <img src={r.imagem} alt="Imagem" className="w-10 h-10 object-cover" />
                ) : (
                  <img src="/no-image.jpg" alt="Sem imagem" className="w-10 h-10 object-cover" />
                )}
              </td>
              <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">
                <Link href={`/armasemunicoes/${r._id}`} className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 transition duration-600">
                  Ver/Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="bg-green-600 text-white py-1 px-3 rounded disabled:opacity-20 disabled:cursor-not-allowed"
        >
          Retornar
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages || totalPages === 0}
          className="bg-green-600 text-white py-1 px-3 rounded disabled:opacity-20 disabled:cursor-not-allowed"
        >
          Avançar
        </button>
      </div>
    </div>
  );
}
