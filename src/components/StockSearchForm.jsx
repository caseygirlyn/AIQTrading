import React, { useState } from "react";
import { getStockData } from "../services/stockService";
import { getTradingInsight } from "../services/tradingEngine";
import PriceChangeCard from "./stocksearch/PriceChangeCard";
import CompanyProfileCard from "./stocksearch/CompanyProfileCard";
import StockChart from "./stocksearch/StockChart";

export default function StockSearch({ isDarkMode }) {
    const [symbol, setSymbol] = useState("");
    const [profile, setProfile] = useState(null);
    const [priceChange, setPriceChange] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");
        setProfile(null);
        setPriceChange(null);
        setAnalysis(null);

        try {
            const data = await getStockData(symbol);
            setProfile(data.profile);
            setPriceChange(data.priceChange);

            const insight = await getTradingInsight(symbol);
            setAnalysis(insight);
        } catch (err) {
            let errorMessage = err.message;
            try {
                const errorObj = JSON.parse(err.message);
                if (errorObj?.error?.message) {
                    errorMessage = errorObj.error.message;
                }
            } catch {
                // If not JSON, use the original message
            }
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mb-4">

            <form onSubmit={handleSearch} className="searchForm mb-4 m-auto">
                <div className="input-group">
                    <input
                        id="search"
                        type="text"
                        className="form-control rounded-0 shadow-none"
                        placeholder="AAPL"
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                        required
                    />

                    <button className="btn btn-outline-secondary rounded-0" type="submit" id="searchBtn">
                        <i className="bi bi-search"></i>
                    </button>
                </div>
            </form>

            <div className="row">
                <div className="col-lg-4">
                    <CompanyProfileCard profile={profile} priceChange={priceChange} />
                    <PriceChangeCard priceChange={priceChange} />
                </div>

                <div className="col-lg-8">
                    {profile && (
                        <>
                            <StockChart symbol={profile.symbol} isDarkMode={isDarkMode} />

                            <div className="card mt-3 p-3">
                                <h4 className="mb-3">AI Analysis</h4>
                                {error && <div className="alert alert-danger">{error}</div>}
                                {loading ? (
                                    <p className="text-muted mb-0">Loading AI analysis...</p>
                                ) : analysis ? (
                                    <>
                                        <p className="mb-2 border p-3">{analysis.ai?.analysis ?? "No analysis available."}</p>
                                        <p className="mb-1 border p-3"><strong className="d-block mb-1">Risk:</strong> {analysis.ai?.risk ?? "No risk assessment available."}</p>
                                    </>
                                ) : null}
                            </div>

                        </>
                    )}
                </div>
            </div>

        </div>
    );
}