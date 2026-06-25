// services/tradingEngine.js

import { getMarketData } from "./marketService";
import { computeSignals } from "./signalEngine";
import { analyzeWithAI } from "./aiAnalysis";

export async function getTradingInsight(symbol) {
    const market = await getMarketData(symbol);

    const signals = computeSignals(
        market.history,
        market.currentPrice
    );

    const ai = await analyzeWithAI({
        symbol,
        currentPrice: market.currentPrice,
        profile: market.profile,
        signals,
    });

    return {
        market,
        signals,
        ai,
        timestamp: Date.now(),
    };
}