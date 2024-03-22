import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, Filler } from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    TimeScale,
    Title,
    Tooltip,
    Legend,
    Filler
);

const PortfolioGraph = (props) => {
    const [portfolioData, setPortfolioData] = useState(null);
    const [error, setError] = useState(null);
    const apiKey = import.meta.env.VITE_ALPACA_API_KEY;
    const secretKey = import.meta.env.VITE_ALPACA_SECRET_KEY;
    const [stockData, setStockData] = useState([]);
    let color = (props.isDarkMode) ? 'rgb(13, 202, 240)' : 'rgb(58, 64, 80)';
    let labelColor = (props.isDarkMode) ? 'rgb(255, 255, 255)' : 'rgb(58, 64, 80)';
    let bgcolor = (props.isDarkMode) ? 'rgb(67 202 240 / 10%)' : 'rgb(0 0 0 / 10%)';

    useEffect(() => {
        const fetchPortfolioData = async () => {
            try {
                const response = await fetch('https://paper-api.alpaca.markets/v2/account/portfolio/history', {
                    method: 'GET',
                    headers: {
                        'APCA-API-KEY-ID': apiKey,
                        'APCA-API-SECRET-KEY': secretKey,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch portfolio data');
                }

                const data = await response.json();
                //console.log(data);
                setPortfolioData(data);
                setError(null);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchPortfolioData();
    }, []);

    useEffect(() => {
        if (portfolioData) {

            const dates = portfolioData.timestamp.map(timestamp => formatDate(timestamp));
            const values = portfolioData.equity;
            setStockData({ dates, values });
        }
    }, [portfolioData]);

    const chartData = {
        labels: stockData.dates,
        datasets: [
            {
                label: 'Portfolio',
                data: stockData.values,
                fill: {
                    target: 'origin',
                    above: bgcolor
                },
                borderColor: color,
                pointBorderWidth: 0,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                labels: {
                    color: labelColor
                }
            }
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'year',
                }
            },
            y: {
                ticks: {
                    color: labelColor
                }
                // Configuration for the y-axis
            }
        }
    };

    const formatDate = (timestamp) => {
        const milliseconds = timestamp * 1000; // Convert seconds to milliseconds
        const date = new Date(milliseconds);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }


    return (
        <div className='px-lg-3 mb-4 mb-lg-0'>
            <h2 className='fs-4'>Portfolio Value Over Time</h2>
            {error && <p>Error: {error}</p>}
            <Line data={chartData} options={options} />
        </div>
    );
};

export default PortfolioGraph;
