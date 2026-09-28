import { useEffect, useState } from "react"
import { fetchCryptos, type Crypto } from "../api/coinGeco"
import { CryptoCard } from "../components/CryptoCard"
import cryptoTrackerLogo from "../assets/crypto-tracker2.png"

export const Home = (): React.ReactElement => {
    const [cryptoList, setCryptoList] = useState<Crypto[]>([])
    const [filteredList, setFilteredList] = useState<Crypto[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [viewMode, setViewMode] = useState("grid")
    const [sortBy, setSortBy] = useState("market_cap_rank")
    const [searchQuery, setSearchQuery] = useState ("")

    const fetchCryptoData = async () => {
        try {
            const data = await fetchCryptos ()
            setCryptoList(data)
        } catch (err){
            console.error("Error fetchig crypto:", err);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect (()=>{
        void fetchCryptoData()
        const interval = setInterval(() => {
            void fetchCryptoData()
        }, 30000)

        return () => clearInterval(interval)
    }, [])

    const filterAndSort = () => {
        const filtered = cryptoList.filter((crypto) =>
            crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
        )
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "name":
                    return a.name.localeCompare(b.name)
                case "price":
                    return a.current_price - b.current_price
                case "price_desc":
                    return b.current_price - a.current_price
                case "price_change":
                    return b.price_change_percentage_24h - a.price_change_percentage_24h
                case "market_cap":
                    return b.market_cap - a.market_cap
                case "market_cap_rank":
                default:
                    return a.market_cap_rank - b.market_cap_rank
            }
        })
        setFilteredList(filtered)
    }

    useEffect(() => {
        filterAndSort()
    }, [sortBy, cryptoList, searchQuery])



    return (<>
    <div className="min-h-screen bg-gray-900 p-3 lg:p-4">
    <header className="mb-4 flex flex-col justify-between border-b border-violet-500 py-4 md:flex-row">
        <div className="flex">
            <img src={cryptoTrackerLogo} alt="Crypto Tracker" className="w-25"/>
            <div>
                <h1 className="inline-block bg-gradient-to-r from-blue-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-4xl font-bold text-transparent transition-transform duration-300 hover:-translate-y-1" style={{ filter: "drop-shadow(2px 1px 0 #312e81) drop-shadow(4px 2px 0 #1e1b4b) drop-shadow(6px 4px 10px rgba(15, 23, 42, 0.45))" }}>
                    Crypto Tracker
                </h1>
                <p className="text-gray-300 text-lg text-center">real-time cryptocurrency data</p>
             </div>
        </div>
        <div>
            <input
                type="text"
                placeholder="Search cryptos..."
                className="cursor-pointer rounded-3xl w-full mt-6 md:mt-0 md:w-md border border-gray-600 bg-gray-800 px-3 py-2 text-gray-200 outline-none transition-colors focus:border-gray-200 focus:ring-2 focus:ring-gray-200/30"
                onChange={ (e) => {setSearchQuery(e.target.value)}}
                value = {searchQuery}
            />
        </div>     
    </header>



        <div className="flex justify-between gap-3">
            <div className="text-gray-400">
                <label className="text-gray-300 mr-3">Sort by:</label>
                <select
                    className="cursor-pointer rounded-md border  mb-3 border-gray-600 bg-gray-800 p-1 text-gray-200 outline-none transition-colors focus:border-gray-200 focus:ring-2 focus:ring-gray-200/30"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}>
                    <option className="bg-gray-800 text-gray-200" value="market_cap_rank">Rank</option>
                    <option className="bg-gray-800 text-gray-200" value="name">Name</option>
                    <option className="bg-gray-800 text-gray-200" value="price">Price (Low to High)</option>
                    <option className="bg-gray-800 text-gray-200" value="price_desc">Price (High to Low)</option>
                    <option className="bg-gray-800 text-gray-200" value="price_change">24h change</option>
                    <option className="bg-gray-800 text-gray-200" value="market_cap">Market Cap</option>
                </select>
            </div>
            <div className="hidden md:block">
            <div className="flex justify-stretch gap-3 mb-3">
                <button className={viewMode === "grid"
                    ? "text-gray-300 py-1 px-2 rounded-lg border-2 border-gray-300"
                    : "text-gray-500 py-1 px-2 rounded-lg border-2 border-gray-500 hover:text-gray-400 hover:border-gray-400"}
                    onClick={() => setViewMode("grid")}> 
                    Grid
                </button>
                <button className={viewMode === "list"
                    ? "text-gray-300 py-1 px-2 rounded-lg border-2 border-gray-300"
                    : "text-gray-500 py-1 px-2 rounded-lg border-2 border-gray-500 hover:text-gray-400 hover:border-gray-400"
                    }
                    onClick={() => setViewMode("list")}>
                    List
                </button>
            </div>
            </div>
        </div>


        {isLoading ?
            <div className="flex flex-col items-center justify-center">
                <div role="status">
                        <svg aria-hidden="true" className="inline h-12 w-12 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className="text-sky-300" d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path className="text-fuchsia-500" d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04855 41.5694 10.4717 44.0502 10.1071C47.8511 9.54855 51.7194 9.52689 55.5402 10.0491C60.8648 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                    </svg>
                    <span className="sr-only">Loading crypto data...</span>
                </div>
                <p className="font-sm text-gray-300">Loading crypto data...</p>
            </div>
            :
            <section className={viewMode === "list" 
                ? "grid w-full grid-cols-1 gap-3"
                : "grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                }>
                {filteredList.map((crypto) => (
                    <CryptoCard key={crypto.id} crypto={crypto} />
                ))}
            </section>
        }
        <footer className="text-center text-gray-200 text-xs border-t-1 border-violet-500 mt-8">
            <p className="mt-4">Data provided by CoinGecko API • Updated every 30 seconds</p>
        </footer>
    </div>

    </>)
}