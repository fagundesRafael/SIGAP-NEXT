// components/DisplayConfigs.js
"use client";

export default function DisplayConfigs({ carros, bicicletas, motos, armas, entorpecentes }) {
  return (
    <div className="p-4 bg-gray-700 rounded">
      <h2 className="text-lg font-bold mb-2">Configurações Atuais</h2>
      <div className="mb-4">
        <h3 className="font-bold">Carros:</h3>
        {carros.length === 0 ? (
          <p>Nenhuma marca de carro registrada.</p>
        ) : (
          <ul>
            {carros.map((item, idx) => (
              <li key={idx}>
                <strong>{item.marca}:</strong> {item.modelos.join(", ")}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mb-4">
        <h3 className="font-bold">Bicicletas:</h3>
        {bicicletas.length === 0 ? (
          <p>Nenhuma marca de bicicleta registrada.</p>
        ) : (
          <ul>
            {bicicletas.map((item, idx) => (
              <li key={idx}>
                <strong>{item.marca}:</strong> {item.modelos.join(", ")}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mb-4">
        <h3 className="font-bold">Motos:</h3>
        {motos.length === 0 ? (
          <p>Nenhuma marca de moto registrada.</p>
        ) : (
          <ul>
            {motos.map((item, idx) => (
              <li key={idx}>
                <strong>{item.marca}:</strong> {item.modelos.join(", ")}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mb-4">
        <h3 className="font-bold">Armas e Munições:</h3>
        {armas.length === 0 ? (
          <p>Nenhuma marca de arma registrada.</p>
        ) : (
          <ul>
            {armas.map((item, idx) => (
              <li key={idx}>
                <strong>{item.marca}:</strong>{" "}
                {item.modelos.map((m, i) => (
                  <span key={i}>
                    {m.modelo} (Calibre: {m.calibre})
                    {i < item.modelos.length - 1 ? ", " : ""}
                  </span>
                ))}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h3 className="font-bold">Entorpecentes:</h3>
        {entorpecentes.length === 0 ? (
          <p>Nenhum tipo registrado.</p>
        ) : (
          <ul>
            {entorpecentes.map((tipo, idx) => (
              <li key={idx}>{tipo}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
