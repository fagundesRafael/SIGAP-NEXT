// components/Loading.js
"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-c01_heavy_blue bg-opacity-80">
      <div className="min-h-screen text-white flex items-center justify-center">
        Aguarde um instante...
      </div>
    </div>
  );
}
