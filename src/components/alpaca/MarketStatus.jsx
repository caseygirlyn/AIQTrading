import React, { useState, useEffect } from 'react';

const MarketStatus = () => {
    const [marketStatus, setMarketStatus] = useState('');
    const apiKey = import.meta.env.VITE_ALPACA_API_KEY;
    const secretKey = import.meta.env.VITE_ALPACA_SECRET_KEY;

    useEffect(() => {
        const fetchMarketStatus = async () => {
            try {
                const response = await fetch('https://paper-api.alpaca.markets/v2/clock', {
                    method: 'GET',
                    headers: {
                        'APCA-API-KEY-ID': apiKey,
                        'APCA-API-SECRET-KEY': secretKey,
                        'Content-Type': 'application/json'
                    }
                });
                const { is_open } = response.json();
                setMarketStatus(is_open ? 'Open' : 'Closed');
            } catch (error) {
                console.error('Error fetching market status:', error);
                setMarketStatus('Error');
            }
        };

        // Fetch market status initially and then every hour
        fetchMarketStatus();
        const interval = setInterval(fetchMarketStatus, 3600000);

        return () => clearInterval(interval); // Cleanup interval
    }, []);

    return (
        <>
            <small className={`mt-1 small ${marketStatus === 'Open' ? 'text-success' : 'text-secondary'}`}><i className="bi bi-info-circle ms-3 me-1"></i>Market {marketStatus}</small>
        </>
    );
};

export default MarketStatus;