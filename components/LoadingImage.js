// components/LoadingImage.js
"use client";

export default function LoadingImage() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="px-4 py-2 bg-gray-800 rounded shadow-lg">
        <p className="text-white text-lg font-bold">Carregando imagem...</p>
      </div>
    </div>
  );
}
