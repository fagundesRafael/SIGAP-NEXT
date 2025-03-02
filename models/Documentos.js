// models/Documentos.js
import mongoose from "mongoose";

const DocumentosSchema = new mongoose.Schema({
  classe: { type: String },
  procedimento: { type: String, required: true },
  numero: { type: String, required: true },
  // Não há marca nem modelo
  tipo: {
    type: String,
    enum: ["RG", "CNH", "Procuração", "Cert. de Nascimento", "Cert. de Casamento", "Outro"],
    required: true,
  },
  customTipo: { type: String },
  obs: { type: String, maxlength: 80 },
  data: { type: Date, default: Date.now },
  imagem: { type: String },
  createdBy: { type: String, required: true },
  updatedBy: { type: String },
}, { timestamps: true, collection: "documentos" });

export default mongoose.models.Documentos || mongoose.model("Documentos", DocumentosSchema);
