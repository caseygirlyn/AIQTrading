import axios from 'axios';

const apiKey = import.meta.env.VITE_ALPACA_API_KEY;
const secretKey = import.meta.env.VITE_ALPACA_SECRET_KEY;

export const getTransactionHistory = async () => {

    const response = await fetch('https://paper-api.alpaca.markets/v2/account/activities', {
        method: 'GET',
        headers: {
            'APCA-API-KEY-ID': apiKey,
            'APCA-API-SECRET-KEY': secretKey,
            'Content-Type': 'application/json',
        },
    });

    return response.json();
};
