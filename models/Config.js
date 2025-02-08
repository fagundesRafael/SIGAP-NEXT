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
  bicicletas: {
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
  armas: {
    type: [
      {
        marca: { type: String, required: true },
        modelos: {
          type: [
            {
              modelo: { type: String, required: true },
              calibre: { type: String, required: true },
            },
          ],
          default: [],
        },
      },
    ],
    default: [],
  },
  municoes: {
    type: [
      {
        marca: { type: String, required: true },
        modelos: {
          type: [
            {
              modelo: { type: String, required: true },
              calibre: { type: String, required: true },
            },
          ],
          default: [],
        },
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

// Evita redefinição do modelo durante o hot-reload
export default mongoose.models.Config || mongoose.model("Config", ConfigSchema);
