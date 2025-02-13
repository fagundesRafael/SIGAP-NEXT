// app/login/page.js
"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setErrorMsg(""); 

    const result = await signIn("credentials", {
      redirect: false, 
      email,
      password,
      callbackUrl: "/sistem",
    });

    if (result?.error) {
      setLoading(false);
      setErrorMsg("Email ou senha inválidos.");
    } else {
      setLoading(false);
      router.push(result.url || "/sistem");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      {loading && <Loading />}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col gap-4 border p-6 rounded shadow"
      >
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
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Entrar
        </button>
      </form>
      <p className="mt-4">
        Não possui conta?{" "}
        <Link href="/signup" className="text-blue-500 hover:underline">
          Criar conta
        </Link>
      </p>
    </div>
  );
}
