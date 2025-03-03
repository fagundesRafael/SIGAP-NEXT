// app/configs/page.js
"use client";

import { useState, useEffect } from "react";
import SectionCarros from "@/components/SectionCarros";
import SectionMotos from "@/components/SectionMotos";
import SectionCaminhonetes from "@/components/SectionCaminhonetes";
import SectionCaminhoes from "@/components/SectionCaminhoes";
import SectionTratores from "@/components/SectionTratores";
import SectionOutrosAutomotores from "@/components/SectionOutrosAutomotores";
import SectionBicicletas from "@/components/SectionBicicletas";
import SectionOutroNaoMotorizado from "@/components/SectionOutroNaoMotorizado";
import SectionArmas from "@/components/SectionArmas";
import SectionMunicao from "@/components/SectionMunicao";
import SectionOutrosBelicos from "@/components/SectionOutrosBelicos";
import SectionGeladeira from "@/components/SectionGeladeira";
import SectionFogao from "@/components/SectionFogao";
import SectionComputador from "@/components/SectionComputador";
import SectionNotebook from "@/components/SectionNotebook";
import SectionTelevisor from "@/components/SectionTelevisor";
import SectionOutroEletroEletronico from "@/components/SectionOutroEletroEletronico";
import SectionOutros from "@/components/SectionOutrosObjetos";
import NotificationModal from "@/components/NotificationModal";

