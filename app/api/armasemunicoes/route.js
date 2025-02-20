// app/api/armasemunicoes/route.js
import { dbConnect } from "@/lib/dbConnect";
import ArmaMunicao from "@/models/ArmaMunicao";

// GET: Lista os registros com paginação e filtros (procedimento, número, tipo, marca, modelo, calibre)
export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = 16;
    const skip = (page - 1) * limit;

    const query = {};
    const fields = ["procedimento", "numero", "tipo", "marca", "modelo", "calibre"];
    fields.forEach((field) => {
      const value = searchParams.get(field);
      if (value) {
        query[field] = { $regex: value, $options: "i" };
      }
    });

    const records = await ArmaMunicao.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await ArmaMunicao.countDocuments(query);

    return new Response(
      JSON.stringify({ records, total, page }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Erro ao buscar registros:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao buscar registros de Armas e Munições" }),
      { status: 500 }
    );
  }
}

// POST: Cria um novo registro
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    const requiredFields = [
      "procedimento",
      "numero",
      "tipo",
      "quantidade",
      "unidMedida",
      "marca",
      "modelo",
      "calibre",
      "aspecto",
      "status",
      "createdBy",
    ];
    for (const field of requiredFields) {
      if (!body[field]) {
        return new Response(
          JSON.stringify({ error: `Campo ${field} é obrigatório` }),
          { status: 400 }
        );
      }
    }

    // Se o status for "apreendido", destino é obrigatório.
    // Se destino for "depósito", os campos secao e prateleira também devem ser informados.
    if (body.status === "apreendido") {
      if (!body.destino) {
        return new Response(
          JSON.stringify({ error: "Campo destino é obrigatório para status 'apreendido'" }),
          { status: 400 }
        );
      }
      if (body.destino === "depósito" && (!body.secao || !body.prateleira)) {
        return new Response(
          JSON.stringify({ error: "Campos seção e prateleira são obrigatórios para destino 'depósito'" }),
          { status: 400 }
        );
      }
    }


    const record = new ArmaMunicao(body);
    await record.save();
    return new Response(
      JSON.stringify({ message: "Registro criado com sucesso" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar registro:", error);
    return new Response(
      JSON.stringify({ error: "Erro interno ao criar registro" }),
      { status: 500 }
    );
  }
}
