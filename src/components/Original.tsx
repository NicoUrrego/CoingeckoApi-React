import { useEffect, useState } from "react";

interface Coin {
  id: string;
  name: string;
  current_price: number;
}

type Currency = {
  id: string;
  name: string;
  price: number;
};

function Original() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  const [from, setFrom] = useState<string>("bitcoin");
  const [to, setTo] = useState<string>("ethereum");
  const [amount, setAmount] = useState<number>(1);

  const [result, setResult] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=100&page=1"
      );
      const data = await res.json();

      setCoins(data);

      const fiat: Currency[] = [
        { id: "usd", name: "Dólar (USD)", price: 1 },
        { id: "eur", name: "Euro (EUR)", price: 0.93 },
        { id: "cop", name: "Peso Colombiano (COP)", price: 4000 },
        { id: "gbp", name: "Libra (GBP)", price: 0.80 },
      ];

      const crypto: Currency[] = data.map((c: any) => ({
        id: c.id,
        name: c.name,
        price: c.current_price,
      }));

      setCurrencies([...crypto, ...fiat]);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fromCoin = currencies.find((c) => c.id === from);
    const toCoin = currencies.find((c) => c.id === to);

    if (fromCoin && toCoin) {
      const value = (amount * fromCoin.price) / toCoin.price;
      setResult(value);
    }
  }, [from, to, amount, currencies]);

  return (
    <div className="conversor">
      <h1>Conversor de Monedas</h1>

      <div>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <select value={from} onChange={(e) => setFrom(e.target.value)}>
          {currencies.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <span> → </span>

        <select value={to} onChange={(e) => setTo(e.target.value)}>
          {currencies.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <h2>
        Resultado: {result.toFixed(6)}
      </h2>
    </div>
  );
}

export default Original;