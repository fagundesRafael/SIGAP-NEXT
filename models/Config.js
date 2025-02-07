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
        modelos: [
          {
            modelo: { type: String, required: true },
            calibre: { type: String, required: true },
          },
        ],
      },
    ],
    default: [],
  },
  entorpecentes: {
    type: [String],
    default: [],
  },
});

export default mongoose.models.Config || mongoose.model("Config", ConfigSchema);
