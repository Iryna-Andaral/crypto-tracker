import { useParams, useNavigate, Link } from "react-router-dom"
import { fetchCoinData, type CryptoDetails, fetchChartData } from "../api/coinGeco"
import { useEffect, useState } from "react"
import cryptoTrackerLogo from "../assets/crypto-tracker2.png"
import { formatPrice, formatMarketCap} from "../utils/formatter"
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts"

interface PricePoint {
    time: string
    price: number
}

export const CoinDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [coin, setCoin] = useState<CryptoDetails | null>(null)
    const [chartData, setChartData] = useState<PricePoint[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const loadCoinData = async (coinId: string) => {
        try {
            const data = await fetchCoinData(coinId)
            setCoin(data)
        } catch (err){
            console.error("Error fetching crypto:", err)
        } finally {
            setIsLoading(false)
        }
    }
    const loadChartData = async (coinId: string) => {
        try {
            const data = await fetchChartData(coinId)
            const formattedData = data.prices.map((price) => ({
                time: new Date(price[0]).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                }),
                price: price[1],
            }))
            setChartData(formattedData)
        } catch (err){
            console.error("Error fetching crypto:", err)
        }
    }
    useEffect(() => {
        if (id) {
            void loadCoinData(id)
            void loadChartData(id)
            loadChartData(id)
        }
    }, [id])


    if (isLoading){
        return (
            <div className="flex min-h-screen flex-col bg-gray-900">
                <header className="mb-4 flex flex-col justify-between border-b border-violet-500 py-4 md:flex-row">
                    <Link className="flex" to={"/"}>
                        <img src={cryptoTrackerLogo} alt="Crypto Tracker" className="w-25"/>
                        <div>
                            <h1 className="inline-block bg-gradient-to-r from-blue-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-4xl font-bold text-transparent transition-transform duration-300 hover:-translate-y-1" style={{ filter: "drop-shadow(2px 1px 0 #312e81) drop-shadow(4px 2px 0 #1e1b4b) drop-shadow(6px 4px 10px rgba(15, 23, 42, 0.45))" }}>
                                Crypto Tracker
                            </h1>
                            <p className="text-gray-300 text-lg text-center">real-time cryptocurrency data</p>
                        </div>
                    </Link>
                </header>
                <div className="flex flex-col items-center justify-center bg-gray-900">
                    <div role="status">
                            <svg aria-hidden="true" className="inline h-12 w-12 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path className="text-sky-300" d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path className="text-fuchsia-500" d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04855 41.5694 10.4717 44.0502 10.1071C47.8511 9.54855 51.7194 9.52689 55.5402 10.0491C60.8648 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                        </svg>
                        <span className="sr-only">Loading crypto data...</span>
                    </div>
                    <p className="font-sm text-gray-300">Loading crypto data...</p>
                    </div>
                </div>
            )
    }

    if(!coin) {
        return (<div className="min-h-screen bg-gray-900 p-3 lg:p-4 text-gray-200">
            <header className="mb-4 flex flex-col justify-between border-b border-violet-500 py-4 md:flex-row">
                <Link className="flex" to={"/"}>
                    <img src={cryptoTrackerLogo} alt="Crypto Tracker" className="w-25"/>
                    <div>
                        <h1 className="inline-block bg-gradient-to-r from-blue-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-4xl font-bold text-transparent transition-transform duration-300 hover:-translate-y-1" style={{ filter: "drop-shadow(2px 1px 0 #312e81) drop-shadow(4px 2px 0 #1e1b4b) drop-shadow(6px 4px 10px rgba(15, 23, 42, 0.45))" }}>
                            Crypto Tracker
                        </h1>
                        <p className="text-gray-300 text-lg text-center">real-time cryptocurrency data</p>
                    </div>
                </Link>
            </header>
            <div className="py-12 text-center">
                <p className="mb-4">Coin not found</p>
                <button
                    className="cursor-pointer rounded bg-gradient-to-r from-blue-400 via-cyan-300 to-fuchsia-400 px-6 py-2 text-gray-900 transition-transform hover:scale-103 hover:text-gray-200"
                    onClick={() => navigate("/")}
                >
                    Go Back
                </button>
            </div>
        </div>
        )
    }
    const priceChange = coin.price_change_percentage_24h || 0
    const isPositive = priceChange >=0
    return (
        <div className="min-h-screen bg-gray-900 p-3 lg:p-4 text-gray-200">
            <header className="mb-4 items-center flex flex-col md:justify-between border-b border-violet-500 py-4 md:flex-row">
                <Link className="flex" to={"/"}>
                    <img src={cryptoTrackerLogo} alt="Crypto Tracker" className="w-25"/>
                    <div>
                        <h1 className="inline-block bg-gradient-to-r from-blue-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-4xl font-bold text-transparent transition-transform duration-300 hover:-translate-y-1" style={{ filter: "drop-shadow(2px 1px 0 #312e81) drop-shadow(4px 2px 0 #1e1b4b) drop-shadow(6px 4px 10px rgba(15, 23, 42, 0.45))" }}>
                            Crypto Tracker
                        </h1>
                        <p className="text-gray-300 text-lg text-center">real-time cryptocurrency data</p>
                    </div>
                </Link>

                <button
                    className="md:mt-0 mt-6 md:self-center cursor-pointer rounded bg-gradient-to-r from-gray-700  to-gray-800 px-6 py-1 text-gray-200 transition-transform hover:scale-103 hover:from-gray-800  hover:to-gray-700"
                    onClick={() => navigate("/")}
                >
                    ← Back to list
                </button>
            </header>
            <div className="mx-auto mt-8 rounded-2xl border border-gray-700 bg-gray-800 p-6">
                <div className="flex items-center gap-4">
                    <img src={coin.image} alt={coin.name} className="h-12 w-12" />
                    <div>
                        <h1 className="text-2xl font-bold">{coin.name}</h1>
                        <p className="text-sm text-gray-400">{coin.symbol.toUpperCase()}</p>
                    </div>
                    <span className="ml-auto rounded bg-blue-200 px-2 py-1 text-sm text-gray-900">Rank #{coin.market_cap_rank}</span>
                </div>
                <h2 className="mt-6 text-3xl font-bold">{formatPrice(coin.current_price)}</h2>
                <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-700 pt-4">
                    <p className={!isPositive
                        ? "w-fit self-center rounded bg-red-700/30 px-1 py-0.2 text-red-200"
                        : "w-fit self-center rounded bg-green-700/30 px-1 py-0.2 text-green-200"
                    }>
                        {isPositive
                        ? <span className="font-bold">↑ </span>
                        :<span className="font-bold">↓ </span>}
                        {Math.abs(priceChange).toFixed(2)}%
                    </p>
             
                </dl>
                <div className="flex gap-5 mt-4">
                    <div>
                        <dt className="text-sm text-gray-400">24h High</dt>
                        <dd>{formatPrice(coin.high_24h)}</dd>
                    </div>
                    <div>
                        <dt className="text-sm text-gray-400">24h Low</dt>
                        <dd>{formatPrice(coin.low_24h)}</dd>
                    </div>
                </div>
                <div>
                <h3 className="mt-4 font-bold text-lg">Price Chart (7 days)</h3>
                    <ResponsiveContainer width="100%" height={240}>
                    <LineChart data={chartData}>
                        <CartesianGrid  strokeDasharray="3 3" stroke="rgb(55, 65, 81)" />
                        <XAxis dataKey="time" />
                        <YAxis domain={["auto", "auto"]} />
                        <Tooltip
                            formatter={(value) => formatPrice(Number(value))}
                            contentStyle={{
                                backgroundColor: "rgba(31, 41, 55, 0.8)",
                                border: "1px solid rgb(72, 80, 94)",
                                borderRadius: 8,
                                color: "#e5e7eb",
                            }}
                        />
                        <Line type="monotone" dataKey="price" stroke="#8b5cf6" strokeWidth={3} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6">
                        <dt className="text-sm text-gray-400">Market Cap</dt>
                        <dd>${formatMarketCap(coin.market_cap)}</dd>
                    </div>
                    <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6">
                        <dt className="text-sm text-gray-400">24h Volume</dt>
                        <dd>${formatMarketCap(coin.total_volume)}</dd>
                    </div>
                     <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6">
                        <dt className="text-sm text-gray-400">Circulating Supply</dt>
                        <dd>{coin.market_data.circulating_supply?.toLocaleString() || "N/A"}</dd>
                    </div>
                    <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6">
                        <dt className="text-sm text-gray-400">Total Supply</dt>
                        <dd>{coin.market_data.total_supply?.toLocaleString() || "N/A"}</dd>
                    </div>    
                </div> 
                <footer className="text-center text-gray-200 text-xs border-t-1 border-violet-500 mt-8">
                    <p className="mt-4">Data provided by CoinGecko API • Updated every 30 seconds</p>
                </footer> 
        </div>
    )
}