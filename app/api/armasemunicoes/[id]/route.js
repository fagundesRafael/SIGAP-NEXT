// app/api/armasemunicoes/[id]/route.js
import { dbConnect } from "@/lib/dbConnect";
import ArmaMunicao from "@/models/ArmaMunicao";

// GET: Retorna o registro com o ID informado
export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const record = await ArmaMunicao.findById(id);
    if (!record) {
      return new Response(JSON.stringify({ error: "Registro não encontrado" }), { status: 404 });
    }
    return new Response(JSON.stringify(record), { status: 200 });
  } catch (error) {
    console.error("Erro na rota GET:", error);
    return new Response(JSON.stringify({ error: "Erro ao buscar registro" }), { status: 500 });
  }
}

// PUT: Atualiza o registro com o ID informado
export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const body = await request.json();

    const updatedRecord = await ArmaMunicao.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!updatedRecord) {
      return new Response(JSON.stringify({ error: "Registro não encontrado" }), { status: 404 });
    }
    return new Response(
      JSON.stringify({ message: "Registro atualizado com sucesso", record: updatedRecord }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Erro ao atualizar registro:", error);
    return new Response(JSON.stringify({ error: "Erro interno ao atualizar registro" }), { status: 500 });
  }
}

// DELETE: Exclui o registro com o ID informado
export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const deleted = await ArmaMunicao.findByIdAndDelete(id);
    if (!deleted) {
      return new Response(JSON.stringify({ error: "Registro não encontrado" }), { status: 404 });
    }
    return new Response(
      JSON.stringify({ message: "Registro excluído com sucesso" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Erro ao excluir registro:", error);
    return new Response(JSON.stringify({ error: "Erro interno ao excluir registro" }), { status: 500 });
  }
}
