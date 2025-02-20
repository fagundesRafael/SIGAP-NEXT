// app/carrosemotos/[id]/page.js
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ImageUpload from "@/components/ImageUpload";
import LoadingImage from "@/components/LoadingImage";
import Loading from "@/components/Loading";
import NotificationModal from "@/components/NotificationModal";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";

export default function VeiculoDetalhes() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  // Estados para os campos do veículo
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
  const [obs, setObs] = useState("");
  const [dataField, setDataField] = useState("");
  const [imagem, setImagem] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

  // Configurações para selects de marca/modelo
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
    carro: "carros",
    moto: "motos",
    caminhonete: "caminhonetes",
    caminhao: "caminhoes",
    trator: "tratores",
    outroautomotor: "outroautomotor",
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
  // Buscar os dados do veículo pelo ID
  useEffect(() => {
    async function fetchVehicle() {
      try {
        const res = await fetch(`/api/carrosemotos/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProcedimento(data.procedimento || "");
          setNumero(data.numero || "");
          setTipo(data.tipo || "carro");
          setMarca(data.marca || "");
          setModelo(data.modelo || "");
          setPlaca(data.placa || "");
          setChassi(data.chassi || "");
          setCor(data.cor || "");
          setChaves(data.chaves || false);
          setStatus(data.status || "");
          setDestino(data.destino || "");
          setObs(data.obs || "");
          setDataField(
            data.data ? new Date(data.data).toISOString().split("T")[0] : ""
          );
          setImagem(data.imagem || "");
          setIsLoadingData(false);
        } else {
          setErrorMsg("Erro ao buscar veículo");
          setIsLoadingData(false);
        }
      } catch (error) {
        console.error(error);
        setErrorMsg("Erro ao buscar veículo");
        setIsLoadingData(false);
      }
    }
    if (id) fetchVehicle();
  }, [id]);

  // Função para mostrar notificação (mantida para outras ações, se necessário)
  const showAlert = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
  };

  // Função para fechar notificação
  const closeNotification = () => {
    setShowNotification(false);
    setNotificationMessage("");
  };

  async function handleUpdate(e) {
    e.preventDefault();
    setErrorMsg("");

    // Monta o payload de atualização; updatedBy recebe o nome do usuário logado
    const payload = {
      procedimento,
      numero,
      marca,
      modelo,
      placa,
      chassi,
      tipo,
      cor,
      chaves,
      status,
      updatedBy: session?.user?.nome,
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
      const res = await fetch(`/api/carrosemotos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        showAlert("Veículo atualizado com sucesso!");
        setTimeout(() => {
          router.push("/carrosemotos");
        }, 2000);
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Erro ao atualizar veículo");
      }
    } catch (error) {
      console.error("Erro ao atualizar veículo:", error);
      setErrorMsg("Erro ao atualizar veículo");
    }
  }

  // Abre o modal de confirmação ao clicar em "Excluir Veículo"
  async function handleDelete() {
    setShowDeleteModal(true);
  }

  // Executa a exclusão somente se o usuário confirmar no modal
  async function handleConfirmDelete() {
    try {
      const res = await fetch(`/api/carrosemotos/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // Redireciona imediatamente após a exclusão confirmada
        router.push("/carrosemotos");
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Erro ao excluir veículo");
      }
    } catch (error) {
      console.error("Erro ao excluir veículo:", error);
      setErrorMsg("Erro ao excluir veículo");
    } finally {
      setShowDeleteModal(false); // Fecha o modal, independentemente do resultado
    }
  }

  if (isLoadingData) return <Loading />;
  if (errorMsg) return <p className="p-4 text-red-500">{errorMsg}</p>;

  return (
    <div className="min-h-screen bg-c_deep_black text-white p-2 rounded-md border border-gray-500 shadow">
      <div className="flex">
        <h1 className="font-bold mt-2 mx-4">
          Detalhes e Atualização do Veículo:
        </h1>
      </div>
      <form
        onSubmit={handleUpdate}
        className="flex justify-between p-4 text-xs"
      >
        {/* Coluna Esquerda com os campos do formulário */}
        <div className="flex flex-col gap-4 w-[45%]">
          {/* Procedimento como SELECT */}
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

          <div>
            <label className="block font-medium">Tipo:</label>
            <div className="flex flex-wrap text-center gap-4 bg-c_deep_gray_black p-2 rounded-sm ">
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="tipo"
                  value="carro"
                  checked={tipo === "carro"}
                  onChange={() => setTipo("carro")}
                  className="w-2.5 h-2.5 
                  appearance-none 
                  border-2 
                  border-gray-400 
                  rounded-full 
                  checked:bg-green-600
                  checked:border-green-200
                  transition-colors
                  "
                />{" "}
                Carro
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="tipo"
                  value="moto"
                  checked={tipo === "moto"}
                  onChange={() => setTipo("moto")}
                  className="w-2.5 h-2.5 
                  appearance-none 
                  border-2 
                  border-gray-400 
                  rounded-full 
                  checked:bg-green-600
                  checked:border-green-200
                  transition-colors
                  "
                />{" "}
                Moto
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="tipo"
                  value="caminhonete"
                  checked={tipo === "caminhonete"}
                  onChange={() => setTipo("caminhonete")}
                  className="w-2.5 h-2.5 
                  appearance-none 
                  border-2 
                  border-gray-400 
                  rounded-full 
                  checked:bg-green-600
                  checked:border-green-200
                  transition-colors
                  "
                />{" "}
                Caminhonete
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="tipo"
                  value="caminhao"
                  checked={tipo === "caminhao"}
                  onChange={() => setTipo("caminhao")}
                  className="w-2.5 h-2.5 
                  appearance-none 
                  border-2 
                  border-gray-400 
                  rounded-full 
                  checked:bg-green-600
                  checked:border-green-200
                  transition-colors
                  "
                />{" "}
                Caminhão
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="tipo"
                  value="trator"
                  checked={tipo === "trator"}
                  onChange={() => setTipo("trator")}
                  className="w-2.5 h-2.5 
                  appearance-none 
                  border-2 
                  border-gray-400 
                  rounded-full 
                  checked:bg-green-600
                  checked:border-green-200
                  transition-colors
                  "
                />{" "}
                Trator
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="tipo"
                  value="outroautomotor"
                  checked={tipo === "outroautomotor"}
                  onChange={() => setTipo("outroautomotor")}
                  className="w-2.5 h-2.5 
                  appearance-none 
                  border-2 
                  border-gray-400 
                  rounded-full 
                  checked:bg-green-600
                  checked:border-green-200
                  transition-colors
                  "
                />{" "}
                Outro Veículo
              </label>
            </div>
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
                  className="w-2.5 h-2.5 appearance-none border-2 border-gray-400 rounded-full checked:bg-green-600 checked:border-green-200 transition-colors cursor-pointer "
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
                  className="w-2.5 h-2.5 appearance-none border-2 border-gray-400 rounded-full checked:bg-green-600 checked:border-green-200 transition-colors cursor-pointer "
                />{" "}
                Não
              </label>
            </div>
          </div>

          <div>
            <label className="block font-medium">Status:</label>
            <div className="flex gap-2">
              {statusOptions.map((opt) => (
                <label className="cursor-pointer" key={opt}>
                  <input
                    required
                    type="radio"
                    name="status"
                    value={opt}
                    checked={status === opt}
                    onChange={() => setStatus(opt)}
                    className="w-2.5 h-2.5 appearance-none border-2 border-gray-400 rounded-full checked:bg-green-600 checked:border-green-200 transition-colors cursor-pointer "
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
                  <label className="cursor-pointer" key={opt}>
                    <input
                      type="radio"
                      name="destino"
                      value={opt}
                      checked={destino === opt}
                      onChange={() => setDestino(opt)}
                      className="w-2.5 h-2.5 appearance-none border-2 border-gray-400 rounded-full checked:bg-green-600 checked:border-green-200 transition-colors cursor-pointer "
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
              rows={12}
              value={obs}
              onChange={(e) => setObs(e.target.value)}
              className="bg-c_deep_gray_black p-2 rounded w-full"
            />
          </div>
        </div>

        {/* Coluna Direita com imagem e botões */}
        <div className="flex flex-col gap-4 w-[45%]">
          <div>
            <label className="block font-medium">Imagem:</label>
            <ImageUpload
              onUpload={(url) => setImagem(url)}
              setLoading={setLoadingImage}
              uploaded={!!imagem}
            />
            {loadingImage && <LoadingImage />}
            {imagem ? (
              <img
                src={imagem}
                alt="Imagem do veículo"
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
            className="bg-blue-500 text-white py-2 px-4 h-8 w-96 rounded hover:bg-blue-600 transform transition"
          >
            Atualizar Veículo
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white py-2 px-4 h-8 w-96 rounded hover:bg-red-600 transform transition"
          >
            Excluir Veículo
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
          message="Deseja realmente excluir este veículo permanentemente?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}
