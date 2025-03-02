// ap/api/documentos/route.js
import { dbConnect } from "@/lib/dbConnect";
import Documentos from "@/models/Documentos";

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = 16;
    const skip = (page - 1) * limit;

    const query = {};
    const fields = ["procedimento", "numero", "tipo"];
    fields.forEach(field => {
      const value = searchParams.get(field);
      if (value) {
        query[field] = { $regex: value, $options: "i" };
      }
    });
    const tipo = searchParams.get("tipo");
    if (tipo) {
      query.$or = [
        { tipo: { $regex: tipo, $options: "i" } },
        { customTipo: { $regex: tipo, $options: "i" } },
      ];
    }
    const records = await Documentos.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const total = await Documentos.countDocuments(query);

    return new Response(JSON.stringify({ records, total, page }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao buscar registros:", error);
    return new Response(JSON.stringify({ error: "Erro ao buscar registros" }), { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    const requiredFields = ["procedimento", "numero", "tipo", "createdBy"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return new Response(JSON.stringify({ error: `Campo ${field} é obrigatório` }), { status: 400 });
      }
    }
    const record = new Documentos(body);
    await record.save();
    return new Response(JSON.stringify({ message: "Registro criado com sucesso" }), { status: 201 });
  } catch (error) {
    console.error("Erro ao criar registro:", error);
    return new Response(JSON.stringify({ error: "Erro interno ao criar registro" }), { status: 500 });
  }
}
