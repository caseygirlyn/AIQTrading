import React, { useState, useEffect } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function BiggestLosers() {
    const [marketLosers, setMarketLosers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiKey = import.meta.env.VITE_API_KEY_FMP_2; // Netlify ENV variable

    useEffect(() => {
        const fetchMarketLosers = async () => {
            try {
                // https://financialmodelingprep.com/api/v3/stock_market/losers?apikey={APIKEY}
                const response = await fetch(`https://financialmodelingprep.com/api/v3/stock_market/losers?apikey=${apiKey}`); // PROD

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setMarketLosers(shuffleData(data));
            } catch (error) {
                try {
                    const fallbackResponse = await fetch(`/losers.json`); // Fallback data in case maximum request has been reached :)
                    const fallbackData = await fallbackResponse.json();
                    setMarketLosers(shuffleData(fallbackData));
                }
                catch (error) {
                    setError('An error occurred while fetching data');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchMarketLosers();
    }, []);

    function shuffleData(data) {
        for (let i = data.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [data[i], data[j]] = [data[j], data[i]];
        }
        return data;
    }

    return (
        <div className='pt-2 wrapper'>
            {loading ? (
                <div className="spinner-border text-info mx-auto my-3 d-block" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <ul className='marquee mb-0'>
                    {marketLosers.map(stock => (
                        <li key={stock.symbol} className='my-2 px-0 text-center col-lg-1 inv d-inline-block'>
                            <OverlayTrigger
                                placement='top'
                                overlay={
                                    <Tooltip id={stock.symbol}>
                                        {stock.name}
                                    </Tooltip>
                                }
                            >
                                <label variant="secondary" role="button">
                                    <span className='p-1 d-block'>{stock.symbol}</span>
                                    <span className="p-1 text-danger">
                                        {stock.changesPercentage.toFixed(2)}%<i className="bi bi-arrow-down-short"></i>
                                    </span>
                                </label>
                            </OverlayTrigger>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default BiggestLosers
