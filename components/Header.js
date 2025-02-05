// components/Header.js
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  
  const routeName = pathname === "/" 
    ? "Home" 
    : pathname.replace("/", "").split("/")[0].replace(/^\w/, (c) => c.toUpperCase());
  
  return (
    <header className="w-full mx-1 rounded-md text-cyan-50 bg-customBlack_semi01 flex justify-between px-4 py-2 my-1">
      <Link href="/">LOGO HERE</Link>
      <h1 className="text-[px-12]">sessão de {routeName.toLocaleLowerCase()}</h1>
    </header>
  );
}
