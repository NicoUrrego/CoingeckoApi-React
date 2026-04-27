import { useEffect, useState } from "react"
import { Link } from "react-router";

interface Coin {
    id: string;
    name: string;
    symbol: string;
    image: string;
    current_price: number;
}

interface Exchange {
    id: string;
    name: string;
    image: string;
    trust_score: number;
    trust_score_rank: number;
}

type FiltroTipo = 'monedas' | 'intercambios'

function Home() {

    const [coins, setCoins] = useState<Coin[]>([]);
    const [title, setTitle] = useState('')
    const [busqueda, setBusqueda] = useState('')

    const [filtro, setFiltro] = useState<FiltroTipo>('monedas')
    const [exchanges, setExchanges] = useState<Exchange[]>([])

    const filtros: FiltroTipo[] = ['monedas', 'intercambios']

    useEffect(() => {

        const fetchData = async () => {
            try {
                if (filtro === 'monedas') {

                    const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1`)
                    const data = await res.json()
                    setCoins(data)
                    setTitle('Monedas')
                } else {

                    const res = await fetch(`https://api.coingecko.com/api/v3/exchanges`)
                    const data = await res.json()
                    setExchanges(data)
                    setTitle('Intercambios')
                }
            } catch (error) {
                console.error('Error cargando datos:', error)
            }
        }
        fetchData()
    }, [filtro]);

    return (
        <>

            <div className="filtros">
                {filtros.map((onestat) => (
                    <button
                        key={onestat}
                        onClick={() => {
                            setFiltro(onestat)
                            setBusqueda('')
                        }}
                        className={filtro === onestat ? 'activo' : ''}
                    >
                        {onestat}
                    </button>
                ))}
            </div>
            <input
                type="text"
                placeholder="Buscar"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />

            <div className="coins-list">
                <h1>{title}</h1>
                {filtro === 'monedas' ? (
                    <table className="coins-table">
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Precio Actual (USD)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coins
                                .filter((coin) => {
                                    if (busqueda.length < 2) return true;
                                    return coin.name.toLowerCase().includes(busqueda.toLowerCase())
                                }
                                ).map((coin) => (
                                    <tr key={coin.id}>
                                        <td><img src={coin.image} alt={coin.name} /></td>
                                        <td><Link to={`/detalle/${coin.id || "default"}`}>
                                            {coin.name}({coin.symbol.toUpperCase()})
                                        </Link></td>
                                        <td>{coin.current_price}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                ) : (
                    <table className="exchanges-table">
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Puntaje de Confianza</th>
                                <th>Ranking</th>
                            </tr>
                        </thead>
                        <tbody>
                            {exchanges
                                .filter((exchange) => {
                                    if (busqueda.length < 2) return true;
                                    return exchange.name.toLowerCase().includes(busqueda.toLowerCase())
                                }
                                ).map((exchange) => (
                                    <tr key={exchange.id}>
                                        <td><img src={exchange.image} alt={exchange.name} /></td>
                                        <td>{exchange.name}</td>
                                        <td>{exchange.trust_score}</td>
                                        <td>{exchange.trust_score_rank}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    )
}

export default Home