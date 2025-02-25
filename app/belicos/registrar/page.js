// app/belicos/registrar/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ImageUpload from "@/components/ImageUpload";
import LoadingImage from "@/components/LoadingImage";
import NotificationModal from "@/components/NotificationModal";

export default function RegistrarArmaMunicao() {
  const router = useRouter();
  const { data: session } = useSession();

  // Estados do formulário
  const [procedimento, setProcedimento] = useState("");
  const [numero, setNumero] = useState("");
  const [tipo, setTipo] = useState("Arma");
  const [customTipo, setCustomTipo] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [unidMedida, setUnidMedida] = useState("unid");
  const [cor, setCor] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [calibre, setCalibre] = useState("");
  const [aspecto, setAspecto] = useState("outro");
  const [status, setStatus] = useState("");
  const [destino, setDestino] = useState("");
  const [secao, setSecao] = useState("");
  const [prateleira, setPrateleira] = useState("");
  const [obs, setObs] = useState("");
  const [dataField, setDataField] = useState("");
  const [imagem, setImagem] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const procedimentoOptions = ["IPL", "BO", "TCO", "AIAI/AAI", "OUTROS"];
  const statusOptions = ["apreendido", "restituído", "incinerado", "outros"];
  const destinoOptions = ["cartório", "depósito", "outros"];
  const aspectoOptions = ["Deflagrado", "Intacto", "Outro"];
  const cores = [
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

  const [configs, setConfigs] = useState(null);
  useEffect(() => {
    async function fetchConfigs() {
      try {
        const res = await fetch("/api/configs");
        if (res.ok) {
          const data = await res.json();
          setConfigs(data[0]);
        }
      } catch (error) {
        console.error("Erro ao buscar configs:", error);
      }
    }
    fetchConfigs();
  }, []);

  const typeMapping = {
    Arma: "armas",
    Munição: "municoes",
    Outro: "outrosbelicos",
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

  const [calibresDisponiveis, setCalibresDisponiveis] = useState([]);

  useEffect(() => {
    if (configs && configKey && marca) {
      const item = (configs[configKey] || []).find(
        (item) => item.marca === marca
      );

      if (item && item.calibres) {
        setCalibresDisponiveis(item.calibres);
      } else {
        setCalibresDisponiveis([]); // Define como array vazio se não houver calibres
      }
    } else {
      setCalibresDisponiveis([]); // Define como array vazio se configs, configKey ou marca não estiverem definidos
    }
  }, [configs, configKey, marca]);

  const showAlert = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
  };
  const closeNotification = () => {
    setShowNotification(false);
    setNotificationMessage("");
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    const payload = {
      classe: "belico",
      procedimento,
      numero,
      tipo,
      customTipo: tipo === "Outro" ? customTipo : "", // Incluir customTipo
      quantidade,
      unidMedida,
      cor,
      marca,
      modelo,
      calibre,
      aspecto,
      status,
      createdBy: session?.user?.nome,
      obs,
      data: dataField || new Date(),
      imagem,
    };

    if (tipo === "Arma") {
      payload.aspecto = "Outro";
    }

    if (status === "restituído" || status === "incinerado") {
      payload.destino = "outros";
      payload.secao = "";
      payload.prateleira = "";
    }

    if (status === "apreendido") {
      payload.destino = destino;
      if (destino === "depósito") {
        payload.secao = secao;
        payload.prateleira = prateleira;
      } else {
        payload.secao = "";
        payload.prateleira = "";
      }
    }

    try {
      const res = await fetch("/api/belicos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        showAlert("Registro criado com sucesso!");
        setTimeout(() => {
          router.push("/belicos");
        }, 2000);
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Erro ao criar registro");
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      setErrorMsg("Erro ao enviar formulário");
    }
  }

  return (
    <div className="min-h-screen text-white bg-c_deep_black p-1 rounded-md border border-gray-500 shadow">
      <h1 className="font-bold mt-2 mx-4">Inserir Novo material bélico:</h1>
      {errorMsg && <p className="text-red-500 ml-4 mb-4">{errorMsg}</p>}
      <form
        onSubmit={handleSubmit}
        className="flex justify-between p-4 text-xs"
      >
        <div className="flex flex-col gap-4 w-[45%]">
          <div className="flex justify-between">
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
          <div className="flex justify-between">
            <div>
              <label className="block font-medium">Tipo:</label>
              <div className="flex flex-wrap text-center gap-4 bg-c_deep_gray_black p-2 rounded-md">
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="tipo"
                    value="Arma"
                    checked={tipo === "Arma"}
                    onChange={() => {
                      setTipo("Arma");
                      setCustomTipo("");
                    }}
                    className="w-2.5 h-2.5 cursor-pointer appearance-none border-2 border-gray-400 rounded-full checked:bg-green-600 checked:border-green-200 transition-colors"
                  />{" "}
                  Arma
                </label>
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="tipo"
                    value="Munição"
                    checked={tipo === "Munição"}
                    onChange={() => {
                      setTipo("Munição");
                      setCustomTipo("");
                    }}
                    className="w-2.5 h-2.5 cursor-pointer appearance-none border-2 border-gray-400 rounded-full checked:bg-green-600 checked:border-green-200 transition-colors"
                  />{" "}
                  Munição
                </label>
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="tipo"
                    value="Outro"
                    checked={tipo === "Outro"}
                    onChange={() => setTipo("Outro")}
                    className="w-2.5 h-2.5 cursor-pointer appearance-none border-2 border-gray-400 rounded-full checked:bg-green-600 checked:border-green-200 transition-colors"
                  />{" "}
                  Outros componentes e/ou insumos bélicos
                </label>
              </div>
            </div>
          </div>
          {/* Adicionar input para tipo customizado */}
          {tipo === "Outro" && (
            <div className="mt-2">
              <label className="block font-medium">Especifique o tipo:</label>
              <input
                type="text"
                value={customTipo}
                onChange={(e) => setCustomTipo(e.target.value)}
                className="text-slate-200 bg-c_deep_gray_black p-1 rounded w-full border border-gray-500 shadow"
                placeholder="Informe o tipo do material bélico"
              />
            </div>
          )}

          <div className="flex flex-wrap gap-4 justify-between">
            <div>
              <label className="block font-medium">Quantidade:</label>
              <input
                type="number"
                required
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                placeholder="Informe quantidade"
                className="bg-c_deep_gray_black p-1 w-28 rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Unid. de Medida:</label>
              <select
                required
                id="medida"
                name="medida"
                value={unidMedida}
                onChange={(e) => setUnidMedida(e.target.value)}
                className="bg-c_deep_gray_black p-1 rounded"
              >
                <option value="unid">unidade(s)</option>
                <option value="mm">milímetro(s)</option>
                <option value="cm">centímetro(s)</option>
                <option value="mt">metro(s)</option>
                <option value="mlgr">miligrama(s)</option>
                <option value="gr">grama(s)</option>
                <option value="kg">kilo(s)</option>
                <option value="outro">outro(s)</option>
              </select>
            </div>
            <div>
              <label className="block font-medium">Cor:</label>
              <select
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
            <div>
              <label className="block font-medium">Marca:</label>
              <select
                required
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
                required
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
              <label className="block font-medium">Calibre:</label>
              <select
                required
                value={calibre}
                onChange={(e) => setCalibre(e.target.value)}
                className="text-slate-200 bg-c_deep_gray_black p-1 rounded w-full"
              >
                <option value="">Selecione o calibre</option>
                {calibresDisponiveis.map(
                  (
                    c,
                    idx // Usa calibresDisponiveis aqui
                  ) => (
                    <option key={idx} value={c}>
                      {c}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          {tipo !== "arma" && (
            <div>
              <label className="block font-medium">Aspecto:</label>
              <div className="flex gap-2">
                {aspectoOptions.map((opt) => (
                  <label key={opt}>
                    <input
                      type="radio"
                      name="aspecto"
                      value={opt}
                      checked={aspecto === opt}
                      onChange={() => setAspecto(opt)}
                      className="w-2.5 h-2.5 border-2 border-gray-400 rounded-full checked:bg-green-600 checked:border-green-200 transition-colors cursor-pointer"
                    />{" "}
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          )}
          <div className="flex justify-between">
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
            <div>
              <label className="block font-medium">Data do registro:</label>
              <input
                type="date"
                value={dataField}
                onChange={(e) => setDataField(e.target.value)}
                className=" text-slate-200 bg-c_deep_gray_black p-1 rounded w-full"
              />
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
              {destino === "depósito" && (
                <div className="flex gap-4 mt-2">
                  <input
                    type="text"
                    placeholder="Seção"
                    value={secao}
                    onChange={(e) => setSecao(e.target.value)}
                    className="text-slate-200 bg-c_deep_gray_black p-1 rounded w-full"
                  />
                  <input
                    type="text"
                    placeholder="Prateleira"
                    value={prateleira}
                    onChange={(e) => setPrateleira(e.target.value)}
                    className="text-slate-200 bg-c_deep_gray_black p-1 rounded w-full"
                  />
                </div>
              )}
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
              Imagem (.png, .jpg, .tiff):
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
            className="bg-blue-500 text-white py-2 px-4 h-8 w-96 rounded hover:bg-blue-600 transition"
          >
            Registrar arma(s) e/ou munição(ões)
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
