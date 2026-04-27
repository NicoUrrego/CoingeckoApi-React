import { useEffect, useState } from "react"
import { useParams } from "react-router"

interface CoinData {
    id: string;
    name: string;
    symbol: string;
    image: {
        large: string;
    };
    market_data: {
        current_price: {
            usd: number;
        };
    };
    description: {
        es: string;
        en: string;
    };
    links: {
        homepage: string[];
    };
    genesis_date: string;
}

function Detalle() {

    const { detalle } = useParams<{ detalle: string }>()
    const [data, setData] = useState<CoinData | null>(null)
    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {

        if (!detalle) return;

        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")

        if (favorites.includes(detalle)) {

            setIsFavorite(true)
        }

        const fetchData = async () => {

            try {
                const res = await fetch(`https://api.coingecko.com/api/v3/coins/${detalle}`);
                const data = await res.json()

                setData(data)
            } catch (error) {
                console.error('Error cargando datos:', error)
            }
        }
        fetchData()
    }, [detalle])

    const toggleFavorite = () => {
        if (!detalle) return;

        let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

        if (favorites.includes(detalle)) {
            favorites = favorites.filter((fav: string) => fav !== detalle);
            setIsFavorite(false);
        } else {
            favorites.push(detalle);
            setIsFavorite(true);
        }

        localStorage.setItem("favorites", JSON.stringify(favorites));
    };

    if (!data) return <p>Cargando...</p>

    return (
        <>
            <h1>{data.name}({data.symbol.toUpperCase()})</h1>
            <img src={data.image.large} alt={data.name} />

            <button onClick={toggleFavorite}>
                {isFavorite ? "❤️" : "🤍"}
            </button>

            <h2>Informacion: </h2>
            <p>Precio actual: {data.market_data.current_price.usd} USD</p>
            <p>Descripcion Español: {data.description.es}</p>
            <p>Descripcion Ingles: {data.description.en}</p>
            <p>Fecha de nacimiento: {data.genesis_date}</p>
            <p><a href={data.links.homepage[0]} target="_blank">
                Página oficial
            </a></p>
        </>
    )
}

export default Detalle