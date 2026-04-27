import React from "react";

function Informativa() {
  return (
    <div style={{ padding: "20px", lineHeight: "1.6" }}>
      <h1>Información del Proyecto</h1>

      <section>
        <h2>¿Qué es CoinGecko API?</h2>
        <p>
          Este proyecto utiliza la API de CoinGecko, una API pública que permite
          obtener información actualizada sobre criptomonedas y exchanges a nivel mundial.
        </p>
        <p>
          A través de esta API se pueden consultar precios, rankings, volumen de mercado
          y otros datos relevantes del ecosistema cripto.
        </p>
      </section>

      <section>
        <h2>¿Qué muestra esta aplicación?</h2>
        <p>
          La aplicación permite visualizar información de criptomonedas y exchanges
          de forma sencilla e interactiva.
        </p>

        <ul>
          <li>Lista de criptomonedas con su precio actual</li>
          <li>Lista de exchanges con nivel de confianza y ranking</li>
          <li>Buscador para filtrar resultados</li>
          <li>Sistema de favoritos usando almacenamiento local</li>
          <li>Vista de detalle con información más completa</li>
        </ul>
      </section>

      <section>
        <h2>Tecnologías utilizadas</h2>
        <ul>
          <li>React + Vite</li>
          <li>Fetch API</li>
          <li>Hooks (useState, useEffect)</li>
          <li>LocalStorage</li>
        </ul>
      </section>
    </div>
  );
}

export default Informativa;