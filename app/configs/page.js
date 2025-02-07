// app/configs/page.js
"use client";

import { useState, useEffect } from "react";
import SessionCarros from "@/components/SessionCarros";
import SessionBicicletas from "@/components/SessionBicicletas";
import SessionMotos from "@/components/SessionMotos";
import SessionArmas from "@/components/SessionArmas";
import SessionEntorpecentes from "@/components/SessionEntorpecentes";
import DisplayConfigs from "@/components/DisplayConfigs";

export default function ConfigsPage() {
  const [carros, setCarros] = useState([]);
  const [bicicletas, setBicicletas] = useState([]);
  const [motos, setMotos] = useState([]);
  const [armas, setArmas] = useState([]);
  const [entorpecentes, setEntorpecentes] = useState([]);

  // Busca os dados já salvos no MongoDB quando a página é carregada.
  useEffect(() => {
    async function fetchConfigs() {
      try {
        const res = await fetch("/api/configs", { method: "GET" });
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) {
            const config = data[0]; // Supondo que haja um único documento de configuração
            setCarros(config.carros || []);
            setBicicletas(config.bicicletas || []);
            setMotos(config.motos || []);
            setArmas(config.armas || []);
            setEntorpecentes(config.entorpecentes || []);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar configurações:", error);
      }
    }
    fetchConfigs();
  }, []);

  // Salva as configurações enviando os dados para a API.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const configData = { carros, bicicletas, motos, armas, entorpecentes };
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
    <div className="min-h-screen p-4 bg-c01_heavy_blue text-white">
      <h1 className="text-md font-bold mb-4">Configurações de Suporte</h1>
      <form className="flex font-mono flex-wrap gap-2" onSubmit={handleSubmit}>
        <SessionCarros carros={carros} setCarros={setCarros} />
        <SessionBicicletas bicicletas={bicicletas} setBicicletas={setBicicletas} />
        <SessionMotos motos={motos} setMotos={setMotos} />
        <SessionArmas armas={armas} setArmas={setArmas} />
        <SessionEntorpecentes
          entorpecentes={entorpecentes}
          setEntorpecentes={setEntorpecentes}
        />
        <button type="submit" className="p-2 min-h-4 max-h-10 text-center bg-green-500 rounded">
          Salvar Configurações
        </button>
      </form>
      <hr className="my-4 border-gray-300" />
      <DisplayConfigs
        carros={carros}
        bicicletas={bicicletas}
        motos={motos}
        armas={armas}
        entorpecentes={entorpecentes}
      />
    </div>
  );
}
