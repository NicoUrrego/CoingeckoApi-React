import { useEffect, useState } from "react";
import { Link } from "react-router";

function Favoritos() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(stored);
  }, []);

  return (
    <div>
      <h1>Favoritos</h1>

      {favorites.length === 0 ? (
        <p>No tienes monedas favoritas</p>
      ) : (
        <ul>
          {favorites.map((coin) => (
            <li key={coin}>
              <Link to={`/detalle/${coin}`}>
                {coin}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favoritos;