import React, { useState, useEffect } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { getBiggestLoseGainVariable } from '../utils/environment.js';

function BiggestGainers() {
    const [marketGainers, setMarketGainers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiKey1 = import.meta.env.VITE_API_KEY_FMP_1; // Netlify ENV variable

    useEffect(() => {
        const fetchMarketGainers = async () => {
            try {
                // https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey={APIKEY}
                const response = await fetch(`https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey=${apiKey1}`); // PROD

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setMarketGainers(shuffleData(data));
            }
            catch (error) {
                try {
                    const fallbackResponse = await fetch(`/gainers.json`); // Fallback data in case maximum request has been reached :)
                    const fallbackData = await fallbackResponse.json();
                    setMarketGainers(shuffleData(fallbackData));
                }
                catch (error) {
                    setError('An error occurred while fetching data');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchMarketGainers();
    }, []);

    function shuffleData(data) {
        for (let i = data.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [data[i], data[j]] = [data[j], data[i]];
        }
        return data;
    }

    return (
        <div className='container py-2'>
            {loading ? (
                <div className="spinner-border text-info mx-auto my-3 d-block" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className='row'>
                    {marketGainers.slice(0, 12).map(stock => (
                        <div key={stock.symbol} className='my-2 px-0 text-center col-lg-1 col-md-2 col-4 inv'>
                            <div>
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
                                        <span className="p-1 text-success">
                                            {stock.changesPercentage.toFixed(2)}%
                                        </span>
                                    </label>
                                </OverlayTrigger>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default BiggestGainers
