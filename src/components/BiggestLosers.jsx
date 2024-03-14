import React, { useState, useEffect } from 'react';

function BiggestLosers() {
    const [marketLosers, setMarketLosers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMarketLosers = async () => {
            try {
                const BASEURL = "https://financialmodelingprep.com/api/v3/profile/";

                //const response = await fetch(BASEURL + query + "?" + APIKEY);
                const response = await fetch(`/losers.json`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setMarketLosers(data);
            } catch (error) {
                setError('An error occurred while fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchMarketLosers();
    }, []);

    return (
        <div className='container'>
            {loading ? (
                <div className="spinner-border text-info mx-auto my-5 d-block" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className='row pb-3'>
                    {marketLosers.slice(0, 20).map(stock => (
                        <div key={stock.symbol} className='my-2 text-center col-md-3 col-6'>
                            <div className='p-1 w-100'>{stock.name}</div>
                            <div>
                                <span className='p-1'>{stock.symbol}</span>
                                <span className="p-1 text-danger">
                                    {stock.changesPercentage.toFixed(2)}%
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default BiggestLosers
