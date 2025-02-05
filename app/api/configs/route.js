// app/api/configs/route.js
import { dbConnect } from "@/lib/dbConnect";
import Config from "@/models/Config";

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    // body deve conter os campos conforme definido no modelo
    const config = new Config(body);
    await config.save();
    return new Response(
      JSON.stringify({ message: "Configuração salva com sucesso." }),
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
