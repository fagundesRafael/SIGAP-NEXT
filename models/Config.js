// models/Config.js
import mongoose from "mongoose";

const ConfigSchema = new mongoose.Schema({
  carros: {
    type: [
      {
        marca: { type: String, required: true },
        modelos: { type: [String], default: [] },
      },
    ],
    default: [],
  },
  motos: {
    type: [
      {
        marca: { type: String, required: true },
        modelos: { type: [String], default: [] },
      },
    ],
    default: [],
  },
  caminhonetes: {
    type: [
      {
        marca: { type: String, required: true },
        modelos: { type: [String], default: [] },
      },
    ],
    default: [],
  },
  caminhoes: {
    type: [
      {
        marca: { type: String, required: true },
        modelos: { type: [String], default: [] },
      },
    ],
    default: [],
  },
  tratores: {
    type: [
      {
        marca: { type: String, required: true },
        modelos: { type: [String], default: [] },
      },
    ],
    default: [],
  },
  outrosautomotores: {
    type: [
      {
        marca: { type: String, required: true },
        modelos: { type: [String], default: [] },
      },
    ],
    default: [],
  },
  bicicletas: {
    type: [
      {
        marca: { type: String, required: true },
        modelos: { type: [String], default: [] },
      },
    ],
    default: [],
  },
  outronaomotorizado: {
    type: [
      {
        marca: { type: String, required: true },
        modelos: { type: [String], default: [] },
      },
    ],
    default: [],
  },
  armas: {
    // Agora, cada objeto possui arrays separados para modelos e calibres
    type: [
      {
        marca: { type: String, required: true },
        modelos: { type: [String], default: [] },
        calibres: { type: [String], default: [] },
      },
    ],
    default: [],
  },
  municoes: {
    // Estrutura similar para munições
    type: [
      {
        marca: { type: String, required: true },
        modelos: { type: [String], default: [] },
        calibres: { type: [String], default: [] },
      },
    ],
    default: [],
  },
  outrosbelicos: {
    type: [
      {
        marca: { type: String, required: true },
        modelos: { type: [String], default: [] },
        calibres: { type: [String], default: [] },
      },
    ],
    default: [],
  },
  entorpecentes: {
    type: [String],
    default: [],
  },
  eletro: {
    type: [String],
    default: [],
  },
  outros: {
    type: [String],
    default: [],
  },
}, { timestamps: true });

export default mongoose.models.Config || mongoose.model("Config", ConfigSchema);
