// components/EntorpecentesTable.js
"use client";

import Link from "next/link";

export default function EntorpecentesTable({ records }) {
  return (
    <table className="w-full">
      <thead className="bg-blue-900 text-white text-[10px]">
        <tr>
          <th className="p-1">Proced./Num.</th>
          <th className="p-1">Tipo</th>
          <th className="p-1">Cor</th>
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
        {records.map((v) => (
          <tr key={v._id} className="text-[10px]">
            <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1" title={`${v.procedimento} ${v.numero}`}>
              {v.procedimento} {v.numero?.length > 8 ? `${v.numero.substring(0,8)}...` : v.numero}
            </td>
            {v.customTipo ? (
              <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">{v.customTipo}</td>
            ) : (
              <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">{v.tipo}</td>
            )}
            <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">{v.cor}</td>
            {v.status === "restituído" ? (
              <td className="border border-c_deep_black bg-green-500 text-center text-slate-100 p-1">{v.status}</td>
            ) : v.status === "apreendido" ? (
              <td className="border border-c_deep_black bg-red-500 text-center text-slate-100 p-1">{v.status}</td>
            ) : (
              <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">{v.status}</td>
            )}
            <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1" title={v.createdBy}>
              {v.createdBy.split(" ")[0]}
            </td>
            <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1" title={v.updatedBy}>
              {v.updatedBy?.split(" ")[0] || ""}
            </td>
            <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1" title={v.obs}>
              {v.obs?.length > 6 ? `${v.obs.substring(0,6)}...` : v.obs}
            </td>
            <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">
              {new Date(v.data).toLocaleDateString()}
            </td>
            <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">
              {v.imagem ? (
                <img src={v.imagem} alt="Imagem do registro" className="w-10 h-10 object-cover" />
              ) : (
                <img src="/no-image.jpg" alt="Sem imagem" className="w-10 h-10 object-cover" />
              )}
            </td>
            <td className="border border-c_deep_black bg-c_deep_gray_black text-center p-1">
              <Link
                href={`/entorpecentes/${v._id}`}
                className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 transition duration-600"
              >
                Ver/Editar
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