export default function ConfigsPage() {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  // Automotores
  const [carros, setCarros] = useState([]);
  const [motos, setMotos] = useState([]);
  const [caminhonetes, setCaminhonetes] = useState([]);
  const [caminhoes, setCaminhoes] = useState([]);
  const [tratores, setTratores] = useState([]);
  const [outrosautomotores, setOutrosAutomotores] = useState([]);

  // Veículos não motorizados
  const [bicicletas, setBicicletas] = useState([]);
  const [outronaomotorizado, setOutronaomotorizado] = useState([]);

  // Bélicos
  const [armas, setArmas] = useState([]);
  const [municoes, setMunicoes] = useState([]);
  const [outrosbelicos, setOutrosBelicos] = useState([]);

  // Eletroeletrônicos (novas categorias)
  const [geladeiras, setGeladeiras] = useState([]);
  const [fogoes, setFogoes] = useState([]);
  const [computadores, setComputadores] = useState([]);
  const [notebooks, setNotebooks] = useState([]);
  const [televisores, setTelevisores] = useState([]);
  const [outroeletroeletronicos, setOutroeletroeletronicos] = useState([]);

  // Outras
  const [entorpecentes, setEntorpecentes] = useState([]);
  const [eletro, setEletro] = useState([]);
  const [outrosobjetos, setOutrosObjetos] = useState([]);

  useEffect(() => {
    async function fetchConfigs() {
      try {
        const res = await fetch("/api/configs", {
          method: "GET",
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) {
            const config = data[0];
            setCarros(config.carros || []);
            setMotos(config.motos || []);
            setCaminhonetes(config.caminhonetes || []);
            setCaminhoes(config.caminhoes || []);
            setTratores(config.tratores || []);
            setOutrosAutomotores(config.outrosautomotores || []);
            setBicicletas(config.bicicletas || []);
            setOutronaomotorizado(config.outronaomotorizado || []);
            setArmas(config.armas || []);
            setMunicoes(config.municoes || []);
            setOutrosBelicos(config.outrosbelicos || []);
            setGeladeiras(config.geladeiras || []);
            setFogoes(config.fogoes || []);
            setComputadores(config.computadores || []);
            setNotebooks(config.notebooks || []);
            setTelevisores(config.televisores || []);
            setOutroeletroeletronicos(config.outroeletroeletronicos || []);
            setEletro(config.eletro || []);
            setOutrosObjetos(config.outrosobjetos || []);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar configurações:", error);
      }
    }
    fetchConfigs();
  }, []);

  const showAlert = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
  };

  const closeNotification = () => {
    setShowNotification(false);
    setNotificationMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const configData = {
      carros,
      motos,
      caminhonetes,
      caminhoes,
      tratores,
      outrosautomotores,
      bicicletas,
      outronaomotorizado,
      armas,
      municoes,
      outrosbelicos,
      geladeiras,
      fogoes,
      computadores,
      notebooks,
      televisores,
      outroeletroeletronicos,
      eletro,
      outrosobjetos,
    };
    try {
      const res = await fetch("/api/configs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(configData),
      });
      if (res.ok) {
        showAlert("Configurações salvas com sucesso!");
      } else {
        const data = await res.json();
        showAlert("Erro: " + (data.error || "Erro ao salvar configuração."));
      }
    } catch (error) {
      console.error("Erro ao salvar configuração:", error);
      showAlert("Erro ao salvar configuração.");
    }
  };

  return (
    <div className="min-h-screen p-2 rounded-md bg-c_deep_black text-white border border-gray-500 shadow">
      <h1 className="text-sm font-bold mb-2">Configurações de Registros:</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap justify-between text-xs font-mono max-w-full">
          {/* Automotores */}
          <div className="mb-2 border border-slate-700 rounded p-2">
            <label>Automotores:</label>
            <SectionCarros carros={carros} setCarros={setCarros} />
            <SectionMotos motos={motos} setMotos={setMotos} />
            <SectionCaminhonetes
              caminhonetes={caminhonetes}
              setCaminhonetes={setCaminhonetes}
            />
            <SectionCaminhoes
              caminhoes={caminhoes}
              setCaminhoes={setCaminhoes}
            />
            <SectionTratores tratores={tratores} SetTratores={setTratores} />
            <SectionOutrosAutomotores
              outrosautomotores={outrosautomotores}
              setOutrosAutomotores={setOutrosAutomotores}
            />
          </div>
          {/* Bélicos */}
          <div className="mb-2 border border-slate-700 rounded p-2">
            <label>Bélicos:</label>
            <SectionArmas armas={armas} setArmas={setArmas} />
            <SectionMunicao municoes={municoes} setMunicoes={setMunicoes} />
            <SectionOutrosBelicos
              outrosbelicos={outrosbelicos}
              setOutrosBelicos={setOutrosBelicos}
            />
          </div>
          {/* Veículos não motorizados */}
          <div className="mb-2 border border-slate-700 rounded p-2">
            <label>Veículos não motorizados:</label>
            <SectionBicicletas
              bicicletas={bicicletas}
              setBicicletas={setBicicletas}
            />
            <SectionOutroNaoMotorizado
              outronaomotorizado={outronaomotorizado}
              setOutronaomotorizado={setOutronaomotorizado}
            />
          </div>
          {/* Eletroeletrônicos */}
          <div className="mb-2 border border-slate-700 rounded p-2">
            <label>Eletroeletrônicos:</label>
            <SectionGeladeira
              geladeiras={geladeiras}
              setGeladeiras={setGeladeiras}
            />
            <SectionFogao fogoes={fogoes} setFogoes={setFogoes} />
            <SectionComputador
              computadores={computadores}
              setComputadores={setComputadores}
            />
            <SectionNotebook
              notebooks={notebooks}
              setNotebooks={setNotebooks}
            />
            <SectionTelevisor
              televisores={televisores}
              setTelevisores={setTelevisores}
            />
            <SectionOutroEletroEletronico
              outroeletroeletronicos={outroeletroeletronicos}
              setOutroeletroeletronicos={setOutroeletroeletronicos}
            />
          </div>
          {/* Outros objetos */}
          <div className="mb-2 border border-slate-700 rounded p-2">
            <label>Outros objetos:</label>
            <SectionOutros
              outrosobjetos={outrosobjetos}
              setOutrosObjetos={setOutrosObjetos}
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="mt-4 p-2 bg-green-500 rounded hover:bg-green-600"
          >
            Salvar Configurações
          </button>
        </div>
      </form>
      <hr className="my-4 border-gray-300" />
      {showNotification && (
        <NotificationModal
          message={notificationMessage}
          onClose={closeNotification}
        />
      )}
    </div>
  );
}
