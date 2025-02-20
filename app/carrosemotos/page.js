// app/carrosemotos/page.js
"use client";

"use client";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";


export default function CarrosEMotosPage() {
  const [veiculos, setVeiculos] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [showSearch, setShowSearch] = useState(false);
  const [searchParams, setSearchParams] = useState({
    procedimento: "",
    numero: "",
    marca: "",
    modelo: "",
    placa: "",
    chassi: "",
  });
  const limit = 16;

  async function fetchVeiculos(currentPage, searchObj = {}) {
    try {
      // Cria o query string a partir dos parâmetros (incluindo a página)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        ...searchObj,
      });
      const res = await fetch(`/api/carrosemotos?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setVeiculos(data.veiculos);
        setTotal(data.total);
        setPage(data.page);
      }
    } catch (error) {
      console.error("Erro ao buscar veículos:", error);
    }
  }

  useEffect(() => {
    fetchVeiculos(page, searchParams);
  }, [page, searchParams]);

  const totalPages = Math.ceil(total / limit);

  function handleSearchSubmit(e) {
    e.preventDefault();
    // Quando um filtro for aplicado, reseta a página para 1
    setPage(1);
    // A alteração em searchParams acionará o useEffect para atualizar os dados
  }

  return (
    <div className="min-h-screen p-2 rounded-md bg-c_deep_black text-white  border border-gray-500 shadow">
      <div className="flex justify-between items-center mb-2">
        <div>
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="flex gap-2 items-center text-white py-1 px-2 rounded bg-blue-500 hover:bg-c_text_blue hover:font- transition duration-300"
          >
            {showSearch ? "Fechar" : "Buscar"} <FaSearch  />
          </button>
        </div>
        <Link
          href="/carrosemotos/registrar"
          className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600 transform transition duration-600"
        >
          Registrar Novo Veículo
        </Link>
      </div>

      {/* Formulário de Busca */}
      <div
        className={`transition-opacity duration-300 ease-in-out transform ${
          showSearch ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        {showSearch && (
          <form
            onSubmit={handleSearchSubmit}
            className="mb-3 rounded-xl"
          >
            <div className="flex justify-between mt-2">
              <div>
                <label className="block font-medium text-xs">
                  Procedimento:
                </label>
                <input
                  type="text"
                  value={searchParams.procedimento}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      procedimento: e.target.value,
                    })
                  }
                  className="text-slate-200 p-1 rounded max-w-[140px] min-w-[100px] h-[28px] bg-c_deep_gray_black  border border-gray-500 shadow"
                />
              </div>
              <div>
                <label className="block font-medium text-xs">
                  Número:
                </label>
                <input
                  type="text"
                  value={searchParams.numero}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, numero: e.target.value })
                  }
                  className="text-slate-200 p-1 rounded max-w-[140px] min-w-[100px] h-[28px] bg-c_deep_gray_black  border border-gray-500 shadow"
                />
              </div>
              <div>
                <label className="block font-medium text-xs">
                  Marca:
                </label>
                <input
                  type="text"
                  value={searchParams.marca}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, marca: e.target.value })
                  }
                  className="text-slate-200 p-1 rounded max-w-[140px] min-w-[100px] h-[28px] bg-c_deep_gray_black  border border-gray-500 shadow"
                />
              </div>
              <div>
                <label className="block font-medium text-xs">
                  Modelo:
                </label>
                <input
                  type="text"
                  value={searchParams.modelo}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, modelo: e.target.value })
                  }
                  className="text-slate-200 p-1 rounded max-w-[140px] min-w-[100px] h-[28px] bg-c_deep_gray_black  border border-gray-500 shadow"
                />
              </div>
              <div>
                <label className="block font-medium text-xs">
                  Placa:
                </label>
                <input
                  type="text"
                  value={searchParams.placa}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, placa: e.target.value })
                  }
                  className="text-slate-200 p-1 rounded max-w-[140px] min-w-[100px] h-[28px] bg-c_deep_gray_black  border border-gray-500 shadow"
                />
              </div>
              <div>
                <label className="block font-medium text-xs">
                  Chassi:
                </label>
                <input
                  type="text"
                  value={searchParams.chassi}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, chassi: e.target.value })
                  }
                  className="text-slate-200 p-1 rounded max-w-[140px] min-w-[100px] h-[28px] bg-c_deep_gray_black  border border-gray-500 shadow"
                />
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Tabela de Listagem com Colunas Reordenadas */}
      <table className="w-full">
        <thead className="bg-blue-900 text-white text-xs">
          <tr>
            <th className="p-1">Proced.</th>
            <th className="p-1">Número</th>
            <th className="p-1">Tipo</th>
            <th className="p-1">Marca</th>
            <th className="p-1">Modelo</th>
            <th className="p-1">Placa</th>
            <th className="p-1">Chassi</th>
            <th className="p-1">Cor</th>
            <th className="p-1">Chaves</th>
            <th className="p-1">Status</th>
            <th className="p-1">Registrado</th>
            <th className="p-1">Modificado</th>
            <th className="p-1">Obs</th>
            <th className="p-1">Data</th>
            <th className="p-1">Imagem</th>
            <th className="p-1">Ações</th>
          </tr>
        </thead>
        <tbody>
          {veiculos.map((v) => (
            <tr key={v._id} className="text-xs">
              <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">{v.procedimento}</td>
              <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">{v.numero}</td>
              {v.tipo === "carro" ? (<td className="border border-c_deep_black bg-c_deep_gray_black text-blue-300 underline text-center p-1">{v.tipo}</td>)
                 : (<td className="border border-c_deep_black bg-c_deep_gray_black text-yellow-300 underline text-center p-1">{v.tipo}</td>)
                    }
              <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">{v.marca}</td>
              <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">{v.modelo}</td>
              <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">{v.placa}</td>
              <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1" title={v.chassi}>
                {v.chassi?.length > 6
                  ? `${v.chassi.substring(0, 6)}...`
                  : v.chassi}
              </td>
              <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">{v.cor}</td>
              <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">{v.chaves ? "Sim" : "Não"}</td>
              {v.status === "restituído" ? 
              (<td className="border border-c_deep_black bg-green-500 text-center text-slate-100 p-1">{v.status}</td>)
                :  (<td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">{v.status}</td>)
                  }
              <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1" title={v.createdBy}>
                {v.createdBy.split(" ")[0]}
              </td>
              <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1" title={v.updatedBy}>
                {v.updatedBy.split(" ")[0]}
              </td>
              <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1" title={v.obs}>
                {v.obs?.length > 6
                  ? `${v.obs.substring(0, 6)}...`
                  : v.obs}
              </td>
              <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">
                {new Date(v.data).toLocaleDateString()}
              </td>
              <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">
                {v.imagem ? (
                  <img
                    src={v.imagem}
                    alt="Imagem do veículo"
                    className="w-10 h-10 object-cover"
                  />
                ) : (
                  <img
                    src="/no-image.jpg"
                    alt="Sem imagem"
                    className="w-10 h-10 object-cover"
                  />
                )}
              </td>
              <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">
                <Link
                  href={`/carrosemotos/${v._id}`}
                  className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 transform transition duration-600"
                >
                  Ver/Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botões de Paginação */}
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
