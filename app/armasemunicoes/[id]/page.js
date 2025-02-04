// app/carmasemunicoes/[id]/page.js
export default function MunicoesDetail({ params }) {
    const { id } = params;
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Detalhes do item: {id}</h1>
      </div>
    )
  }
  