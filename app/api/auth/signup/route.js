// app/api/auth/signup/route.js
import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/User";
import { hash } from "bcryptjs";

export async function POST(request) {
  try {
    // Conectar ao banco de dados
    await dbConnect();

    // Obter os dados enviados na requisição
    const body = await request.json();
    const { nome, email, password } = body;

    // Validar se os campos foram informados
    if (!nome || !email || !password) {
      return new Response(
        JSON.stringify({ error: "Campos obrigatórios não informados." }),
        { status: 400 }
      );
    }

    // Verificar se já existe um usuário com este e-mail
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "Usuário com email já existe." }),
        { status: 400 }
      );
    }

    // Gerar o hash da senha
    const hashedPassword = await hash(password, 10);

    // Criar o novo usuário (o campo is_admin terá valor padrão false)
    const user = new User({
      nome,
      email,
      password: hashedPassword,
    });

    // Salvar o usuário no banco de dados
    await user.save();

    return new Response(
      JSON.stringify({ message: "Usuário criado com sucesso." }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro no cadastro:", error);
    return new Response(
      JSON.stringify({ error: "Erro interno ao criar usuário." }),
      { status: 500 }
    );
  }
}
