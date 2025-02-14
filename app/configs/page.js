// app/configs/page.js
"use client";

import { useState, useEffect } from "react";
import SessionCarros from "@/components/SessionCarros";
import SessionBicicletas from "@/components/SessionBicicletas";
import SessionMotos from "@/components/SessionMotos";
import SessionArmas from "@/components/SessionArmas";
import SessionMunicao from "@/components/SessionMunicao";
import SessionEntorpecentes from "@/components/SessionEntorpecentes";
import SessionEletroeeletronicos from "@/components/SessionEletroeeletronicos";
import SessionOutros from "@/components/SessionOutros";
import DisplayConfigs from "@/components/DisplayConfigs";

export default function ConfigsPage() {
  const [carros, setCarros] = useState([]);
  const [bicicletas, setBicicletas] = useState([]);
  const [motos, setMotos] = useState([]);
  const [armas, setArmas] = useState([]);
  const [municoes, setMunicoes] = useState([]);
  const [entorpecentes, setEntorpecentes] = useState([]);
  const [eletro, setEletro] = useState([]);
  const [outros, setOutros] = useState([]);

  // Busca os dados já salvos no MongoDB ao montar a página
  useEffect(() => {
    async function fetchConfigs() {
      try {
        const res = await fetch("/api/configs", { method: "GET" });
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) {
            const config = data[0]; // Supondo que haja um único documento
            setCarros(config.carros || []);
            setBicicletas(config.bicicletas || []);
            setMotos(config.motos || []);
            setArmas(config.armas || []);
            setMunicoes(config.municoes || []);
            setEntorpecentes(config.entorpecentes || []);
            setEletro(config.eletro || []);
            setOutros(config.outros || []);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar configurações:", error);
      }
    }
    fetchConfigs();
  }, []);

  // Envia as configurações para a API (POST)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const configData = {
      carros,
      bicicletas,
      motos,
      armas,
      municoes,
      entorpecentes,
      eletro,
      outros,
    };
    try {
      const res = await fetch("/api/configs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(configData),
      });
      if (res.ok) {
        alert("Configurações salvas com sucesso!");
      } else {
        const data = await res.json();
        alert("Erro: " + (data.error || "Erro ao salvar configuração."));
      }
    } catch (error) {
      console.error("Erro ao salvar configuração:", error);
      alert("Erro ao salvar configuração.");
    }
  };

  return (
    <div className="min-h-screen p-2 rounded-md bgc_deep_gray_black text-white">
      <h1 className="text-xl font-bold mb-4">Configurações de Suporte</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap gap-x-2 font-mono max-w-full" >
          <SessionCarros carros={carros} setCarros={setCarros} />
          <SessionBicicletas
            bicicletas={bicicletas}
            setBicicletas={setBicicletas}
          />
          <SessionMotos motos={motos} setMotos={setMotos} />
          <SessionArmas armas={armas} setArmas={setArmas} />
          <SessionMunicao municoes={municoes} setMunicoes={setMunicoes} />
          <SessionEntorpecentes
            entorpecentes={entorpecentes}
            setEntorpecentes={setEntorpecentes}
          />
          <SessionEletroeeletronicos eletro={eletro} setEletro={setEletro} />
          <SessionOutros outros={outros} setOutros={setOutros} />
        </div>
        <div>
          <button type="submit" className="mt-4 p-2 bg-green-500 rounded hover:bg-green-600 ">
            Salvar Configurações
          </button>
        </div>
      </form>
      <hr className="my-4 border-gray-300" />
      <DisplayConfigs
        carros={carros}
        bicicletas={bicicletas}
        motos={motos}
        armas={armas}
        municoes={municoes}
        entorpecentes={entorpecentes}
        eletro={eletro}
        outros={outros}
      />
    </div>
  );
}
