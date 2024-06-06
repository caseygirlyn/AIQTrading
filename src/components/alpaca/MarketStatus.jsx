import React, { useState } from 'react';
import { useQuery } from 'react-query';

const MarketStatus = () => {
    const apiKey = import.meta.env.VITE_ALPACA_API_KEY;
    const secretKey = import.meta.env.VITE_ALPACA_SECRET_KEY;
    const { data, error, isLoading } = useQuery('marketStatus', async () => {
        const response = await fetch('https://paper-api.alpaca.markets/v2/clock', {
            method: 'GET',
            headers: {
                'APCA-API-KEY-ID': apiKey,
                'APCA-API-SECRET-KEY': secretKey,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch market status');
        }

        const data = await response.json();
        const { is_open } = data;
        const status = is_open ? 'Open' : 'Closed';
        localStorage.setItem('marketStatus', status);
        return status;
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <small className={`mt-1 small ${data === 'Open' ? 'text-success' : 'text-secondary'}`}><i className="bi bi-info-circle ms-3 me-1"></i>Market {data}</small>
    );
};

export default MarketStatus;