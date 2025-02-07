// app/api/configs/route.js
import { dbConnect } from "@/lib/dbConnect";
import Config from "@/models/Config";

// GET: Busca as configurações salvas
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

// POST: Adiciona/atualiza as configurações
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    // Tenta buscar o documento de configuração; se não existir, cria um novo.
    let config = await Config.findOne();
    if (!config) {
      config = new Config();
    }

    // Atualiza a seção "carros"
    if (body.carros) {
      // Garante que o array esteja inicializado
      if (!config.carros) config.carros = [];
      body.carros.forEach((novoCarro) => {
        const marcaExistente = config.carros.find(
          (carro) => carro.marca === novoCarro.marca
        );
        if (marcaExistente) {
          // Garante que o array de modelos esteja definido
          if (!marcaExistente.modelos) {
            marcaExistente.modelos = [];
          }
          novoCarro.modelos.forEach((modelo) => {
            if (!marcaExistente.modelos.includes(modelo)) {
              marcaExistente.modelos.push(modelo);
            }
          });
        } else {
          // Insere uma nova marca com seus modelos
          config.carros.push(novoCarro);
        }
      });
    }

    // (Opcional) Repita a lógica para as outras seções: bicicletas, motos, armas, entorpecentes
    if (body.bicicletas) {
      if (!config.bicicletas) config.bicicletas = [];
      body.bicicletas.forEach((novoItem) => {
        const marcaExistente = config.bicicletas.find(
          (item) => item.marca === novoItem.marca
        );
        if (marcaExistente) {
          novoItem.modelos.forEach((modelo) => {
            if (!marcaExistente.modelos.includes(modelo)) {
              marcaExistente.modelos.push(modelo);
            }
          });
        } else {
          config.bicicletas.push(novoItem);
        }
      });
    }

    if (body.motos) {
      if (!config.motos) config.motos = [];
      body.motos.forEach((novoItem) => {
        const marcaExistente = config.motos.find(
          (item) => item.marca === novoItem.marca
        );
        if (marcaExistente) {
          novoItem.modelos.forEach((modelo) => {
            if (!marcaExistente.modelos.includes(modelo)) {
              marcaExistente.modelos.push(modelo);
            }
          });
        } else {
          config.motos.push(novoItem);
        }
      });
    }

    if (body.armas) {
      if (!config.armas) config.armas = [];
      body.armas.forEach((novoItem) => {
        const marcaExistente = config.armas.find(
          (item) => item.marca === novoItem.marca
        );
        if (marcaExistente) {
          novoItem.modelos.forEach((modeloObj) => {
            // Cada modeloObj deve ter { modelo, calibre }
            if (
              !marcaExistente.modelos.find(
                (m) =>
                  m.modelo === modeloObj.modelo &&
                  m.calibre === modeloObj.calibre
              )
            ) {
              marcaExistente.modelos.push(modeloObj);
            }
          });
        } else {
          config.armas.push(novoItem);
        }
      });
    }

    if (body.entorpecentes) {
      config.entorpecentes = body.entorpecentes;
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
