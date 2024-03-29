import React, { useState, useEffect } from 'react';

const OrderStatus = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const apiKey = import.meta.env.VITE_ALPACA_API_KEY;
    const secretKey = import.meta.env.VITE_ALPACA_SECRET_KEY;

    const fetchOrders = async () => {
        try {
            const response = await fetch('https://paper-api.alpaca.markets/v2/orders', {
                method: 'GET',
                headers: {
                    'APCA-API-KEY-ID': apiKey,
                    'APCA-API-SECRET-KEY': secretKey,
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }

            const data = await response.json();
            setOrders(data);
            setError(null);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchOrders(); // Initial fetch

        const interval = setInterval(() => {
            fetchOrders(); // Fetch positions every 1 minute
        }, 60000);

        return () => clearInterval(interval); // Cleanup on unmount

    }, []);

    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}-${day}-${month} ${hours}:${minutes}`;
    };

    return (
        <>
            <div className='mb-4'>
                <h2 className='fs-4'>Order Status</h2>
                <div className="table-responsive">
                    <table className='table table-striped mb-0 w-100'>
                        <thead>
                            <tr className='text-uppercase'>
                                <th className='bg-primary-color fw-normal text-white'>Symbol</th>
                                <th className='bg-primary-color fw-normal text-white'>Status</th>
                                <th className='bg-primary-color fw-normal text-white'>Qty</th>
                                <th className='bg-primary-color fw-normal text-white'>Side</th>
                                <th className='bg-primary-color fw-normal text-white'>Submitted At</th>
                                <th className='bg-primary-color fw-normal text-white'>Order ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td>{order.symbol}</td>
                                    <td className='text-capitalize'>{order.status}</td>
                                    <td>{order.qty}</td>
                                    <td className='text-capitalize'>{order.side}</td>
                                    <td className='text-nowrap'>{formatDateTime(order.submitted_at)}</td>
                                    <td className='text-nowrap'>{order.id}</td>
                                </tr>
                            ))}
                            {orders.length === 0 && ( <tr><td colSpan={6} className='text-center'>No pending orders.</td></tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default OrderStatus;
