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
    <aside className="relative left-0 top-0 h-screen w-1/6 bg-c01_heavy_blue p-4 rounded-md mx-1">
      {session && (
        <div className="mb-4">
          <p className="text-cyan-50 text-bold text-sm">
            Bem vindo(a){" "}
            {session?.user?.nome.split(" ")[0] &&
              capitalizeFirstLetter(session.user.nome.split(" ")[0])}
            .
          </p>
        </div>
      )}

      <div className="my-1 border-t boder-white"></div>

      <div className="flex flex-col mb-4 text-sm font-mono gap-4 text-gray-200 ">
        <ul className="space-y-2">
          <span className="text-c03_blue font-black " >sessões:</span>
          <li className="flex items-center">
            <FaCar />
            <Link
              href="/carrosemotos"
              className={`block p-1 rounded ml-1 hover:underline ${
                isActive("/carrosemotos") ? "bg-c02_heavy_blue py-1 text-white w-full" : ""
              }`}
            >
              Carros e Motos
            </Link>
          </li>
          <li className="flex items-center">
            <GiHeavyBullets />
            <Link
              href="/armasemunicoes"
              className={`block p-1 rounded  ml-1 hover:underline ${
                isActive("/armasemunicoes") ? "bg-c02_heavy_blue py-1 text-white w-full" : ""
              }`}
            >
              Armas e Munições
            </Link>
          </li>
          <li className="flex items-center">
            <MdMonitor />
            <Link
              href="/eletroeeletronicos"
              className={`block p-1 rounded  ml-1 hover:underline ${
                isActive("/eletroeeletronicos") ? "bg-c02_heavy_blue py-1 text-white w-full" : ""
              }`}
            >
              Eletro e Eletrônicos
            </Link>
          </li>
          <li className="flex items-center">
            <FaBicycle />
            <Link
              href="/bicicletas"
              className={`block p-1 rounded  ml-1 hover:underline ${
                isActive("/bicicletas") ? "bg-c02_heavy_blue py-1 text-white w-full" : ""
              }`}
            >
              Bicicletas
            </Link>
          </li>
          <li className="flex items-center">
            <GiPowder />
            <Link
              href="/entorpecentes"
              className={`block p-1 rounded  ml-1 hover:underline ${
                isActive("/entorpecentes") ? "bg-c02_heavy_blue py-1 text-white w-full" : ""
              }`}
            >
              Entorpecentes
            </Link>
          </li>
          <li className="flex items-center">
            <IoDocumentOutline />
            <Link
              href="/documentos"
              className={`block p-1 rounded  ml-1 hover:underline ${
                isActive("/documentos") ? "bg-c02_heavy_blue py-1 text-white w-full" : ""
              }`}
            >
              Documentos
            </Link>
          </li>
          <li className="flex items-center">
            <MdOutlineCheckBoxOutlineBlank />
            <Link
              href="/outros"
              className={`block p-1 rounded  ml-1 hover:underline ${
                isActive("/outros") ? "bg-c02_heavy_blue py-1 text-white w-full" : ""
              }`}
            >
              Outros
            </Link>
          </li>
        </ul>
      </div>

      <div className="my-1 border-t boder-white"></div>

      <div className="flex flex-col ml-2 text-sm gap-4 text-gray-200">
        <ul className="space-y-2">
        <span className="text-c03_blue font-mono font-black" >sistema:</span>
          <li className="flex items-center">
            <PiGearSixBold />
            <Link
              href="/configs"
              className={`block p-1 rounded ml-1 hover:underline ${
                isActive("/configs") ? "bg-c02_heavy_blue py-1 text-white w-full" : ""
              }`}
            >
              Configurações
            </Link>
          </li>
          <li className="flex items-center">
            <FaUserCircle />
            <Link
              href="/configs"
              className={`block p-1 rounded  ml-1 cursor-not-allowed hover:underline ${
                isActive("/users") ? "bg-c02_heavy_blue py-1 text-white w-full" : ""
              }`}
            >
              Usuários
            </Link>
          </li>
          <li className="flex items-center">
            <IoStatsChart />
            <Link
              href="/configs"
              className={`block p-1 rounded  ml-1 cursor-not-allowed hover:underline ${
                isActive("/logs") ? "bg-c02_heavy_blue py-1 text-white w-full" : ""
              }`}
            >
              logs
            </Link>
          </li>
        </ul>
        <div className="my-1 border-t boder-white"></div>
      </div>

      {session && (
        <div className="mt-2">
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white text-xs max-w-[60px] p-1 rounded mx-8 hover:bg-red-600 transition w-full"
          >
            Sair
          </button>
        </div>
      )}
    </aside>
  );
}
