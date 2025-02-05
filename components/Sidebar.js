// components/Sidebar.js
"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { FaCar, FaBicycle, FaUserCircle } from "react-icons/fa";
import { GiHeavyBullets, GiPowder } from "react-icons/gi";
import { MdMonitor, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { IoDocumentOutline, IoStatsChart } from "react-icons/io5";
import { PiGearSixBold } from "react-icons/pi";

export default function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <aside className="relative left-0 top-0 h-screen w-1/7 bg-customBlack_semi01 p-4 rounded-md mx-1">
      {session && (
        <div className="mb-4">
          <p className="text-cyan-50">
          Bem vindo(a) {session?.user?.nome.split(" ")[0] && capitalizeFirstLetter(session.user.nome.split(" ")[0])}.
          </p>
        </div>
      )}

<div className="my-4 border-t boder-white" ></div>

      <div className="flex flex-col mb-4 ml-2 text-sm gap-4 text-white">
      <ul className="space-y-2">
        <li className="flex items-center">
        <FaCar />
          <Link
            href="/carrosemotos"
            className={`block p-1 rounded  ml-1 hover:underline ml-1 hover:underline ${isActive("/carrosemotos") ? "bg-customBlack py-1" : ""}`}
          >
            Carros e Motos
          </Link>
        </li>
        <li className="flex items-center">
        <GiHeavyBullets />
          <Link
            href="/armasemunicoes"
            className={`block p-1 rounded  ml-1 hover:underline ${isActive("/armasemunicoes") ? "bg-customBlack py-1" : ""}`}
          >
            Armas e Munições
          </Link>
        </li>
        <li className="flex items-center">
        <MdMonitor />
          <Link
            href="/eletroeeletronicos"
            className={`block p-1 rounded  ml-1 hover:underline ${isActive("/eletroeeletronicos") ? "bg-customBlack py-1" : ""}`}
          >
            Eletro e Eletrônicos
          </Link>
        </li>
        <li className="flex items-center">
        <FaBicycle />
          <Link
            href="/bicicletas"
            className={`block p-1 rounded  ml-1 hover:underline ${isActive("/bicicletas") ? "bg-customBlack py-1" : ""}`}
          >
            Bicicletas
          </Link>
        </li>
        <li className="flex items-center">
        <GiPowder />
          <Link
            href="/entorpecentes"
            className={`block p-1 rounded  ml-1 hover:underline ${isActive("/entorpecentes") ? "bg-customBlack py-1" : ""}`}
          >
            Entorpecentes
          </Link>
        </li>
        <li className="flex items-center">
        <IoDocumentOutline />
          <Link
            href="/documentos"
            className={`block p-1 rounded  ml-1 hover:underline ${isActive("/documentos") ? "bg-customBlack py-1" : ""}`}
          >
            Documentos
          </Link>
        </li>
        <li className="flex items-center">
        <MdOutlineCheckBoxOutlineBlank />
          <Link
            href="/outros"
            className={`block p-1 rounded  ml-1 hover:underline ${isActive("/outros") ? "bg-customBlack py-1" : ""}`}
          >
            Outros
          </Link>
        </li>
      </ul>
      </div>

      <div className="my-4 border-t boder-white" ></div>

      <div className="flex flex-col ml-2 text-sm gap-4 text-white">
      <ul className="space-y-2">
        <li className="flex items-center">
        <PiGearSixBold />
          <Link
            href="/configs"
            className={`block p-1 rounded  ml-1 hover:underline ml-1 hover:underline ${isActive("/configs") ? "bg-customBlack py-1" : ""}`}
          >
            Configurações
          </Link>
        </li>
        <li className="flex items-center">
        <FaUserCircle />
          <Link
            href="/configs"
            className={`block p-1 rounded  ml-1 hover:underline ml-1 cursor-not-allowed hover:underline ${isActive("/users") ? "bg-customBlack py-1" : ""}`}
          >
            Usuários
          </Link>
        </li>
        <li className="flex items-center">
        <IoStatsChart />
          <Link
            href="/configs"
            className={`block p-1 rounded  ml-1 hover:underline ml-1 cursor-not-allowed hover:underline ${isActive("/logs") ? "bg-customBlack py-1" : ""}`}
          >
            logs
          </Link>
        </li>
        
      </ul>
      <div className="my-4 border-t boder-white" ></div>
      </div>

      {session && (
        <div className="mt-4">
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white p-1 rounded  ml-1 hover:underline hover:bg-red-600 transition w-full"
          >
            Sair
          </button>
        </div>
      )}
    </aside>
  );
}