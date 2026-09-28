const BASE_URL = "https://api.coingecko.com/api/v3"
const API_KEY = import.meta.env.VITE_COINGECKO_API_KEY

export interface Crypto {
    id: string
    name: string
    symbol: string
    image: string
    current_price: number
    market_cap_rank: number
    price_change_percentage_24h: number
    low_24h: number
    high_24h: number
    market_cap: number
    total_volume: number
}

export interface CryptoDetails extends Crypto {
    market_data: {
        circulating_supply: number | null
        total_supply: number | null
    }
}

export interface MarketChartData {
    prices: [number, number][]
}

export const fetchCryptos = async (): Promise<Crypto[]> => {
    const response = await fetch(`${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`, {
        headers: API_KEY ? { "x-cg-demo-api-key": API_KEY } : undefined,
    })
    if (!response.ok) {
        const error = await response.text()
        throw new Error(`Failed to fetch cryptos (${response.status}): ${error}`)
    }

    return response.json()
}

export const fetchCoinData = async (id: string): Promise<CryptoDetails> => {
    const params = new URLSearchParams({
        localization: "false",
        tickers: "false",
        market_data: "true",
        community_data: "false",
        developer_data: "false",
        sparkline: "false",
    })
    const response = await fetch(`${BASE_URL}/coins/${encodeURIComponent(id)}?${params}`, {
        headers: API_KEY ? { "x-cg-demo-api-key": API_KEY } : undefined,
    })
    if (!response.ok) {
        const error = await response.text()
        throw new Error(`Failed to fetch coin (${response.status}): ${error}`)
    }

    const details = await response.json()
    const marketData = details.market_data

    return {
        id: details.id,
        name: details.name,
        symbol: details.symbol,
        image: details.image.large,
        current_price: marketData.current_price.usd,
        market_cap_rank: details.market_cap_rank ?? 0,
        price_change_percentage_24h: marketData.price_change_percentage_24h ?? 0,
        low_24h: marketData.low_24h.usd,
        high_24h: marketData.high_24h.usd,
        market_cap: marketData.market_cap.usd,
        total_volume: marketData.total_volume.usd,
        market_data: {
            circulating_supply: marketData.circulating_supply,
            total_supply: marketData.total_supply,
        },
    }
}

export const fetchChartData = async (id: string): Promise<MarketChartData> => {
    const params = new URLSearchParams({
        vs_currency: "usd",
        days: "7",
    })
    const response = await fetch(`${BASE_URL}/coins/${encodeURIComponent(id)}/market_chart?${params}`, {
        headers: API_KEY ? { "x-cg-demo-api-key": API_KEY } : undefined,
    })
    if (!response.ok) {
        const error = await response.text()
        throw new Error(`Failed to fetch chart (${response.status}): ${error}`)
    }

    return response.json()
}