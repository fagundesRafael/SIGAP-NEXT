// app/belicos/[id]/page.js
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ImageUpload from "@/components/ImageUpload";
import LoadingImage from "@/components/LoadingImage";
import Loading from "@/components/Loading";
import NotificationModal from "@/components/NotificationModal";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";

export default function ArmaMunicaoDetalhes() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  // Estados principais
  const [procedimento, setProcedimento] = useState("");
  const [numero, setNumero] = useState("");
  const [tipo, setTipo] = useState("Arma");
  const [customTipo, setCustomTipo] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [unidMedida, setUnidMedida] = useState("");
  const [cor, setCor] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [calibre, setCalibre] = useState("");
  const [aspecto, setAspecto] = useState("Outro");
  const [status, setStatus] = useState("");
  const [destino, setDestino] = useState("");
  const [secao, setSecao] = useState("");
  const [prateleira, setPrateleira] = useState("");
  const [obs, setObs] = useState("");
  const [dataField, setDataField] = useState("");
  const [imagem, setImagem] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

  // Estado para as configurações (para popular os selects)
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

const calibresDisponiveis =
  configs && marca && configKey
    ? (configs[configKey] || []).find((item) => item.marca === marca)
        ?.calibres || []
    : [];

  // Carrega os dados do registro a partir da API
  useEffect(() => {
    async function fetchRecord() {
      try {
        const res = await fetch(`/api/belicos/${id}`);
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setProcedimento(data.procedimento || "");
          setNumero(data.numero || "");
          setTipo(data.tipo || "Arma");
          setQuantidade(data.quantidade);
          setUnidMedida(data.unidMedida || "");
          setCor(data.cor || "");
          setMarca(data.marca || "");
          setModelo(data.modelo || "");
          setCalibre(data.calibre || "");
          setAspecto(data.aspecto || "Outro");
          setStatus(data.status || "");
          setObs(data.obs || "");
          setDataField(
            data.data ? new Date(data.data).toISOString().split("T")[0] : ""
          );
          setImagem(data.imagem || "");
          // Se o status for "apreendido", atualiza os campos opcionais
          if (data.status === "apreendido") {
            setDestino(data.destino || "");
            setSecao(data.secao || "");
            setPrateleira(data.prateleira || "");
          }
          if (data.customTipo) {
            setTipo("Outro");
            setCustomTipo(data.customTipo);
          } else {
            setTipo(data.tipo || "Arma");
          }
          setIsLoadingData(false);
        } else {
          setErrorMsg("Erro ao buscar registro");
          setIsLoadingData(false);
        }
      } catch (error) {
        console.error(error);
        setErrorMsg("Erro ao buscar registro");
        setIsLoadingData(false);
      }
    }
    if (id) fetchRecord();
  }, [id]);

  const showAlert = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
  };
  const closeNotification = () => {
    setShowNotification(false);
    setNotificationMessage("");
  };

  async function handleUpdate(e) {
    e.preventDefault();
    setErrorMsg("");

    // Monta o payload com a mesma lógica do registro
    const payload = {
      procedimento,
      numero,
      tipo,
      customTipo: tipo === "Outro" ? customTipo : "",
      quantidade,
      unidMedida,
      marca,
      modelo,
      calibre,
      cor,
      aspecto,
      status,
      updatedBy: session?.user?.nome,
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
      const res = await fetch(`/api/belicos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        showAlert("Registro atualizado com sucesso!");
        setTimeout(() => {
          router.push("/belicos");
        }, 2000);
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Erro ao atualizar material bélico");
      }
    } catch (error) {
      console.error("Erro ao atualizar material bélico:", error);
      setErrorMsg("Erro ao atualizar material bélico");
    }
  }

  async function handleDelete() {
    setShowDeleteModal(true);
  }

  async function handleConfirmDelete() {
    try {
      const res = await fetch(`/api/belicos/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.push("/belicos");
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Erro ao excluir registro");
      }
    } catch (error) {
      console.error("Erro ao excluir registro:", error);
      setErrorMsg("Erro ao excluir registro");
    } finally {
      setShowDeleteModal(false);
    }
  }

  if (isLoadingData) return <Loading />;
  if (errorMsg) return <p className="p-4 text-red-500">{errorMsg}</p>;

  return (
    <div className="min-h-screen bg-c_deep_black text-white p-2 rounded-md border border-gray-500 shadow">
      <div className="flex">
        <h1 className="font-bold mt-2 mx-4">
          Detalhes e atualização de material bélico:
        </h1>
      </div>
      <form
        onSubmit={handleUpdate}
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
              <div className="flex gap-2">
                <label>
                  <input
                    type="radio"
                    name="tipo"
                    value="Arma"
                    checked={tipo === "Arma"}
                    onChange={() => setTipo("Arma")}
                    className="w-2.5 h-2.5 appearance-none border-2 border-gray-400 rounded-full checked:bg-green-600 checked:border-green-200 transition-colors cursor-pointer"
                  />{" "}
                  Arma
                </label>
                <label>
                  <input
                    type="radio"
                    name="tipo"
                    value="Munição"
                    checked={tipo === "Munição"}
                    onChange={() => setTipo("Munição")}
                    className="w-2.5 h-2.5 border-2 border-gray-400 rounded-full checked:bg-green-600 checked:border-green-200 transition-colors cursor-pointer"
                  />{" "}
                  Munição
                </label>
              </div>
            </div>

            <div>
              <label className="block font-medium">Quantidade:</label>
              <input
                type="number"
                step={0.1}
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
          </div>
          <div className="flex justify-between">
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
                {calibresDisponiveis.map((c, idx) => (
                  <option key={idx} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {tipo !== "Arma" && (
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
                      className="w-2.5 h-2.5 appearance-none border-2 border-gray-400 rounded-full checked:bg-green-600 checked:border-green-200 transition-colors cursor-pointer"
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
              rows={12}
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
              uploaded={!!imagem}
            />
            {loadingImage && <LoadingImage />}
            {imagem ? (
              <img
                src={imagem}
                alt="Imagem do registro"
                className="w-96 h-96 mt-3 object-cover"
              />
            ) : (
              <img
                src="/no-image.jpg"
                alt="Sem imagem"
                className="w-96 h-96 mt-3 opacity-10 object-cover"
              />
            )}
          </div>
          {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 h-8 w-96 rounded hover:bg-blue-600 transition"
          >
            Atualizar material bélico
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white py-2 px-4 h-8 w-96 rounded hover:bg-red-600 transition"
          >
            Excluir material bélico
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-500 text-white py-2 px-4 h-8 w-96 rounded hover:bg-gray-600 transition-colors"
          >
            Cancelar e Voltar
          </button>
        </div>
      </form>
      {showNotification && (
        <NotificationModal
          message={notificationMessage}
          onClose={closeNotification}
        />
      )}
      {showDeleteModal && (
        <ConfirmDeleteModal
          message="Deseja realmente excluir este registro permanentemente?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}
