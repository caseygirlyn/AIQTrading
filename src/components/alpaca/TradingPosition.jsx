import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TradingPosition = () => {
    const [positions, setPositions] = useState([]);
    const [loading, setLoading] = useState(true);
    const apiKey = import.meta.env.VITE_ALPACA_API_KEY;
    const secretKey = import.meta.env.VITE_ALPACA_SECRET_KEY;


    const fetchPositions = async () => {
        try {
            const response = await axios.get('https://paper-api.alpaca.markets/v2/positions', {
                headers: {
                    'APCA-API-KEY-ID': apiKey,
                    'APCA-API-SECRET-KEY': secretKey,
                    'Content-Type': 'application/json'
                },
            });
            setPositions(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching positions:', error);
        }
    };

    useEffect(() => {
        fetchPositions(); // Initial fetch

        const interval = setInterval(() => {
            fetchPositions(); // Fetch positions every 2 seconds
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

    return (
        <>
            <div className="table-responsive">
                <table className='table table-striped mb-0 w-100'>
                    <thead>
                        <tr>
                            <th className='bg-primary-color text-white fw-normal text-start'>ASSET</th>
                            <th className='bg-primary-color text-white fw-normal text-end'>QTY</th>
                            <th className='bg-primary-color text-white fw-normal text-end text-nowrap'>AVG. ENTRY PRICE</th>
                            <th className='bg-primary-color text-white fw-normal text-end text-nowrap'>CURRENT PRICE</th>
                            <th className='bg-primary-color text-white fw-normal text-end text-nowrap'>MARKET VALUE</th>
                            <th className='bg-primary-color text-white fw-normal text-end text-nowrap'>P/L ($)</th>
                            <th className='bg-primary-color text-white fw-normal text-end text-nowrap'>P/L (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {positions.map((position, index) => (
                            <tr key={index}>
                                <td className='text-start'>{position.symbol}</td>
                                <td className='text-end'>{position.qty}</td>
                                <td className='text-end'>{formatCurrency('USD', position.avg_entry_price)}</td>
                                <td className='text-end'>{formatCurrency('USD', position.current_price)}</td>
                                <td className='text-end'>{formatCurrency('USD', position.market_value)}</td>
                                <td className={`text-nowrap text-end ${position.unrealized_pl > 0.00 ? 'text-success' : 'text-danger'}`}>{formatCurrency('USD', position.unrealized_pl)}</td>
                                <td className={`text-nowrap text-end ${position.unrealized_pl > 0.00 ? 'text-success' : 'text-danger'}`}>
                                    {(position.unrealized_plpc * 100).toFixed(2)}%
                                    {position.unrealized_pl > 0.00 ? <i className="bi bi-arrow-up-short text-success"></i> : <i className="bi bi-arrow-down-short text-danger"></i>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default TradingPosition;