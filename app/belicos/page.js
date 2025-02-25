// app/belicos/page.js
"use client";

import { useState, useEffect } from "react";
import BelicoSearchBar from "@/components/BelicoSearchBar";
import BelicoTable from "@/components/BelicoTable";
import Pagination from "@/components/Pagination";
import Link from "next/link";

export default function BelicosPage() {
  const [records, setRecords] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState({
    procedimento: "",
    numero: "",
    tipo: "",
    marca: "",
    modelo: "",
    calibre: "",
  });
  const limit = 16;

  async function fetchRecords(currentPage, searchObj = {}) {
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        ...searchObj,
      });
      const res = await fetch(`/api/belicos?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setRecords(data.records);
        setTotal(data.total);
        setPage(data.page);
      }
    } catch (error) {
      console.error("Erro ao buscar registros:", error);
    }
  }

  useEffect(() => {
    fetchRecords(page, searchParams);
  }, [page, searchParams]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-screen p-2 rounded-md bg-c_deep_black text-white border border-gray-500 shadow">
      <div className="flex justify-between items-center mb-2">
        <BelicoSearchBar searchParams={searchParams} setSearchParams={setSearchParams} />
        <Link
          href="/belicos/registrar"
          className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600 transition duration-600"
        >
          Registrar novo material bélico
        </Link>
      </div>
      <BelicoTable records={records} />
      <Pagination
        page={page}
        totalPages={totalPages}
        onPrevious={() => setPage(page - 1)}
        onNext={() => setPage(page + 1)}
      />
    </div>
  );
}
