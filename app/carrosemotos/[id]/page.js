// app/carrosemotos/[id]/page.js
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function VeiculoDetalhes() {
  const { id } = useParams();
  const router = useRouter();
  const [veiculo, setVeiculo] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function fetchVeiculo() {
      try {
        // Aqui você pode implementar uma rota na API que retorne um veículo pelo ID.
        const res = await fetch(`/api/carrosemotos?id=${id}`);
        if (res.ok) {
          const data = await res.json();
          setVeiculo(data);
        } else {
          setErrorMsg("Erro ao buscar veículo");
        }
      } catch (error) {
        console.error(error);
        setErrorMsg("Erro ao buscar veículo");
      }
    }
    if (id) fetchVeiculo();
  }, [id]);

  if (errorMsg) return <p className="p-4 text-red-500">{errorMsg}</p>;
  if (!veiculo) return <p className="p-4">Carregando...</p>;

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Detalhes do Veículo</h1>
      <div className="space-y-2">
        <p><strong>ID:</strong> {veiculo._id}</p>
        <p><strong>Procedimento:</strong> {veiculo.procedimento}</p>
        <p><strong>Número:</strong> {veiculo.numero}</p>
        <p><strong>Marca:</strong> {veiculo.marca}</p>
        <p><strong>Modelo:</strong> {veiculo.modelo}</p>
        <p><strong>Placa:</strong> {veiculo.placa}</p>
        <p><strong>Chassi:</strong> {veiculo.chassi}</p>
        <p><strong>Tipo:</strong> {veiculo.tipo}</p>
        <p><strong>Cor:</strong> {veiculo.cor}</p>
        <p><strong>Chaves:</strong> {veiculo.chaves ? "Sim" : "Não"}</p>
        <p><strong>Status:</strong> {veiculo.status}</p>
        {veiculo.status === "apreendido" && (
          <>
            <p><strong>Destino:</strong> {veiculo.destino}</p>
            {veiculo.destino === "depósito" && (
              <>
                <p><strong>Seção:</strong> {veiculo.secao}</p>
                <p><strong>Prateleira:</strong> {veiculo.prateleira}</p>
              </>
            )}
          </>
        )}
        <p><strong>Created By:</strong> {veiculo.createdBy}</p>
        <p><strong>Updated By:</strong> {veiculo.updatedBy}</p>
        <p><strong>Observações:</strong> {veiculo.obs}</p>
        <p><strong>Data:</strong> {new Date(veiculo.data).toLocaleDateString()}</p>
        {veiculo.imagem && (
          <div>
            <p><strong>Imagem:</strong></p>
            <img src={veiculo.imagem} alt="Imagem do veículo" className="w-64 h-64 object-cover" />
          </div>
        )}
      </div>
      <div className="mt-4">
        <Link href={`/carrosemotos/${id}/edit`} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Editar Veículo
        </Link>
        <button onClick={() => router.back()} className="ml-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">
          Voltar
        </button>
      </div>
    </div>
  );
}
