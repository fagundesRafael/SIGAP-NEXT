// app/estatistica/page.js
"use client"

import EstatisticaAutomotores from '@/components/EstatisticaAutomotores';

export default function Estatistica() {
  return (
    <div className="min-h-screen font-mono rounded-md border border-gray-500 shadow p-4 bg-c_deep_black text-white">
      
      {/* Componente de estatísticas de automotores */}
      <EstatisticaAutomotores />
      
      {/* Aqui podem ser adicionados outros componentes de estatísticas no futuro */}
    </div>
  );
}

