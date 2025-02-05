// app/configs/page.js
"use client";

import { useState } from "react";

export default function ConfigsPage() {
  // Estados para Carros
  const [marcaCarro, setMarcaCarro] = useState("");
  const [modeloCarro, setModeloCarro] = useState("");

  // Estados para Motos
  const [marcaMoto, setMarcaMoto] = useState("");
  const [modeloMoto, setModeloMoto] = useState("");

  // Estados para Eletrodomésticos
  const [marcaEletroDomesticos, setMarcaEletroDomesticos] = useState("");
  const [modeloEletroDomesticos, setModeloEletroDomesticos] = useState("");

  // Estado para Eletroeletrônicos
  const [marcaEletroEletronicos, setMarcaEletroEletronicos] = useState("");

  // Estados para Armas
  const [marcaArma, setMarcaArma] = useState("");
  const [modeloArma, setModeloArma] = useState("");
  const [calibreArma, setCalibreArma] = useState("");

  // Estados para Munições
  const [marcaMunicao, setMarcaMunicao] = useState("");
  const [modeloMunicao, setModeloMunicao] = useState("");
  const [calibreMunicao, setCalibreMunicao] = useState("");

  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrorMsg("");

    const data = {
      marcaCarro,
      modeloCarro,
      marcaMoto,
      modeloMoto,
      marcaEletroDomesticos,
      modeloEletroDomesticos,
      marcaEletroEletronicos,
      marcaArma,
      modeloArma,
      calibreArma,
      marcaMunicao,
      modeloMunicao,
      calibreMunicao,
    };

    const res = await fetch("/api/configs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setMessage("Configuração salva com sucesso.");
      // Opcional: limpar os campos após salvar
      setMarcaCarro("");
      setModeloCarro("");
      setMarcaMoto("");
      setModeloMoto("");
      setMarcaEletroDomesticos("");
      setModeloEletroDomesticos("");
      setMarcaEletroEletronicos("");
      setMarcaArma("");
      setModeloArma("");
      setCalibreArma("");
      setMarcaMunicao("");
      setModeloMunicao("");
      setCalibreMunicao("");
    } else {
      const json = await res.json();
      setErrorMsg(json.error || "Erro ao salvar configuração.");
    }
  };

  return (
    <div className="min-h-screen rounded-md p-4 bg-customBlack_semi01 mx-1">
      <h1 className="text-2xl font-bold mb-4">Configurações de Suporte</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 border p-6 rounded shadow"
      >
        {/* Seção de Carros */}
        <div>
          <h2 className="font-bold">Carros</h2>
          <label className="block mt-2">
            Marca de Carro:
            <input
              type="text"
              value={marcaCarro}
              onChange={(e) => setMarcaCarro(e.target.value)}
              className="border p-2 ml-2"
            />
          </label>
          <label className="block mt-2">
            Modelo de Carro:
            <input
              type="text"
              value={modeloCarro}
              onChange={(e) => setModeloCarro(e.target.value)}
              className="border p-2 ml-2"
              disabled={!marcaCarro}
            />
          </label>
        </div>

        {/* Seção de Motos */}
        <div>
          <h2 className="font-bold">Motos</h2>
          <label className="block mt-2">
            Marca de Moto:
            <input
              type="text"
              value={marcaMoto}
              onChange={(e) => setMarcaMoto(e.target.value)}
              className="border p-2 ml-2"
            />
          </label>
          <label className="block mt-2">
            Modelo de Moto:
            <input
              type="text"
              value={modeloMoto}
              onChange={(e) => setModeloMoto(e.target.value)}
              className="border p-2 ml-2"
              disabled={!marcaMoto}
            />
          </label>
        </div>

        {/* Seção de Eletrodomésticos */}
        <div>
          <h2 className="font-bold">Eletrodomésticos</h2>
          <label className="block mt-2">
            Marca de Eletrodomésticos:
            <input
              type="text"
              value={marcaEletroDomesticos}
              onChange={(e) => setMarcaEletroDomesticos(e.target.value)}
              className="border p-2 ml-2"
            />
          </label>
          <label className="block mt-2">
            Modelo de Eletrodomésticos:
            <input
              type="text"
              value={modeloEletroDomesticos}
              onChange={(e) => setModeloEletroDomesticos(e.target.value)}
              className="border p-2 ml-2"
              disabled={!marcaEletroDomesticos}
            />
          </label>
        </div>

        {/* Seção de Eletroeletrônicos */}
        <div>
          <h2 className="font-bold">Eletroeletrônicos</h2>
          <label className="block mt-2">
            Marca de Eletroeletrônicos:
            <input
              type="text"
              value={marcaEletroEletronicos}
              onChange={(e) => setMarcaEletroEletronicos(e.target.value)}
              className="border p-2 ml-2"
            />
          </label>
        </div>

        {/* Seção de Armas */}
        <div>
          <h2 className="font-bold">Armas</h2>
          <label className="block mt-2">
            Marca de Arma:
            <input
              type="text"
              value={marcaArma}
              onChange={(e) => setMarcaArma(e.target.value)}
              className="border p-2 ml-2"
            />
          </label>
          <label className="block mt-2">
            Modelo de Arma:
            <input
              type="text"
              value={modeloArma}
              onChange={(e) => setModeloArma(e.target.value)}
              className="border p-2 ml-2"
              disabled={!marcaArma}
            />
          </label>
          <label className="block mt-2">
            Calibre de Arma:
            <input
              type="text"
              value={calibreArma}
              onChange={(e) => setCalibreArma(e.target.value)}
              className="border p-2 ml-2"
              disabled={!modeloArma}
            />
          </label>
        </div>

        {/* Seção de Munições */}
        <div>
          <h2 className="font-bold">Munições</h2>
          <label className="block mt-2">
            Marca de Munição:
            <input
              type="text"
              value={marcaMunicao}
              onChange={(e) => setMarcaMunicao(e.target.value)}
              className="border p-2 ml-2"
            />
          </label>
          <label className="block mt-2">
            Modelo de Munição:
            <input
              type="text"
              value={modeloMunicao}
              onChange={(e) => setModeloMunicao(e.target.value)}
              className="border p-2 ml-2"
              disabled={!marcaMunicao}
            />
          </label>
          <label className="block mt-2">
            Calibre de Munição:
            <input
              type="text"
              value={calibreMunicao}
              onChange={(e) => setCalibreMunicao(e.target.value)}
              className="border p-2 ml-2"
              disabled={!modeloMunicao}
            />
          </label>
        </div>

        {message && <p className="text-green-500">{message}</p>}
        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Salvar Configuração
        </button>
      </form>
    </div>
  );
}
