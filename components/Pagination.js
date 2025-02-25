"use client";

export default function Pagination({ page, totalPages, onPrevious, onNext }) {
  return (
    <div className="flex justify-between mt-4">
      <button
        onClick={onPrevious}
        disabled={page === 1}
        className="bg-green-600 text-white py-1 px-3 rounded disabled:opacity-20 disabled:cursor-not-allowed"
      >
        Retornar
      </button>
      <button
        onClick={onNext}
        disabled={page === totalPages || totalPages === 0}
        className="bg-green-600 text-white py-1 px-3 rounded disabled:opacity-20 disabled:cursor-not-allowed"
      >
        Avançar
      </button>
    </div>
  );
}
