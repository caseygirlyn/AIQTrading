// services/signalEngine.js

export function computeSignals(history, currentPrice) {
    if (!history || history.length < 5) {
        return null;
    }

    const closes = history.map(d => d.price || d.c);

    const ma5 =
        closes.slice(-5).reduce((a, b) => a + b, 0) / 5;

    const ma20 =
        closes.slice(-20).reduce((a, b) => a + b, 0) / 20 || ma5;

    const trend =
        ma5 > ma20 ? "Bullish" :
            ma5 < ma20 ? "Bearish" :
                "Neutral";

    const support = Math.min(...closes.slice(-20));
    const resistance = Math.max(...closes.slice(-20));

    const momentum =
        ((ma5 - ma20) / ma20) * 100;

    return {
        ma5,
        ma20,
        trend,
        support,
        resistance,
        momentum: Number(momentum.toFixed(2)),
    };
}