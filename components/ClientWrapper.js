// components/ClientWrapper.js
"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function ClientWrapper({ children }) {
  const pathname = usePathname();
  // Defina as rotas públicas onde Header e Footer não devem aparecer
  const publicPaths = ["/", "/login", "/signup"];
  const isPublic = publicPaths.includes(pathname);

  return (
    <>
      {/* Se não for uma rota pública, renderize o Header */}
      {!isPublic && <Header />}
      
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Se não for uma rota pública, renderize o Footer */}
      {!isPublic && <Footer />}
    </>
  );
}
