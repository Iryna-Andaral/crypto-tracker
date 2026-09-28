import type { Crypto } from "../api/coinGeco"
import { formatPrice, formatMarketCap} from "../utils/formatter"
import { Link } from "react-router-dom"

interface CryptoProps {
    crypto: Crypto
}

export const CryptoCard = ({ crypto }: CryptoProps): React.ReactElement => {
  
    return (<Link to={`/coin/${crypto.id}`} className="no-underline">
    <div className="hover:scale-102 transition-all duration-600 cursor-pointer">
        <div className="bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 rounded-2xl p-px">
            <div className="hover:bg-slate-900 bg-gray-800 text-white p-6 rounded-[calc(1rem-1px)]">
                <img src={crypto.image} alt={crypto.name} className="w-6 h-6"/>
                <h3>{crypto.name}</h3>
                <p className="text-gray-400 text-xs">{crypto.symbol.toUpperCase()}</p>
                <span className="text-xs text-gray-900 bg-blue-200 px-2 py-0.5 rounded-lg">#{crypto.market_cap_rank}</span>
                <div className="mt-3">
                    <p className="font-bold mb-2">{formatPrice(crypto.current_price)}</p>
                    <p className={crypto.price_change_percentage_24h < 0
                        ? "inline-block bg-red-700/30 rounded px-1 py-0.2 text-red-200"
                        : "inline-block bg-green-700/30 rounded px-1 py-0.2 text-green-200"
                    }>
                        {crypto.price_change_percentage_24h < 0 
                        ? <span className="font-bold">↓ </span>
                        :<span className="font-bold">↑ </span>}
                        {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                    </p>
                    <div className="flex justify-between mt-3 border-t-2 border-gray-700">
                        <div>
                            <div className="text-xs text-gray-400 mt-2">Market Cap</div>
                            <div className="text-md">${formatMarketCap(crypto.market_cap)}</div>
                        </div>
                        <div className="text-left">
                            <div className="text-xs text-gray-400 mt-2">Volume</div>
                            <div className="text-md">${formatMarketCap(crypto.total_volume)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </Link>)
}