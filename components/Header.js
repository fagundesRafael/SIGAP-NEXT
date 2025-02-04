// components/Header.js
"use client";

import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  
  const routeName = pathname === "/" 
    ? "Home" 
    : pathname.replace("/", "").split("/")[0].replace(/^\w/, (c) => c.toUpperCase());
  
  return (
    <header className="w-full bg-gray-200 p-4 shadow-md">
      <h1 className="text-xl font-bold">Seja bem-vindo à {routeName}</h1>
    </header>
  );
}
