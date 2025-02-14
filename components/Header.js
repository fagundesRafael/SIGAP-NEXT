// components/Header.js
"use client";

import Link from "next/link";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineTextsms } from "react-icons/md";

export default function Header() {
  return (
    <header className="w-full mx-1 rounded-md text-white bg-c_deep_black flex justify-between px-4 py-2 my-1">
      <Link className="flex gap-2" href="/">
        <img
          className="h-6 mb-[3px] animate-glow"
          src="/sigap_full-logo.png"
          alt="logo"
        />
      </Link>
      <div className="flex gap-2 items-center ">
        <p className="text-[10px] my-auto">
          SISTEMA INTEGRADO DE GESTÃO DE APREENSÕES POLICIAIS
        </p>
        <div className="flex gap-2 w-10 cursor-not-allowed ">
          <IoMdNotificationsOutline className="hover:w-10 transform hover:scale-110 transition ease-in-out" />
          <MdOutlineTextsms className="hover:w-10 transform hover:scale-110 transition ease-in-out" />
        </div>
      </div>
    </header>
  );
}
