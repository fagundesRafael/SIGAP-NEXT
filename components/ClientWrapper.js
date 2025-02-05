//components/ClientWrapper.js
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import Header from "./Header";
import Footer from "./Footer";

export default function ClientWrapper({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const publicPaths = ["/", "/login", "/signup"];
  const isPublic = publicPaths.includes(pathname);

  const [loading, setLoading] = useState(true);
  const [sessionExists, setSessionExists] = useState(false);

  useEffect(() => {
    if (isPublic) {
      setLoading(false);
      return;
    }

    async function checkSession() {
      setLoading(true);
      const session = await getSession();
      console.log("Sessão recebida:", session);

      if (!session || !session.user) {
        router.push("/login");
      } else {
        setSessionExists(true);
      }
      
      setLoading(false);
    }

    checkSession();
  }, [isPublic, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Carregando...
      </div>
    );
  }

  return (
    <>
      {!isPublic && <Header />}
      <main className="flex-grow">{children}</main>
      {!isPublic && <Footer />}
    </>
  );
}
