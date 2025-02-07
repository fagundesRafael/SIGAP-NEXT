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
    return new Response(
      JSON.stringify({ error: "Erro ao buscar configurações." }),
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    // Tenta buscar o documento de configuração; se não existir, cria um novo.
    let config = await Config.findOne();
    if (!config) {
      // Se não existir, cria um novo documento com os dados recebidos.
      config = new Config(body);
    } else {
      // Atualiza (sobrescreve) cada campo com os dados enviados pelo front end.
      if (body.carros) config.carros = body.carros;
      if (body.bicicletas) config.bicicletas = body.bicicletas;
      if (body.motos) config.motos = body.motos;
      if (body.armas) config.armas = body.armas;
      if (body.entorpecentes) config.entorpecentes = body.entorpecentes;
    }

    await config.save();
    return new Response(
      JSON.stringify({ message: "Configuração salva com sucesso!" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao salvar configuração:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao salvar configuração." }),
      { status: 500 }
    );
  }
}
