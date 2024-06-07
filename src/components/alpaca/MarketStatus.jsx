import React from 'react';
import { useQuery } from 'react-query';

const fetchMarketStatus = async () => {
    const apiKey = import.meta.env.VITE_ALPACA_API_KEY;
    const secretKey = import.meta.env.VITE_ALPACA_SECRET_KEY;

    const response = await fetch('https://paper-api.alpaca.markets/v2/clock', {
        method: 'GET',
        headers: {
            'APCA-API-KEY-ID': apiKey,
            'APCA-API-SECRET-KEY': secretKey,
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    const { is_open } = data;
    const status = is_open ? 'Open' : 'Closed';
    return status;
};

const MarketStatus = () => {
    const { data: marketStatus, error, isLoading, isError } = useQuery('marketStatus', fetchMarketStatus, {
        refetchInterval: 3600000, // Refetch every hour
    });

    localStorage.setItem('marketStatus', marketStatus);

    if (isLoading) {
        return <small className="ms-3 mt-1 small text-secondary">Loading...</small>;
    }

    if (isError) {
        return <small className="mt-1 small text-danger"><i className="bi bi-info-circle ms-3 me-1"></i>Error fetching market status</small>;
    }

    return (
        <small className={`mt-1 small ${marketStatus === 'Open' ? 'text-success' : 'text-secondary'}`}>
            <i className="bi bi-info-circle ms-3 me-1"></i>Market {marketStatus}
        </small>
    );
};

export default MarketStatus;