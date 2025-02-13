// app/carrosmotos/registrar/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ImageUpload from "@/components/ImageUpload";
import LoadingImage from "@/components/LoadingImage";


export default function RegistrarVeiculo() {
  const router = useRouter();
  const { data: session } = useSession();

  // Estados do formulário
  const [procedimento, setProcedimento] = useState("");
  const [numero, setNumero] = useState("");
  const [tipo, setTipo] = useState("carro");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [chassi, setChassi] = useState("");
  const [cor, setCor] = useState("");
  const [chaves, setChaves] = useState(false);
  const [status, setStatus] = useState("");
  const [destino, setDestino] = useState("");
  const [secao, setSecao] = useState("");
  const [prateleira, setPrateleira] = useState("");
  const [obs, setObs] = useState("");
  const [dataField, setDataField] = useState("");
  const [imagem, setImagem] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);

  // Arrays de opções
  const procedimentoOptions = ["IPL", "BO", "TCO", "AIAI/AAI", "OUTROS"];
  const statusOptions = ["apreendido", "restituído", "incinerado", "outros"];
  const destinoOptions = ["pátio", "cartório", "depósito", "outros"];
  const cores = [
    "Vermelho",
    "Azul",
    "Verde",
    "Amarelo",
    "Preto",
    "Branco",
    "Cinza",
    "Roxo",
    "Marrom",
    "Laranja",
    "Outro",
  ];

  // Busca as configurações do banco para preencher os selects de marca e modelo
  const [configs, setConfigs] = useState(null);
  useEffect(() => {
    async function fetchConfigs() {
      try {
        const res = await fetch("/api/configs");
        if (res.ok) {
          const data = await res.json();
          setConfigs(data[0]); // Supondo que haja um único documento
        }
      } catch (error) {
        console.error("Erro ao buscar configs:", error);
      }
    }
    fetchConfigs();
  }, []);

  // Marcas disponíveis com base no tipo
  const marcasDisponiveis = configs
    ? tipo === "carro"
      ? configs.carros.map((item) => item.marca)
      : configs.motos.map((item) => item.marca)
    : [];

  // Modelos disponíveis com base na marca e tipo
  const modelosDisponiveis =
    configs && marca
      ? tipo === "carro"
        ? configs.carros.find((item) => item.marca === marca)?.modelos || []
        : configs.motos.find((item) => item.marca === marca)?.modelos || []
      : [];

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    // Monta o payload para envio
    const payload = {
      procedimento,
      numero,
      marca,
      modelo,
      placa, // Se estiver vazia, a API a removerá
      chassi, // Se estiver vazia, a API a removerá
      tipo,
      cor,
      chaves,
      status,
      createdBy: session?.user?.nome,
      updatedBy: "",
      obs,
      data: dataField || new Date(),
      imagem,
    };

    if (status === "apreendido") {
      payload.destino = destino;
      if (destino === "depósito") {
        payload.secao = secao;
        payload.prateleira = prateleira;
      }
    }
    try {
      const res = await fetch("/api/carrosemotos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        alert("Veículo criado com sucesso!");
        router.push("/carrosemotos");
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Erro ao criar veículo");
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      setErrorMsg("Erro ao enviar formulário");
    }
  }

  return (
    <div className="min-h-screen bg-c01_heavy_blue p-2 rounded-md">
      <h1 className="text-white font-bold my-2 mx-6">Registrar Novo Veículo:</h1>
      {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
      <form onSubmit={handleSubmit} className="flex justify-around text-xs">
        <div className="flex flex-col gap-4 w-[45%]">
          {/* Campo Procedimento como SELECT */}

          <div className="flex gap-4">
            <div>
              <label className="block font-medium">Procedimento:</label>
              <select
                required
                value={procedimento}
                onChange={(e) => setProcedimento(e.target.value)}
                className="border p-1 rounded w-full"
              >
                <option value="">Selecione o procedimento</option>
                {procedimentoOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium">Número / ano:</label>
              <input
                required
                type="text"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                className="border p-1 rounded w-[300px]"
                placeholder="Apenas números e caracteres específicos"
              />
            </div>
          </div>

          <div className="flex justify-between gap-4">
            <div>
              <label className="block font-medium">Marca:</label>
              <select
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                className="border p-1 rounded w-full"
              >
                <option value="">Selecione a marca</option>
                {marcasDisponiveis.map((m, idx) => (
                  <option key={idx} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium">Modelo:</label>
              <select
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
                className="border p-1 rounded w-full"
              >
                <option value="">Selecione o modelo</option>
                {modelosDisponiveis.map((m, idx) => (
                  <option key={idx} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium">Cor:</label>
              <select
                required
                value={cor}
                onChange={(e) => setCor(e.target.value)}
                className="border p-1 rounded w-full"
              >
                <option value="">Selecione a cor</option>
                {cores.map((c, idx) => (
                  <option key={idx} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-between gap-4">
            <div>
              <label className="block font-medium">Placa:</label>
              <input
                type="text"
                value={placa}
                onChange={(e) => setPlaca(e.target.value.toUpperCase())}
                className="border p-1 rounded w-full"
              />
            </div>

            <div>
              <label className="block font-medium">Chassi:</label>
              <input
                type="text"
                value={chassi}
                onChange={(e) => setChassi(e.target.value.toUpperCase())}
                className="border p-1 rounded w-full"
              />
            </div>
            <div>
              <label className="block font-medium">Data do registro:</label>
              <input
                type="date"
                value={dataField}
                onChange={(e) => setDataField(e.target.value)}
                className="border p-1 rounded w-full"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium">Tipo:</label>
            <div className="flex gap-2">
              <label>
                <input
                  type="radio"
                  name="tipo"
                  value="carro"
                  checked={tipo === "carro"}
                  onChange={() => setTipo("carro")}
                />{" "}
                Carro
              </label>
              <label>
                <input
                  type="radio"
                  name="tipo"
                  value="moto"
                  checked={tipo === "moto"}
                  onChange={() => setTipo("moto")}
                />{" "}
                Moto
              </label>
            </div>
          </div>

          <div>
            <label className="block font-medium">Chaves:</label>
            <div className="flex gap-2">
              <label>
                <input
                  type="radio"
                  name="chaves"
                  value="true"
                  checked={chaves === true}
                  onChange={() => setChaves(true)}
                />{" "}
                Sim
              </label>
              <label>
                <input
                  type="radio"
                  name="chaves"
                  value="false"
                  checked={chaves === false}
                  onChange={() => setChaves(false)}
                />{" "}
                Não
              </label>
            </div>
          </div>

          <div>
            <label className="block font-medium">Status:</label>
            <div className="flex gap-2">
              {statusOptions.map((opt) => (
                <label key={opt}>
                  <input
                    required
                    type="radio"
                    name="status"
                    value={opt}
                    checked={status === opt}
                    onChange={() => setStatus(opt)}
                  />{" "}
                  {opt}
                </label>
              ))}
            </div>
          </div>

          {status === "apreendido" && (
            <div>
              <label className="block font-medium">Destino:</label>
              <div className="flex gap-2">
                {destinoOptions.map((opt) => (
                  <label key={opt}>
                    <input
                      type="radio"
                      name="destino"
                      value={opt}
                      checked={destino === opt}
                      onChange={() => setDestino(opt)}
                    />{" "}
                    {opt}
                  </label>
                ))}
              </div>
              {destino === "depósito" && (
                <div className="flex gap-4 mt-2">
                  <input
                    type="text"
                    placeholder="Seção"
                    value={secao}
                    onChange={(e) => setSecao(e.target.value)}
                    className="border p-1 rounded w-full"
                  />
                  <input
                    type="text"
                    placeholder="Prateleira"
                    value={prateleira}
                    onChange={(e) => setPrateleira(e.target.value)}
                    className="border p-1 rounded w-full"
                  />
                </div>
              )}
            </div>
          )}

          <div>
            <label className="block font-medium">Observações:</label>
            <textarea
              maxLength={380}
              rows={8}
              value={obs}
              onChange={(e) => setObs(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 w-[45%]">
          <div>
            <label className="block font-medium">Imagem:</label>
            <ImageUpload
              onUpload={(url) => setImagem(url)}
              setLoading={setLoadingImage}
            />
            {loadingImage && <LoadingImage />}
            {imagem ? (
              <p className="text-green-500">Imagem enviada com sucesso!</p>
            ) : (
              <img
                    src="/no-image.jpg"
                    alt="Sem imagem"
                    className="w-96 h-96 mt-3 object-cover"
                  />
            )}
          </div>
          {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 h-8 w-96 rounded hover:bg-blue-600 transform transition"
          >
            Registrar Veículo
          </button>
        </div>
      </form>
    </div>
  );
}
