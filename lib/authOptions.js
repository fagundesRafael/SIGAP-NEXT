// lib/authOptions.js
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import User from "../models/User";
import { dbConnect } from "./dbConnect";

export const authOptions = {
  // Definição dos provedores de autenticação
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "seuemail@exemplo.com" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        // Conecta ao banco de dados
        await dbConnect();

        // Procura pelo usuário no banco de dados
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("Usuário não encontrado");
        }

        // Compara a senha fornecida com o hash armazenado
        const isValid = await compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Senha incorreta");
        }

        // Se tudo estiver correto, retorna os dados do usuário
        return {
          id: user._id.toString(),
          nome: user.nome,
          email: user.email,
          is_admin: user.is_admin,
        };
      },
    }),
  ],
  // Configuração da sessão usando JWT
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login", // Redireciona para a página de login
  },
  callbacks: {
    async jwt({ token, user }) {
      // Ao fazer login, adiciona os dados do usuário ao token
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      // Adiciona os dados do token à sessão
      session.user = token.user;
      return session;
    },
  },
};
