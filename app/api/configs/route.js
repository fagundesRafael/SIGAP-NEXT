// app/api/configs/route.js
import { dbConnect } from "@/lib/dbConnect";
import Config from "@/models/Config";

export async function GET() {
  try {
    await dbConnect();
    const configs = await Config.find();
    return new Response(JSON.stringify(configs), { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar configurações:", error);
    return new Response(JSON.stringify({ error: "Erro ao buscar configurações." }), { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    let config = await Config.findOne();
    if (!config) {
      config = new Config(body);
    } else {
      // Substitui os arrays com os dados recebidos
      if (body.carros) config.carros = body.carros;
      if (body.bicicletas) config.bicicletas = body.bicicletas;
      if (body.motos) config.motos = body.motos;
      if (body.armas) config.armas = body.armas;
      if (body.municoes) config.municoes = body.municoes;
      if (body.entorpecentes) config.entorpecentes = body.entorpecentes;
      if (body.eletro) config.eletro = body.eletro;
      if (body.outros) config.outros = body.outros;
    }

    await config.save();
    return new Response(JSON.stringify({ message: "Configuração salva com sucesso!" }), { status: 201 });
  } catch (error) {
    console.error("Erro ao salvar configuração:", error);
    return new Response(JSON.stringify({ error: "Erro ao salvar configuração." }), { status: 500 });
  }
}
