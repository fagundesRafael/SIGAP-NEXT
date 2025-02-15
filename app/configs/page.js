// app/configs/page.js
"use client";

import { useState, useEffect } from "react";
import SectionCarros from "@/components/SectionCarros";
import SectionBicicletas from "@/components/SectionBicicletas";
import SectionMotos from "@/components/SectionMotos";
import SectionArmas from "@/components/SectionArmas";
import SectionMunicao from "@/components/SectionMunicao";
import SectionEntorpecentes from "@/components/SectionEntorpecentes";
import SectionEletroeeletronicos from "@/components/SectionEletroeeletronicos";
import SectionOutros from "@/components/SectionOutros";
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
    <div className="min-h-screen p-2 rounded-md bg-c_deep_black text-white border border-gray-500 shadow">
      <h1 className="text-xl font-bold mb-2">Configurações de Registros</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap gap-x-2 font-mono max-w-full" >
          <SectionCarros carros={carros} setCarros={setCarros} />
          <SectionBicicletas
            bicicletas={bicicletas}
            setBicicletas={setBicicletas}
          />
          <SectionMotos motos={motos} setMotos={setMotos} />
          <SectionArmas armas={armas} setArmas={setArmas} />
          <SectionMunicao municoes={municoes} setMunicoes={setMunicoes} />
          <SectionEntorpecentes
            entorpecentes={entorpecentes}
            setEntorpecentes={setEntorpecentes}
          />
          <SectionEletroeeletronicos eletro={eletro} setEletro={setEletro} />
          <SectionOutros outros={outros} setOutros={setOutros} />
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
