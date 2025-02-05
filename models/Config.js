// models/Config.js
import mongoose from "mongoose";

const ConfigSchema = new mongoose.Schema({
  marcaCarro: { type: String },
  modeloCarro: { type: String },
  marcaMoto: { type: String },
  modeloMoto: { type: String },
  marcaEletroDomesticos: { type: String },
  modeloEletroDomesticos: { type: String },
  marcaEletroEletronicos: { type: String },
  marcaArma: { type: String },
  modeloArma: { type: String },
  calibreArma: { type: String },
  marcaMunicao: { type: String },
  modeloMunicao: { type: String },
  calibreMunicao: { type: String },
});

export default mongoose.models.Config || mongoose.model("Config", ConfigSchema);
