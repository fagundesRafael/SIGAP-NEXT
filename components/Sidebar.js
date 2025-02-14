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
    <aside className="relative left-0 top-0 h-screen bg-c_deep_black p-4 rounded-md mx-1">
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

      <div className="flex flex-col mb-4 text-sm font-mono gap-4 text-gray-200 ">
        <ul className="space-y-2">
          <span className="text-c_text_blue font-black">sessões:</span>
          <li className="flex ml-2 items-center">
            <FaCar />
            <Link
              href="/carrosemotos"
              className={`block p-1 rounded ml-1 ${
                isActive("/carrosemotos")
                  ? "bg-c_deep_gray_black py-1 text-white w-full"
                  : ""
              }`}
            >
              <span
                className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 
    after:h-px after:bg-current after:w-0 after:transition-all 
    after:duration-300 after:ease-in-out hover:after:w-full"
              >
                Carros e Motos
              </span>
            </Link>
          </li>
          <li className="flex ml-2 items-center">
            <GiHeavyBullets />
            <Link
              href="/armasemunicoes"
              className={`block p-1 rounded  ml-1 ${
                isActive("/armasemunicoes")
                  ? "bg-c_deep_gray_black py-1 text-white w-full"
                  : ""
              }`}
            >
              <span
                className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 
    after:h-px after:bg-current after:w-0 after:transition-all 
    after:duration-300 after:ease-in-out hover:after:w-full"
              >
                Armas e Munições
              </span>
            </Link>
          </li>
          <li className="flex ml-2 items-center">
            <MdMonitor />
            <Link
              href="/eletroeeletronicos"
              className={`block p-1 rounded  ml-1 ${
                isActive("/eletroeeletronicos")
                  ? "bg-c_deep_gray_black py-1 text-white w-full"
                  : ""
              }`}
            >
              <span
                className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 
    after:h-px after:bg-current after:w-0 after:transition-all 
    after:duration-300 after:ease-in-out hover:after:w-full"
              >
                Eletro-Eletrônicos
              </span>
            </Link>
          </li>
          <li className="flex ml-2 items-center">
            <FaBicycle />
            <Link
              href="/bicicletas"
              className={`block p-1 rounded  ml-1 ${
                isActive("/bicicletas")
                  ? "bg-c_deep_gray_black py-1 text-white w-full"
                  : ""
              }`}
            >
              <span
                className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 
    after:h-px after:bg-current after:w-0 after:transition-all 
    after:duration-300 after:ease-in-out hover:after:w-full"
              >
                Bicicletas
              </span>
            </Link>
          </li>
          <li className="flex ml-2 items-center">
            <GiPowder />
            <Link
              href="/entorpecentes"
              className={`block p-1 rounded  ml-1 ${
                isActive("/entorpecentes")
                  ? "bg-c_deep_gray_black py-1 text-white w-full"
                  : ""
              }`}
            >
              <span
                className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 
    after:h-px after:bg-current after:w-0 after:transition-all 
    after:duration-300 after:ease-in-out hover:after:w-full"
              >
                Entorpecentes
              </span>
            </Link>
          </li>
          <li className="flex ml-2 items-center">
            <IoDocumentOutline />
            <Link
              href="/documentos"
              className={`block p-1 rounded  ml-1 ${
                isActive("/documentos")
                  ? "bg-c_deep_gray_black py-1 text-white w-full"
                  : ""
              }`}
            >
              <span
                className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 
    after:h-px after:bg-current after:w-0 after:transition-all 
    after:duration-300 after:ease-in-out hover:after:w-full"
              >
                Documentos
              </span>
            </Link>
          </li>
          <li className="flex ml-2 items-center">
            <MdOutlineCheckBoxOutlineBlank />
            <Link
              href="/outros"
              className={`block p-1 rounded  ml-1 ${
                isActive("/outros")
                  ? "bg-c_deep_gray_black py-1 text-white w-full"
                  : ""
              }`}
            >
              <span
                className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 
    after:h-px after:bg-current after:w-0 after:transition-all 
    after:duration-300 after:ease-in-out hover:after:w-full"
              >
                Outros
              </span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex flex-col mb-4 text-sm font-mono gap-4 text-gray-200 ">
        <ul className="space-y-2">
          <span className="text-c_text_blue font-black">sistema:</span>
          <li className="flex ml-2 items-center">
            <PiGearSixBold />
            <Link
              href="/configs"
              className={`block p-1 rounded ml-1 ${
                isActive("/configs")
                  ? "bg-c_deep_gray_black py-1 text-white w-full"
                  : ""
              }`}
            >
              <span className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 
    after:h-px after:bg-current after:w-0 after:transition-all 
    after:duration-300 after:ease-in-out hover:after:w-full">
    Configurações
  </span>
            </Link>
          </li>
          <li className="flex ml-2 items-center">
            <FaUserCircle />
            <Link
              href="/configs"
              className={`block p-1 rounded  ml-1 cursor-not-allowed ${
                isActive("/users")
                  ? "bg-c_deep_gray_black py-1 text-white w-full"
                  : ""
              }`}
            >
              Usuários
            </Link>
          </li>
          <li className="flex ml-2 items-center">
            <IoStatsChart />
            <Link
              href="/configs"
              className={`block p-1 rounded  ml-1 cursor-not-allowed ${
                isActive("/logs")
                  ? "bg-c_deep_gray_black py-1 text-white w-full"
                  : ""
              }`}
            >
              logs
            </Link>
          </li>
        </ul>
      </div>

      {session && (
        <div className="mt-2">
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white text-xs p-1 rounded mt-4 hover:bg-red-600 transition w-full"
          >
            Sair
          </button>
        </div>
      )}
    </aside>
  );
}
