const API_KEY = import.meta.env.VITE_API_KEY_FMP_1;

function normalizeResponse(payload) {
    if (Array.isArray(payload)) return payload[0] ?? null;
    if (payload && typeof payload === "object") return payload;
    return null;
}

async function fetchJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }
    return response.json();
}

export async function getMarketData(symbol) {
    try {
        const [profileRes, quoteRes, historyRes] = await Promise.all([
            fetchJson(`https://financialmodelingprep.com/stable/profile?symbol=${symbol}&apikey=${API_KEY}`),
            fetchJson(`https://financialmodelingprep.com/stable/stock-price-change?symbol=${symbol}&apikey=${API_KEY}`),
            fetchJson(`https://financialmodelingprep.com/stable/historical-price-eod/full?symbol=${symbol}&apikey=${API_KEY}`)
        ]);

        const profile = normalizeResponse(profileRes);
        const quote = normalizeResponse(quoteRes);
        const history = Array.isArray(historyRes?.historical) ? historyRes.historical : [];

        return {
            symbol,
            profile,
            currentPrice: typeof quote?.price === 'number' ? quote.price : null,
            history,
        };
    } catch (error) {
        console.warn('Falling back to local market data:', error);

        const fallbackResponse = await fetch('/marketWatch.json');
        if (!fallbackResponse.ok) {
            return {
                symbol,
                profile: null,
                currentPrice: null,
                history: [],
            };
        }

        const fallbackData = await fallbackResponse.json();
        const entry = fallbackData?.results?.find((item) => item?.symbol === symbol) || fallbackData?.[0] || null;

        return {
            symbol,
            profile: entry?.profile || null,
            currentPrice: entry?.price ?? null,
            history: entry?.history || [],
        };
    }
}