import React from 'react';
import { useQuery } from 'react-query';

const fetchOrders = async () => {
    const apiKey = import.meta.env.VITE_ALPACA_API_KEY;
    const secretKey = import.meta.env.VITE_ALPACA_SECRET_KEY;

    const response = await fetch('https://paper-api.alpaca.markets/v2/orders', {
        method: 'GET',
        headers: {
            'APCA-API-KEY-ID': apiKey,
            'APCA-API-SECRET-KEY': secretKey,
            'Content-Type': 'application/json',
        },
    });

    return response.json();
};

const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${day}-${month} ${hours}:${minutes}`;
};

const OrderStatus = () => {
    const { data: orders, error, isLoading, isError } = useQuery('orders', fetchOrders, {
        refetchInterval: 60000, // Fetch data every 1 minute
    });

    if (isLoading) {
        return <div className="spinner-border text-info mx-auto my-3 d-block" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            {orders.length >= 1 && (
                <>
                    <div className="table-responsive">
                        <table className='table table-striped mb-0 w-100'>
                            <thead>
                                <tr className='text-uppercase'>
                                    <th className='bg-primary-color fw-normal text-white'>Symbol</th>
                                    <th className='bg-primary-color fw-normal text-white'>Status</th>
                                    <th className='bg-primary-color fw-normal text-white'>Qty</th>
                                    <th className='bg-primary-color fw-normal text-white'>Side</th>
                                    <th className='bg-primary-color fw-normal text-white text-nowrap'>Submitted At</th>
                                    <th className='bg-primary-color fw-normal text-white text-nowrap'>Order ID</th>
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
                            </tbody>
                        </table>
                    </div>
                </>
            )}
            { orders.length == 0 && (<div className='my-2'>No Pending Orders</div>)}
        </>
    );
};

export default OrderStatus;