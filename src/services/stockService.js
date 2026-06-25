const API_KEY = import.meta.env.VITE_API_KEY_FMP_1;

export const getStockData = async (symbol) => {
    const ticker = symbol.trim().toUpperCase();
    const [profileRes, priceChangeRes] = await Promise.all([
        fetch(`https://financialmodelingprep.com/stable/profile?symbol=${ticker}&apikey=${API_KEY}`),
        fetch(`https://financialmodelingprep.com/stable/stock-price-change?symbol=${ticker}&apikey=${API_KEY}`)
    ]);

    if (!profileRes.ok) {
        throw new Error("Failed to fetch company profile");
    }

    if (!priceChangeRes.ok) {
        throw new Error("Failed to fetch price changes");
    }

    const [profile, priceChange] = await Promise.all([
        profileRes.json(),
        priceChangeRes.json()
    ]);

    if (!Array.isArray(profile) || profile.length === 0) {
        throw new Error("Stock symbol not found");
    }

    return {
        profile: profile[0],
        priceChange: priceChange[0]
    };
};