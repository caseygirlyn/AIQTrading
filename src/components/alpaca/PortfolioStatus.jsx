import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PortfolioStatus = () => {
    const [portfolio, setPortfolio] = useState(null);
    const [loading, setLoading] = useState(true);
    const apiKey = import.meta.env.VITE_ALPACA_API_KEY;
    const secretKey = import.meta.env.VITE_ALPACA_SECRET_KEY;

    const fetchPortfolio = async () => {
        try {
            const response = await axios.get('https://paper-api.alpaca.markets/v2/account', {
                headers: {
                    'APCA-API-KEY-ID': apiKey,
                    'APCA-API-SECRET-KEY': secretKey,
                    'Content-Type': 'application/json'
                },
            });
            setPortfolio(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching portfolio:', error);
        }
    };

    useEffect(() => {
        fetchPortfolio(); // Initial fetch

        const interval = setInterval(() => {
            fetchPortfolio(); // Fetch portfolio every 2 seconds
        }, 2000);

        return () => clearInterval(interval); // Cleanup on unmount

    }, []);

    const formatCurrency = (currency, price) => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        });

        return formatter.format(price);
    };

    const calculatePercentageChange = (oldValue, newValue) => {
        const oldValueFloat = parseFloat(oldValue);
        const newValueFloat = parseFloat(newValue);

        if (!isNaN(oldValueFloat) && !isNaN(newValueFloat) && oldValueFloat !== 0) {
            const change = ((newValueFloat - oldValueFloat) / oldValueFloat) * 100;
            return change.toFixed(2);
        }
    };

    return (
        <div className='d-inline-flex portfolio-stat'>
            {loading ? (
                <div className="spinner-border text-info mx-auto my-3 d-block" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            ) : (
                <>
                    <div className="pe-3 border-right mb-3" style={{ borderRight: '1px solid #3b404e' }}>
                        <span className="p-1 d-block fs-6">PORTFOLIO</span>
                        <span className="p-1 fs-3">{formatCurrency('USD', portfolio.equity)}</span>
                    </div>
                    <div className="px-3 border-right mb-3" style={{ borderRight: '1px solid #3b404e' }}>
                        <span className="p-1 d-block fs-6">FREE FUNDS</span>
                        <span className="p-1 fs-3">{formatCurrency('USD', portfolio.buying_power)}</span>
                    </div>
                    <div className="px-3 mb-3">
                        <span className="p-1 d-block fs-6">RETURN</span>
                        <span className={`p-1 fs-3 ${calculatePercentageChange(portfolio.last_equity, portfolio.equity) > 0 ? 'text-success' : 'text-danger'}`}>
                            {calculatePercentageChange(portfolio.last_equity, portfolio.equity)}%
                            {calculatePercentageChange(portfolio.last_equity, portfolio.equity) > 0 ? <i className="bi bi-arrow-up-short text-success"></i> : <i className="bi bi-arrow-down-short text-danger"></i>}
                        </span>
                    </div>
                </>
            )}
        </div>
    );
};

export default PortfolioStatus;