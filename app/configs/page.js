// app/configs/page.js
"use client";

import { useState, useEffect } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";

export default function ConfigsPage() {
  const [carros, setCarros] = useState([]);
  const [bicicletas, setBicicletas] = useState([]);
  const [motos, setMotos] = useState([]);
  const [armas, setArmas] = useState([]);
  const [entorpecentes, setEntorpecentes] = useState([]);

  // Opcional: busca os dados existentes no MongoDB ao montar a página
  useEffect(() => {
    async function fetchConfigs() {
      try {
        const res = await fetch("/api/configs", { method: "GET" });
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) {
            // Supondo que haja um único documento de configuração
            const config = data[0];
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

  // Salva as configurações chamando a API
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
      <h1 className="text-xl font-bold mb-4">Configurações de Suporte</h1>
      <form onSubmit={handleSubmit}>
        <CarrosSection carros={carros} setCarros={setCarros} />
        <BicicletasSection bicicletas={bicicletas} setBicicletas={setBicicletas} />
        <MotosSection motos={motos} setMotos={setMotos} />
        <ArmasSection armas={armas} setArmas={setArmas} />
        <EntorpecentesSection
          entorpecentes={entorpecentes}
          setEntorpecentes={setEntorpecentes}
        />
        <button type="submit" className="mt-4 p-2 bg-green-500 rounded">
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

/* ================= Seção Carros ================= */
function CarrosSection({ carros, setCarros }) {
  const [marcaInput, setMarcaInput] = useState("");
  const [modeloInput, setModeloInput] = useState("");
  const [showModeloInput, setShowModeloInput] = useState(false);
  const [error, setError] = useState("");

  function handleAddMarca() {
    if (!marcaInput.trim()) return;
    const existing = carros.find(
      (carro) => carro.marca.toLowerCase() === marcaInput.trim().toLowerCase()
    );
    if (!existing) {
      setCarros([...carros, { marca: marcaInput.trim(), modelos: [] }]);
    }
    setShowModeloInput(true);
  }

  function handleAddModelo() {
    if (!modeloInput.trim()) return;
    const index = carros.findIndex(
      (carro) => carro.marca.toLowerCase() === marcaInput.trim().toLowerCase()
    );
    if (index === -1) {
      setError("Marca não encontrada. Adicione a marca primeiro.");
      return;
    }
    if (carros[index].modelos.includes(modeloInput.trim())) {
      setError("Modelo já existe para essa marca.");
      return;
    }
    setError("");
    const updated = [...carros];
    updated[index].modelos.push(modeloInput.trim());
    setCarros(updated);
    setModeloInput("");
  }

  function handleDeleteMarca(marca) {
    if (
      window.confirm(
        `Deseja deletar a marca "${marca}" e todos os seus modelos?`
      )
    ) {
      const updated = carros.filter((carro) => carro.marca !== marca);
      setCarros(updated);
      if (marca.toLowerCase() === marcaInput.trim().toLowerCase()) {
        setMarcaInput("");
        setShowModeloInput(false);
        setModeloInput("");
      }
    }
  }

  function handleDeleteModelo(marca, modelo) {
    if (
      window.confirm(
        `Deseja deletar o modelo "${modelo}" da marca "${marca}"?`
      )
    ) {
      const updated = carros.map((carro) => {
        if (carro.marca === marca) {
          return { ...carro, modelos: carro.modelos.filter((m) => m !== modelo) };
        }
        return carro;
      });
      setCarros(updated);
    }
  }

  const matchingBrand = carros.find(
    (carro) =>
      carro.marca.toLowerCase() === marcaInput.trim().toLowerCase()
  );

  return (
    <div className="mb-6 p-4 border rounded bg-gray-800">
      <h2 className="text-lg font-bold mb-2">Sessão Carros</h2>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Marca do carro"
          value={marcaInput}
          onChange={(e) => setMarcaInput(e.target.value)}
          className="p-2 rounded text-black"
        />
        {marcaInput.trim() !== "" && (
          <button
            type="button"
            onClick={handleAddMarca}
            className="text-green-500"
          >
            <IoIosAddCircle size={24} />
          </button>
        )}
        {matchingBrand && (
          <button
            type="button"
            onClick={() => handleDeleteMarca(matchingBrand.marca)}
            className="text-red-500"
          >
            <TiDeleteOutline size={24} />
          </button>
        )}
      </div>
      {showModeloInput && (
        <div className="flex items-center gap-2 mt-2">
          <input
            type="text"
            placeholder="Modelo do carro"
            value={modeloInput}
            onChange={(e) => setModeloInput(e.target.value)}
            className="p-2 rounded text-black"
          />
          {modeloInput.trim() !== "" && (
            <button
              type="button"
              onClick={handleAddModelo}
              className="text-green-500"
            >
              <IoIosAddCircle size={24} />
            </button>
          )}
          {matchingBrand &&
            modeloInput.trim() !== "" &&
            matchingBrand.modelos.includes(modeloInput.trim()) && (
              <button
                type="button"
                onClick={() =>
                  handleDeleteModelo(matchingBrand.marca, modeloInput.trim())
                }
                className="text-red-500"
              >
                <TiDeleteOutline size={24} />
              </button>
            )}
        </div>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="mt-4">
        <h3 className="font-bold">Marcas e Modelos Registrados:</h3>
        {carros.length === 0 ? (
          <p>Nenhuma marca registrada.</p>
        ) : (
          <ul>
            {carros.map((carro, idx) => (
              <li key={idx}>
                <strong>{carro.marca}:</strong> {carro.modelos.join(", ")}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ================= Seção Bicicletas ================= */
function BicicletasSection({ bicicletas, setBicicletas }) {
  const [marcaInput, setMarcaInput] = useState("");
  const [modeloInput, setModeloInput] = useState("");
  const [showModeloInput, setShowModeloInput] = useState(false);
  const [error, setError] = useState("");

  function handleAddMarca() {
    if (!marcaInput.trim()) return;
    const existing = bicicletas.find(
      (item) =>
        item.marca.toLowerCase() === marcaInput.trim().toLowerCase()
    );
    if (!existing) {
      setBicicletas([
        ...bicicletas,
        { marca: marcaInput.trim(), modelos: [] },
      ]);
    }
    setShowModeloInput(true);
  }

  function handleAddModelo() {
    if (!modeloInput.trim()) return;
    const index = bicicletas.findIndex(
      (item) =>
        item.marca.toLowerCase() === marcaInput.trim().toLowerCase()
    );
    if (index === -1) {
      setError("Marca não encontrada. Adicione a marca primeiro.");
      return;
    }
    if (bicicletas[index].modelos.includes(modeloInput.trim())) {
      setError("Modelo já existe para essa marca.");
      return;
    }
    setError("");
    const updated = [...bicicletas];
    updated[index].modelos.push(modeloInput.trim());
    setBicicletas(updated);
    setModeloInput("");
  }

  function handleDeleteMarca(marca) {
    if (
      window.confirm(
        `Deseja deletar a marca "${marca}" e todos os seus modelos?`
      )
    ) {
      const updated = bicicletas.filter((item) => item.marca !== marca);
      setBicicletas(updated);
      if (marca.toLowerCase() === marcaInput.trim().toLowerCase()) {
        setMarcaInput("");
        setShowModeloInput(false);
        setModeloInput("");
      }
    }
  }

  function handleDeleteModelo(marca, modelo) {
    if (
      window.confirm(
        `Deseja deletar o modelo "${modelo}" da marca "${marca}"?`
      )
    ) {
      const updated = bicicletas.map((item) => {
        if (item.marca === marca) {
          return { ...item, modelos: item.modelos.filter((m) => m !== modelo) };
        }
        return item;
      });
      setBicicletas(updated);
    }
  }

  const matchingBrand = bicicletas.find(
    (item) =>
      item.marca.toLowerCase() === marcaInput.trim().toLowerCase()
  );

  return (
    <div className="mb-6 p-4 border rounded bg-gray-800">
      <h2 className="text-lg font-bold mb-2">Sessão Bicicletas</h2>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Marca da bicicleta"
          value={marcaInput}
          onChange={(e) => setMarcaInput(e.target.value)}
          className="p-2 rounded text-black"
        />
        {marcaInput.trim() !== "" && (
          <button
            type="button"
            onClick={handleAddMarca}
            className="text-green-500"
          >
            <IoIosAddCircle size={24} />
          </button>
        )}
        {matchingBrand && (
          <button
            type="button"
            onClick={() => handleDeleteMarca(matchingBrand.marca)}
            className="text-red-500"
          >
            <TiDeleteOutline size={24} />
          </button>
        )}
      </div>
      {showModeloInput && (
        <div className="flex items-center gap-2 mt-2">
          <input
            type="text"
            placeholder="Modelo da bicicleta"
            value={modeloInput}
            onChange={(e) => setModeloInput(e.target.value)}
            className="p-2 rounded text-black"
          />
          {modeloInput.trim() !== "" && (
            <button
              type="button"
              onClick={handleAddModelo}
              className="text-green-500"
            >
              <IoIosAddCircle size={24} />
            </button>
          )}
          {matchingBrand &&
            modeloInput.trim() !== "" &&
            matchingBrand.modelos.includes(modeloInput.trim()) && (
              <button
                type="button"
                onClick={() =>
                  handleDeleteModelo(matchingBrand.marca, modeloInput.trim())
                }
                className="text-red-500"
              >
                <TiDeleteOutline size={24} />
              </button>
            )}
        </div>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="mt-4">
        <h3 className="font-bold">Marcas e Modelos Registrados:</h3>
        {bicicletas.length === 0 ? (
          <p>Nenhuma marca registrada.</p>
        ) : (
          <ul>
            {bicicletas.map((item, idx) => (
              <li key={idx}>
                <strong>{item.marca}:</strong> {item.modelos.join(", ")}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ================= Seção Motos ================= */
function MotosSection({ motos, setMotos }) {
  const [marcaInput, setMarcaInput] = useState("");
  const [modeloInput, setModeloInput] = useState("");
  const [showModeloInput, setShowModeloInput] = useState(false);
  const [error, setError] = useState("");

  function handleAddMarca() {
    if (!marcaInput.trim()) return;
    const existing = motos.find(
      (item) =>
        item.marca.toLowerCase() === marcaInput.trim().toLowerCase()
    );
    if (!existing) {
      setMotos([...motos, { marca: marcaInput.trim(), modelos: [] }]);
    }
    setShowModeloInput(true);
  }

  function handleAddModelo() {
    if (!modeloInput.trim()) return;
    const index = motos.findIndex(
      (item) =>
        item.marca.toLowerCase() === marcaInput.trim().toLowerCase()
    );
    if (index === -1) {
      setError("Marca não encontrada. Adicione a marca primeiro.");
      return;
    }
    if (motos[index].modelos.includes(modeloInput.trim())) {
      setError("Modelo já existe para essa marca.");
      return;
    }
    setError("");
    const updated = [...motos];
    updated[index].modelos.push(modeloInput.trim());
    setMotos(updated);
    setModeloInput("");
  }

  function handleDeleteMarca(marca) {
    if (
      window.confirm(
        `Deseja deletar a marca "${marca}" e todos os seus modelos?`
      )
    ) {
      const updated = motos.filter((item) => item.marca !== marca);
      setMotos(updated);
      if (marca.toLowerCase() === marcaInput.trim().toLowerCase()) {
        setMarcaInput("");
        setShowModeloInput(false);
        setModeloInput("");
      }
    }
  }

  function handleDeleteModelo(marca, modelo) {
    if (
      window.confirm(
        `Deseja deletar o modelo "${modelo}" da marca "${marca}"?`
      )
    ) {
      const updated = motos.map((item) => {
        if (item.marca === marca) {
          return { ...item, modelos: item.modelos.filter((m) => m !== modelo) };
        }
        return item;
      });
      setMotos(updated);
    }
  }

  const matchingBrand = motos.find(
    (item) =>
      item.marca.toLowerCase() === marcaInput.trim().toLowerCase()
  );

  return (
    <div className="mb-6 p-4 border rounded bg-gray-800">
      <h2 className="text-lg font-bold mb-2">Sessão Motos</h2>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Marca da moto"
          value={marcaInput}
          onChange={(e) => setMarcaInput(e.target.value)}
          className="p-2 rounded text-black"
        />
        {marcaInput.trim() !== "" && (
          <button
            type="button"
            onClick={handleAddMarca}
            className="text-green-500"
          >
            <IoIosAddCircle size={24} />
          </button>
        )}
        {matchingBrand && (
          <button
            type="button"
            onClick={() => handleDeleteMarca(matchingBrand.marca)}
            className="text-red-500"
          >
            <TiDeleteOutline size={24} />
          </button>
        )}
      </div>
      {showModeloInput && (
        <div className="flex items-center gap-2 mt-2">
          <input
            type="text"
            placeholder="Modelo da moto"
            value={modeloInput}
            onChange={(e) => setModeloInput(e.target.value)}
            className="p-2 rounded text-black"
          />
          {modeloInput.trim() !== "" && (
            <button
              type="button"
              onClick={handleAddModelo}
              className="text-green-500"
            >
              <IoIosAddCircle size={24} />
            </button>
          )}
          {matchingBrand &&
            modeloInput.trim() !== "" &&
            matchingBrand.modelos.includes(modeloInput.trim()) && (
              <button
                type="button"
                onClick={() =>
                  handleDeleteModelo(matchingBrand.marca, modeloInput.trim())
                }
                className="text-red-500"
              >
                <TiDeleteOutline size={24} />
              </button>
            )}
        </div>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="mt-4">
        <h3 className="font-bold">Marcas e Modelos Registrados:</h3>
        {motos.length === 0 ? (
          <p>Nenhuma marca registrada.</p>
        ) : (
          <ul>
            {motos.map((item, idx) => (
              <li key={idx}>
                <strong>{item.marca}:</strong> {item.modelos.join(", ")}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ================= Seção Armas e Munições ================= */
function ArmasSection({ armas, setArmas }) {
  const [marcaInput, setMarcaInput] = useState("");
  const [modeloInput, setModeloInput] = useState("");
  const [calibreInput, setCalibreInput] = useState("");
  const [showModeloInput, setShowModeloInput] = useState(false);
  const [showCalibreInput, setShowCalibreInput] = useState(false);
  const [error, setError] = useState("");

  function handleAddMarca() {
    if (!marcaInput.trim()) return;
    const existing = armas.find(
      (item) => item.marca.toLowerCase() === marcaInput.trim().toLowerCase()
    );
    if (!existing) {
      setArmas([...armas, { marca: marcaInput.trim(), modelos: [] }]);
    }
    setShowModeloInput(true);
  }

  function handleAddModelo() {
    if (!modeloInput.trim()) return;
    const index = armas.findIndex(
      (item) => item.marca.toLowerCase() === marcaInput.trim().toLowerCase()
    );
    if (index === -1) {
      setError("Marca não encontrada. Adicione a marca primeiro.");
      return;
    }
    setShowCalibreInput(true);
  }

  // Depois de digitar o calibre, adiciona o par {modelo, calibre} à marca
  function handleAddCalibre() {
    if (!calibreInput.trim()) return;
    const index = armas.findIndex(
      (item) => item.marca.toLowerCase() === marcaInput.trim().toLowerCase()
    );
    if (index === -1) {
      setError("Marca não encontrada.");
      return;
    }
    if (
      armas[index].modelos.find(
        (m) => m.modelo.toLowerCase() === modeloInput.trim().toLowerCase()
      )
    ) {
      setError("Modelo já existe para essa marca.");
      return;
    }
    setError("");
    const updated = [...armas];
    updated[index].modelos.push({
      modelo: modeloInput.trim(),
      calibre: calibreInput.trim(),
    });
    setArmas(updated);
    setModeloInput("");
    setCalibreInput("");
    setShowCalibreInput(false);
  }

  function handleDeleteMarca(marca) {
    if (
      window.confirm(
        `Deseja deletar a marca "${marca}" e todos os seus modelos?`
      )
    ) {
      const updated = armas.filter((item) => item.marca !== marca);
      setArmas(updated);
      if (marca.toLowerCase() === marcaInput.trim().toLowerCase()) {
        setMarcaInput("");
        setShowModeloInput(false);
        setModeloInput("");
        setShowCalibreInput(false);
        setCalibreInput("");
      }
    }
  }

  function handleDeleteModelo(marca, modelo) {
    if (
      window.confirm(
        `Deseja deletar o modelo "${modelo}" da marca "${marca}"?`
      )
    ) {
      const updated = armas.map((item) => {
        if (item.marca === marca) {
          return {
            ...item,
            modelos: item.modelos.filter((m) => m.modelo !== modelo),
          };
        }
        return item;
      });
      setArmas(updated);
    }
  }

  const matchingBrand = armas.find(
    (item) =>
      item.marca.toLowerCase() === marcaInput.trim().toLowerCase()
  );
  const matchingModelo =
    matchingBrand &&
    matchingBrand.modelos.find(
      (m) => m.modelo.toLowerCase() === modeloInput.trim().toLowerCase()
    );

  return (
    <div className="mb-6 p-4 border rounded bg-gray-800">
      <h2 className="text-lg font-bold mb-2">Sessão Armas e Munições</h2>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Marca da arma"
          value={marcaInput}
          onChange={(e) => setMarcaInput(e.target.value)}
          className="p-2 rounded text-black"
        />
        {marcaInput.trim() !== "" && (
          <button
            type="button"
            onClick={handleAddMarca}
            className="text-green-500"
          >
            <IoIosAddCircle size={24} />
          </button>
        )}
        {matchingBrand && (
          <button
            type="button"
            onClick={() => handleDeleteMarca(matchingBrand.marca)}
            className="text-red-500"
          >
            <TiDeleteOutline size={24} />
          </button>
        )}
      </div>
      {showModeloInput && (
        <div className="flex items-center gap-2 mt-2">
          <input
            type="text"
            placeholder="Modelo da arma"
            value={modeloInput}
            onChange={(e) => setModeloInput(e.target.value)}
            className="p-2 rounded text-black"
          />
          {modeloInput.trim() !== "" && (
            <button
              type="button"
              onClick={handleAddModelo}
              className="text-green-500"
            >
              <IoIosAddCircle size={24} />
            </button>
          )}
          {matchingBrand &&
            modeloInput.trim() !== "" &&
            matchingBrand.modelos.find(
              (m) =>
                m.modelo.toLowerCase() === modeloInput.trim().toLowerCase()
            ) && (
              <button
                type="button"
                onClick={() =>
                  handleDeleteModelo(matchingBrand.marca, modeloInput.trim())
                }
                className="text-red-500"
              >
                <TiDeleteOutline size={24} />
              </button>
            )}
        </div>
      )}
      {showCalibreInput && (
        <div className="flex items-center gap-2 mt-2">
          <input
            type="text"
            placeholder="Calibre da arma"
            value={calibreInput}
            onChange={(e) => setCalibreInput(e.target.value)}
            className="p-2 rounded text-black"
          />
          {calibreInput.trim() !== "" && (
            <button
              type="button"
              onClick={handleAddCalibre}
              className="text-green-500"
            >
              <IoIosAddCircle size={24} />
            </button>
          )}
        </div>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="mt-4">
        <h3 className="font-bold">Marcas e Modelos Registrados:</h3>
        {armas.length === 0 ? (
          <p>Nenhuma marca registrada.</p>
        ) : (
          <ul>
            {armas.map((item, idx) => (
              <li key={idx}>
                <strong>{item.marca}:</strong>{" "}
                {item.modelos.map((m, i) => (
                  <span key={i}>
                    {m.modelo} (Calibre: {m.calibre})
                    {i < item.modelos.length - 1 ? ", " : ""}
                  </span>
                ))}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ================= Seção Entorpecentes ================= */
function EntorpecentesSection({ entorpecentes, setEntorpecentes }) {
  const [tipoInput, setTipoInput] = useState("");
  const [error, setError] = useState("");

  function handleAddTipo() {
    if (!tipoInput.trim()) return;
    if (
      entorpecentes.find(
        (t) => t.toLowerCase() === tipoInput.trim().toLowerCase()
      )
    ) {
      setError("Tipo já existe.");
      return;
    }
    setError("");
    setEntorpecentes([...entorpecentes, tipoInput.trim()]);
    setTipoInput("");
  }

  function handleDeleteTipo(tipo) {
    if (window.confirm(`Deseja deletar o tipo "${tipo}"?`)) {
      setEntorpecentes(entorpecentes.filter((t) => t !== tipo));
    }
  }

  return (
    <div className="mb-6 p-4 border rounded bg-gray-800">
      <h2 className="text-lg font-bold mb-2">Sessão Entorpecentes</h2>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Tipo de entorpecente"
          value={tipoInput}
          onChange={(e) => setTipoInput(e.target.value)}
          className="p-2 rounded text-black"
        />
        {tipoInput.trim() !== "" && (
          <button
            type="button"
            onClick={handleAddTipo}
            className="text-green-500"
          >
            <IoIosAddCircle size={24} />
          </button>
        )}
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="mt-4">
        <h3 className="font-bold">Tipos Registrados:</h3>
        {entorpecentes.length === 0 ? (
          <p>Nenhum tipo registrado.</p>
        ) : (
          <ul>
            {entorpecentes.map((tipo, idx) => (
              <li key={idx}>
                {tipo}{" "}
                <button
                  type="button"
                  onClick={() => handleDeleteTipo(tipo)}
                  className="text-red-500"
                >
                  <TiDeleteOutline size={20} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ================= Exibição Geral das Configurações ================= */
function DisplayConfigs({ carros, bicicletas, motos, armas, entorpecentes }) {
  return (
    <div className="p-4 bg-gray-700 rounded">
      <h2 className="text-lg font-bold mb-2">Configurações Atuais</h2>
      <div className="mb-4">
        <h3 className="font-bold">Carros:</h3>
        {carros.length === 0 ? (
          <p>Nenhuma marca de carro registrada.</p>
        ) : (
          <ul>
            {carros.map((item, idx) => (
              <li key={idx}>
                <strong>{item.marca}:</strong> {item.modelos.join(", ")}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mb-4">
        <h3 className="font-bold">Bicicletas:</h3>
        {bicicletas.length === 0 ? (
          <p>Nenhuma marca de bicicleta registrada.</p>
        ) : (
          <ul>
            {bicicletas.map((item, idx) => (
              <li key={idx}>
                <strong>{item.marca}:</strong> {item.modelos.join(", ")}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mb-4">
        <h3 className="font-bold">Motos:</h3>
        {motos.length === 0 ? (
          <p>Nenhuma marca de moto registrada.</p>
        ) : (
          <ul>
            {motos.map((item, idx) => (
              <li key={idx}>
                <strong>{item.marca}:</strong> {item.modelos.join(", ")}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mb-4">
        <h3 className="font-bold">Armas e Munições:</h3>
        {armas.length === 0 ? (
          <p>Nenhuma marca de arma registrada.</p>
        ) : (
          <ul>
            {armas.map((item, idx) => (
              <li key={idx}>
                <strong>{item.marca}:</strong>{" "}
                {item.modelos.map((m, i) => (
                  <span key={i}>
                    {m.modelo} (Calibre: {m.calibre})
                    {i < item.modelos.length - 1 ? ", " : ""}
                  </span>
                ))}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h3 className="font-bold">Entorpecentes:</h3>
        {entorpecentes.length === 0 ? (
          <p>Nenhum tipo registrado.</p>
        ) : (
          <ul>
            {entorpecentes.map((tipo, idx) => (
              <li key={idx}>{tipo}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
