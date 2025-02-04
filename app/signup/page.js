// app/signup/page.js
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    // Limpar mensagem de erro anterior
    setErrorMsg("");

    // Enviar os dados para a rota API
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, password }),
    });

    if (res.ok) {
      // Se o usuário foi criado com sucesso, redireciona para a página de login
      alert("Usuário criado com sucesso! Redirecionando para a página de login.");
      router.push("/login");
    } else {
      // Se ocorreu algum erro, mostra a mensagem
      const data = await res.json();
      setErrorMsg(data.error || "Erro ao criar usuário.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-6">Criar Conta</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col gap-4 border p-6 rounded shadow"
      >
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        {errorMsg && (
          <p className="text-red-500 text-sm">
            {errorMsg}
          </p>
        )}
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
        >
          Criar Conta
        </button>
      </form>
      <p className="mt-4">
        Já possui conta?{" "}
        <Link href="/login" className="text-blue-500 hover:underline">
          Fazer Login
        </Link>
      </p>
    </div>
  );
}
