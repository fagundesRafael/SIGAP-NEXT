// models/ArmaMunicao.js
import mongoose from "mongoose";

const ArmaMunicaoSchema = new mongoose.Schema(
  {
    procedimento: { type: String, required: true },
    numero: { type: String, required: true },
    tipo: { type: String, enum: ["Arma", "Munição"], required: true },
    quantidade: { type: Number, required: true},
    unidMedida: { type: String, required: true},
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    calibre: { type: String, required: true },
    cor: { type: String },
    aspecto: {
      type: String,
      enum: ["Deflagrado", "Intacto", "Outro"],
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["apreendido", "restituído", "incinerado", "outros"],
    },
    // Campo opcional: somente preenchido se status === "apreendido"
    destino: {
      type: String,
      enum: ["cartório", "depósito", "outros"],
      default: undefined,
    },
    // Se destino for "depósito", os campos abaixo devem ser preenchidos:
    secao: { type: String },
    prateleira: { type: String },
    createdBy: { type: String, required: true },
    updatedBy: { type: String },
    obs: { type: String, maxlength: 80 },
    data: { type: Date, default: Date.now },
    imagem: { type: String },
  },
  { timestamps: true }
);

// Evita redefinição do model durante hot-reload
export default mongoose.models.ArmaMunicao ||
  mongoose.model("ArmaMunicao", ArmaMunicaoSchema);
