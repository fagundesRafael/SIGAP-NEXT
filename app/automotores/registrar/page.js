// app/automotores/registrar/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ImageUpload from "@/components/ImageUpload";
import LoadingImage from "@/components/LoadingImage";
import NotificationModal from "@/components/NotificationModal";

export default function RegistrarVeiculo() {
  const router = useRouter();
  const { data: session } = useSession();

  // Estados do formulário
  const [procedimento, setProcedimento] = useState("");
  const [numero, setNumero] = useState("");
  const [tipo, setTipo] = useState("carro");
  const [customTipo, setCustomTipo] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [unidMedida, setUnidMedida] = useState("unid");
  const [cor, setCor] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [chassi, setChassi] = useState("");
  const [chaves, setChaves] = useState(false);
  const [status, setStatus] = useState("");
  const [destino, setDestino] = useState("");
  const [obs, setObs] = useState("");
  const [dataField, setDataField] = useState("");
  const [imagem, setImagem] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  // Arrays de opções
  const procedimentoOptions = ["IPL", "BO", "TCO", "AIAI/AAI", "OUTROS"];
  const statusOptions = ["apreendido", "restituído", "incinerado", "outros"];
  const destinoOptions = ["pátio", "outros"];
  const cores = [
    "Nenhuma",
    "Vermelho",
    "Azul",
    "Verde",
    "Amarelo",
    "Preto",
    "Prata",
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

  const typeMapping = {
    carro: "carros",
    moto: "motos",
    caminhonete: "caminhonetes",
    caminhao: "caminhoes",
    trator: "tratores",
    outrosautomotores: "outrosautomotores",
  };

  const configKey = typeMapping[tipo];

  const marcasDisponiveis =
    configs && configKey
      ? (configs[configKey] || []).map((item) => item.marca)
      : [];

  const modelosDisponiveis =
    configs && marca && configKey
      ? (configs[configKey] || []).find((item) => item.marca === marca)
          ?.modelos || []
      : [];

  // Função para mostrar notificação
  const showAlert = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
  };

  // Função para fechar notificação
  const closeNotification = () => {
    setShowNotification(false);
    setNotificationMessage("");
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    // Definindo valores fixos para quantidade e unidade de medida
    setQuantidade("01");
    setUnidMedida("unid");

    // Monta o payload para envio
    const payload = {
      classe: "automotor",
      procedimento,
      numero,
      quantidade,
      unidMedida,
      marca,
      modelo,
      placa,
      chassi,
      tipo, 
      customTipo: tipo === "outrosautomotores" ? customTipo : "",
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
    } else {
      payload.destino = "outros";
    }
  
    try {
      const res = await fetch("/api/automotores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        showAlert("Veículo criado com sucesso!");
        setTimeout(() => {
          router.push("/automotores");
        }, 2000);
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
    <div className="min-h-screen text-white bg-c_deep_black p-1 rounded-md border border-gray-500 shadow">
      <h1 className="font-bold mt-2 mx-4">Registrar Novo Veículo:</h1>
      {errorMsg && <p className="text-red-500 ml-4 mb-4">{errorMsg}</p>}
      <form onSubmit={handleSubmit} className="flex justify-between p-4 text-xs">
        <div className="flex flex-col gap-4 w-[45%]">
          {/* Campo Procedimento */}
          <div className="flex gap-4">
            <div>
              <label className="block font-medium">Procedimento:</label>
              <select
                required
                value={procedimento}
                onChange={(e) => setProcedimento(e.target.value)}
                className="text-slate-200 bg-c_deep_gray_black p-1 rounded w-full"
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
                className="bg-c_deep_gray_black p-1 rounded w-[300px]"
                placeholder="Apenas números e caracteres específicos"
              />
            </div>
          </div>
          {/* Campo Tipo */}
          <div>
            <label className="block font-medium">Tipo:</label>
            <div className="flex flex-wrap text-center gap-4 bg-c_deep_gray_black p-2 rounded-md">
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="tipo"
                  value="carro"
                  checked={tipo === "carro"}
                  onChange={() => {
                    setTipo("carro");
                    setCustomTipo("");
                  }}
                  className="w-2.5 h-2.5 cursor-pointer appearance-none border-2 border-gray-400 rounded-full checked:bg-green-600 checked:border-green-200 transition-colors"
                />{" "}
                Carro
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="tipo"
                  value="moto"
                  checked={tipo === "moto"}
                  onChange={() => {
                    setTipo("moto");
                    setCustomTipo("");
                  }}
                  className="w-2.5 h-2.5 cursor-pointer appearance-none border-2 border-gray-400 rounded-full checked:bg-green-600 checked:border-green-200 transition-colors"
                />{" "}
                Moto
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="tipo"
                  value="caminhonete"
                  checked={tipo === "caminhonete"}
                  onChange={() => {
                    setTipo("caminhonete");
                    setCustomTipo("");
                  }}
                  className="w-2.5 h-2.5 cursor-pointer appearance-none border-2 border-gray-400 rounded-full checked:bg-green-600 checked:border-green-200 transition-colors"
                />{" "}
                Caminhonete
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="tipo"
                  value="caminhao"
                  checked={tipo === "caminhao"}
                  onChange={() => {
                    setTipo("caminhao");
                    setCustomTipo("");
                  }}
                  className="w-2.5 h-2.5 cursor-pointer appearance-none border-2 border-gray-400 rounded-full checked:bg-green-600 checked:border-green-200 transition-colors"
                />{" "}
                Caminhão
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="tipo"
                  value="trator"
                  checked={tipo === "trator"}
                  onChange={() => {
                    setTipo("trator");
                    setCustomTipo("");
                  }}
                  className="w-2.5 h-2.5 cursor-pointer appearance-none border-2 border-gray-400 rounded-full checked:bg-green-600 checked:border-green-200 transition-colors"
                />{" "}
                Trator
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="tipo"
                  value="outrosautomotores"
                  checked={tipo === "outrosautomotores"}
                  onChange={() => setTipo("outrosautomotores")}
                  className="w-2.5 h-2.5 cursor-pointer appearance-none border-2 border-gray-400 rounded-full checked:bg-green-600 checked:border-green-200 transition-colors"
                />{" "}
                Outro Veículo
              </label>
            </div>
            {/* Campo extra para tipo customizado */}
            {tipo === "outrosautomotores" && (
              <div className="mt-2">
                <label className="block font-medium">Especifique o tipo:</label>
                <input
                  type="text"
                  value={customTipo}
                  onChange={(e) => setCustomTipo(e.target.value.toLowerCase())}
                  className="text-slate-200 bg-c_deep_gray_black p-1 rounded w-full border border-gray-500 shadow"
                  placeholder="Informe o tipo do veículo"
                />
              </div>
            )}
          </div>

          <div className="flex justify-between gap-4">
            <div>
              <label className="block font-medium">Marca:</label>
              <select
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                className="text-slate-200 bg-c_deep_gray_black p-1 rounded w-full"
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
                className="text-slate-200 bg-c_deep_gray_black p-1 rounded w-full"
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
                className="text-slate-200 bg-c_deep_gray_black p-1 rounded w-full"
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
                className="text-slate-200 bg-c_deep_gray_black p-1 rounded w-full"
              />
            </div>

            <div>
              <label className="block font-medium">Chassi:</label>
              <input
                type="text"
                value={chassi}
                onChange={(e) => setChassi(e.target.value.toUpperCase())}
                className="text-slate-200 bg-c_deep_gray_black p-1 rounded w-full"
              />
            </div>
            <div>
              <label className="block font-medium">Data do registro:</label>
              <input
                type="date"
                value={dataField}
                onChange={(e) => setDataField(e.target.value)}
                className="text-slate-200 bg-c_deep_gray_black p-1 rounded w-full"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium">Chaves:</label>
            <div className="flex gap-2">
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="chaves"
                  value="true"
                  checked={chaves === true}
                  onChange={() => setChaves(true)}
                  className="w-2.5 h-2.5 appearance-none border-2 border-gray-400 rounded-full checked:bg-green-600 checked:border-green-200 transition-colors cursor-pointer"
                />{" "}
                Sim
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="chaves"
                  value="false"
                  checked={chaves === false}
                  onChange={() => setChaves(false)}
                  className="w-2.5 h-2.5 appearance-none border-2 border-gray-400 rounded-full checked:bg-green-600 checked:border-green-200 transition-colors cursor-pointer"
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
                    className="w-2.5 h-2.5 appearance-none border-2 border-gray-400 rounded-full checked:bg-green-600 checked:border-green-200 transition-colors cursor-pointer"
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
                      className="w-2.5 h-2.5 appearance-none border-2 border-gray-400 rounded-full checked:bg-green-600 checked:border-green-200 transition-colors cursor-pointer"
                    />{" "}
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block font-medium">Observações:</label>
            <textarea
              maxLength={380}
              rows={10}
              value={obs}
              onChange={(e) => setObs(e.target.value)}
              className="bg-c_deep_gray_black p-2 rounded w-full"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 w-[45%]">
          <div>
            <label className="block mb-1 text-slate-200 font-medium">
              Imagem (.png, .jpg, e .tiff):
            </label>
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
                className="w-96 h-96 mt-3 object-cover opacity-10"
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
      {showNotification && (
        <NotificationModal
          message={notificationMessage}
          onClose={closeNotification}
        />
      )}
    </div>
  );
}
