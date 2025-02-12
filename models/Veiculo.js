// models/Veiculo.js
import mongoose from "mongoose";

const VeiculoSchema = new mongoose.Schema(
  {
    procedimento: { type: String, required: true },
    numero: { type: String, required: true },
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    placa: {
      type: String,
      required: false,
      unique: true,
      sparse: true,
      // Se houver valor e não for apenas espaços, transforma em maiúsculas; caso contrário, retorna undefined
      set: v => (v && v.trim() !== "" ? v.trim().toUpperCase() : undefined)
    },
    chassi: {
      type: String,
      required: false,
      unique: true,
      sparse: true,
      set: v => (v && v.trim() !== "" ? v.trim().toUpperCase() : undefined)
    },
    tipo: { type: String, enum: ["carro", "moto"], required: true },
    cor: { type: String, required: false },
    chaves: { type: Boolean, default: false },
    status: {
      type: String,
      required: true,
      enum: ["apreendido", "restituído", "incinerado", "outros"],
    },
    // Campo opcional: somente preenchido se status === "apreendido"
    destino: {
      type: String,
      enum: ["pátio", "cartório", "depósito", "outros"],
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

// Índices parciais: aplica a restrição única somente quando os campos existem e não são nulos
VeiculoSchema.index(
  { placa: 1 },
  { unique: true, partialFilterExpression: { placa: { $exists: true, $ne: null } } }
);
VeiculoSchema.index(
  { chassi: 1 },
  { unique: true, partialFilterExpression: { chassi: { $exists: true, $ne: null } } }
);

// Evita redefinir o model durante o hot-reload
export default mongoose.models.Veiculo || mongoose.model("Veiculo", VeiculoSchema);
