// components/DisplayConfigs.js
"use client";

export default function DisplayConfigs({ carros, bicicletas, motos, armas, municoes, entorpecentes, eletro, outros }) {
  return (
    <div className="p-4 bg-gray-700 rounded flex gap-4">
      <div className="mb-4">
        <h3 className="font-bold underline underline-offset-2 text-xs">Carros:</h3>
        {carros.length === 0 ? (
          <p>Nenhuma marca de carro registrada.</p>
        ) : (
          <ul>
            {carros.map((item, idx) => (
              <li className="text-xs font" key={idx}>
                <strong>{item.marca}:</strong> {item.modelos.join(", ")}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-4">
        <h3 className="font-bold underline underline-offset-2 text-xs">Bicicletas:</h3>
        {bicicletas.length === 0 ? (
          <p>Nenhuma marca de bicicleta registrada.</p>
        ) : (
          <ul>
            {bicicletas.map((item, idx) => (
              <li className="text-xs font" key={idx}>
                <strong>{item.marca}:</strong> {item.modelos.join(", ")}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-4">
        <h3 className="font-bold underline underline-offset-2 text-xs">Motos:</h3>
        {motos.length === 0 ? (
          <p>Nenhuma marca de moto registrada.</p>
        ) : (
          <ul>
            {motos.map((item, idx) => (
              <li className="text-xs font" key={idx}>
                <strong>{item.marca}:</strong> {item.modelos.join(", ")}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-4">
        <h3 className="font-bold underline underline-offset-2 text-xs">Armas:</h3>
        {armas.length === 0 ? (
          <p>Nenhuma marca de arma registrada.</p>
        ) : (
          <ul>
            {armas.map((item, idx) => (
              <li className="text-xs font" key={idx}>
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

      <div className="mb-4">
        <h3 className="font-bold underline underline-offset-2 text-xs">Munições:</h3>
        {municoes.length === 0 ? (
          <p>Nenhuma marca de munição registrada.</p>
        ) : (
          <ul>
            {municoes.map((item, idx) => (
              <li className="text-xs font" key={idx}>
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

      <div className="mb-4">
        <h3 className="font-bold underline underline-offset-2 text-xs">Entorpecentes:</h3>
        {entorpecentes.length === 0 ? (
          <p>Nenhum tipo registrado.</p>
        ) : (
          <ul>
            {entorpecentes.map((tipo, idx) => (
              <li className="text-xs" key={idx}>{tipo}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-4">
        <h3 className="font-bold underline underline-offset-2 text-xs">Eletro e Eletrônicos:</h3>
        {eletro.length === 0 ? (
          <p className="text-xs" >Nenhuma marca registrada.</p>
        ) : (
          <ul>
            {eletro.map((brand, idx) => (
              <li className="text-xs" key={idx}>{brand}</li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3 className="font-bold underline underline-offset-2 text-xs">Outros:</h3>
        {outros.length === 0 ? (
          <p className="text-xs" >Nenhuma marca registrada.</p>
        ) : (
          <ul>
            {outros.map((brand, idx) => (
              <li className="text-xs" key={idx}>{brand}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
