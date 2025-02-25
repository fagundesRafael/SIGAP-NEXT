// app/api/configs/route.js
import { dbConnect } from "@/lib/dbConnect";
import Config from "@/models/Config";

// GET: Retorna as configurações existentes
export async function GET() {
  try {
    await dbConnect();
    const configs = await Config.find();
    return new Response(JSON.stringify(configs), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao buscar configurações:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao buscar configurações." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// POST: Cria ou atualiza as configurações
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    // Função auxiliar para processar itens (armas, munições e outrosbélicos)
    const processarItens = (itens) => {
      return itens.map((item) => ({
        marca: item.marca,
        modelos: Array.isArray(item.modelos)
          ? item.modelos
          : item.modelos
          ? [item.modelos]
          : [],
        calibres: Array.isArray(item.calibres)
          ? item.calibres
          : item.calibres
          ? [item.calibres]
          : [],
      }));
    };

    let config = await Config.findOne();
    if (!config) {
      // Cria nova configuração, processando os arrays de armas, munições e outrosbélicos
      const novoConfig = {
        ...body,
        carros: body.carros || [],
        motos: body.motos || [],
        caminhonetes: body.caminhonetes || [],
        caminhoes: body.caminhoes || [],
        tratores: body.tratores || [],
        outrosautomotores: body.outrosautomotores || [],
        armas: body.armas ? processarItens(body.armas) : [],
        municoes: body.municoes ? processarItens(body.municoes) : [],
        outrosbelicos: body.outrosbelicos ? processarItens(body.outrosbelicos) : [],
        bicicletas: body.bicicletas || [],
        entorpecentes: body.entorpecentes || [],
        eletro: body.eletro || [],
        outros: body.outros || [],
      };
      config = new Config(novoConfig);
    } else {
      // Atualiza os campos de armas, munições e outrosbélicos garantindo arrays corretos
      if (body.armas) {
        config.armas = processarItens(body.armas);
      }
      if (body.municoes) {
        config.municoes = processarItens(body.municoes);
      }
      if (body.outrosbelicos) {
        config.outrosbelicos = processarItens(body.outrosbelicos);
      }
      // Atualiza as demais configurações
      if (body.carros) config.carros = body.carros;
      if (body.motos) config.motos = body.motos;
      if (body.caminhonetes) config.caminhonetes = body.caminhonetes;
      if (body.caminhoes) config.caminhoes = body.caminhoes;
      if (body.tratores) config.tratores = body.tratores;
      if (body.outrosautomotores) config.outrosautomotores = body.outrosautomotores;
      if (body.bicicletas) config.bicicletas = body.bicicletas;
      if (body.entorpecentes) config.entorpecentes = body.entorpecentes;
      if (body.eletro) config.eletro = body.eletro;
      if (body.outros) config.outros = body.outros;
    }

    await config.save();
    return new Response(
      JSON.stringify({ message: "Configuração salva com sucesso!" }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Erro ao salvar configuração:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao salvar configuração." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
