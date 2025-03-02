// components/DocumentonForm
"use client";

import { useState, useEffect } from "react";
import ImageUpload from "./ImageUpload";
import LoadingImage from "./LoadingImage";

// Constantes fixas para Documentos
const PROCEDIMENTO_OPTIONS = ["IPL", "BO", "TCO", "AIAI/AAI", "OUTROS"];
const TIPO_OPTIONS = ["RG", "CNH", "Procuração", "Cert. de Nascimento", "Cert. de Casamento", "Outro"];

export default function DocumentosForm({ initialData = {}, onSubmit, isUpdating = false, title }) {
  const [formData, setFormData] = useState({
    procedimento: "",
    numero: "",
    tipo: "RG", // valor padrão
    customTipo: "",
    obs: "",
    dataField: "",
    imagem: "",
  });
  const [loadingImage, setLoadingImage] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Se houver dados iniciais (para edição), atualiza o estado
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData(prev => ({
        ...prev,
        ...initialData,
        // Converte a data para o formato ISO para o input date
        dataField: initialData.data ? new Date(initialData.data).toISOString().split("T")[0] : ""
      }));
    }
  }, [initialData]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    onSubmit(formData);
  };

  return (
    <div className="min-h-screen text-white bg-c_deep_black p-1 rounded-md border border-gray-500 shadow">
      <h1 className="font-bold mt-2 mx-4">{title}</h1>
      {errorMsg && <p className="text-red-500 ml-4 mb-4">{errorMsg}</p>}
      <form onSubmit={handleSubmit} className="flex justify-between p-4 text-xs">
        {/* Coluna Esquerda: Campos do formulário */}
        <div className="flex flex-col gap-4 w-[45%]">
          {/* Procedimento e Número */}
          <div className="flex gap-4">
            <div>
              <label className="block font-medium">Procedimento:</label>
              <select
                name="procedimento"
                required
                value={formData.procedimento}
                onChange={handleInputChange}
                className="text-slate-200 bg-c_deep_gray_black p-1 rounded w-full"
              >
                <option value="">Selecione o procedimento</option>
                {PROCEDIMENTO_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium">Número / ano:</label>
              <input
                name="numero"
                required
                type="text"
                value={formData.numero}
                onChange={handleInputChange}
                className="bg-c_deep_gray_black p-1 rounded w-[300px]"
                placeholder="Apenas números e caracteres específicos"
              />
            </div>
          </div>
          {/* Tipo – Radio */}
          <div>
            <label className="block font-medium">Tipo:</label>
            <div className="flex gap-4 bg-c_deep_gray_black p-2 rounded-md">
              {TIPO_OPTIONS.map(opt => (
                <label key={opt} className="cursor-pointer">
                  <input
                    type="radio"
                    name="tipo"
                    value={opt}
                    checked={formData.tipo === opt}
                    onChange={() => {
                      handleChange("tipo", opt);
                      handleChange("customTipo", "");
                    }}
                    className="w-2.5 h-2.5 border-2 border-gray-400 rounded-full checked:bg-green-600 checked:border-green-200 transition-colors"
                  /> {opt}
                </label>
              ))}
            </div>
          </div>
          {formData.tipo === "Outro" && (
            <div className="mt-2">
              <label className="block font-medium">Especifique o tipo:</label>
              <input
                name="customTipo"
                type="text"
                value={formData.customTipo}
                onChange={handleInputChange}
                className="text-slate-200 bg-c_deep_gray_black p-1 rounded w-full border border-gray-500 shadow"
                placeholder="Informe o tipo do documento"
              />
            </div>
          )}
          {/* Observações */}
          <div>
            <label className="block font-medium">Observações:</label>
            <textarea
              name="obs"
              maxLength={380}
              rows={10}
              value={formData.obs}
              onChange={handleInputChange}
              className="bg-c_deep_gray_black p-2 rounded w-full"
            />
          </div>
          {/* Data do registro */}
          <div>
            <label className="block font-medium">Data do registro:</label>
            <input
              name="dataField"
              type="date"
              value={formData.dataField}
              onChange={handleInputChange}
              className="text-slate-200 bg-c_deep_gray_black p-1 rounded w-full"
            />
          </div>
        </div>
        {/* Coluna Direita – Upload de Imagem */}
        <div className="flex flex-col gap-4 w-[45%]">
          <div>
            <label className="block mb-1 text-slate-200 font-medium">
              Imagem (.png, .jpg, .tiff):
            </label>
            <ImageUpload
              onUpload={(url) => handleChange("imagem", url)}
              setLoading={setLoadingImage}
              uploaded={!!formData.imagem}
            />
            {loadingImage && <LoadingImage />}
            {formData.imagem ? (
              <img src={formData.imagem} alt="Imagem do registro" className="w-96 h-96 mt-3 object-cover" />
            ) : (
              <img src="/no-image.jpg" alt="Sem imagem" className="w-96 h-96 mt-3 opacity-10 object-cover" />
            )}
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 h-8 w-96 rounded hover:bg-blue-600 transition">
            {isUpdating ? "Atualizar Documento" : "Registrar Documento"}
          </button>
        </div>
      </form>
    </div>
  );
}
