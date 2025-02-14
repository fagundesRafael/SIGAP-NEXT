// app/api/carrosemotos/[id]/route.js
import { dbConnect } from "@/lib/dbConnect";
import Veiculo from "@/models/Veiculo";

// GET: Retorna o veículo com o ID informado
export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const veiculo = await Veiculo.findById(id);
    if (!veiculo) {
      return new Response(JSON.stringify({ error: "Veículo não encontrado" }), { status: 404 });
    }
    return new Response(JSON.stringify(veiculo), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao buscar veículo:", error);
    return new Response(JSON.stringify({ error: "Erro ao buscar veículo" }), { status: 500 });
  }
}

// PUT: Atualiza o veículo com o ID informado
export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const body = await request.json();

    // Remover "placa" e "chassi" se vazios
    if (!body.placa || body.placa.trim() === "") delete body.placa;
    if (!body.chassi || body.chassi.trim() === "") delete body.chassi;
    if (body.placa) {
      body.placa = body.placa.trim().toUpperCase();
    }
    if (body.chassi) {
      body.chassi = body.chassi.trim().toUpperCase();
    }

    // É possível adicionar validações de duplicidade aqui, se necessário

    const updatedVehicle = await Veiculo.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!updatedVehicle) {
      return new Response(JSON.stringify({ error: "Veículo não encontrado" }), { status: 404 });
    }
    return new Response(JSON.stringify({ message: "Veículo atualizado com sucesso", vehicle: updatedVehicle }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao atualizar veículo:", error);
    return new Response(JSON.stringify({ error: "Erro interno ao atualizar veículo" }), { status: 500 });
  }
}

// DELETE: Exclui o veículo com o ID informado
export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const deleted = await Veiculo.findByIdAndDelete(id);
    if (!deleted) {
      return new Response(JSON.stringify({ error: "Veículo não encontrado" }), { status: 404 });
    }
    return new Response(JSON.stringify({ message: "Veículo excluído com sucesso" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao excluir veículo:", error);
    return new Response(JSON.stringify({ error: "Erro interno ao excluir veículo" }), { status: 500 });
  }
}