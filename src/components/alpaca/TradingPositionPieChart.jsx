import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, ArcElement } from 'chart.js'

Chart.register(ArcElement);

const TradingPositionsPieChart = () => {
    const [positionsData, setPositionsData] = useState(null);
    const [error, setError] = useState(null);
    const apiKey = import.meta.env.VITE_ALPACA_API_KEY;
    const secretKey = import.meta.env.VITE_ALPACA_SECRET_KEY;

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch trading positions data from Alpaca API
                const response = await axios.get('https://paper-api.alpaca.markets/v2/positions', {
                    headers: {
                        'APCA-API-KEY-ID': apiKey,
                        'APCA-API-SECRET-KEY': secretKey,
                        'Content-Type': 'application/json'
                    },
                });
                const positions = response.data;

                // Process data for Chart.js
                const labels = positions.map(position => position.symbol);
                const data = positions.map(position => position.qty);
                const bgColor = [
                    '#f66384',
                    '#39a2eb',
                    '#9966ff',
                    '#facd56',
                    '#4bc0c0',
                    '#ff9f40',
                    '#6399f6',
                    '#81d584',
                    '#80c2d1',
                    '#ffc2d1',
                ];
                const backgroundColors = positions.map((_, index) => bgColor[index]);

                setPositionsData({
                    labels: labels,
                    datasets: [
                        {
                            data: data,
                            backgroundColor: backgroundColors,
                            borderColor: '#eee',
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (error) {
                setError('Failed to fetch trading positions');
                console.error('Error fetching trading positions:', error);
            }
        };

        fetchData(); // Initial fetch

        const interval = setInterval(fetchData, 60000); // Refresh data every minute

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        <div className='p-lg-3 mb-4 mb-lg-0 pie'>
            <h2 className='fs-4'>Allocations</h2>
            {error && <p>{error}</p>}
            {positionsData && (
                <Pie
                    data={positionsData}
                    options={{
                        maintainAspectRatio: false, // Prevent chart from being cut off
                    }}
                />
            )}
        </div>
    );
};

export default TradingPositionsPieChart;