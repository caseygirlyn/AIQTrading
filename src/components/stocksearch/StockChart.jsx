import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    TimeScale,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";

import "chartjs-adapter-date-fns";
import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    TimeScale,
    Tooltip,
    Legend,
    Filler,
    zoomPlugin
);

const POLYGON_API_KEY = import.meta.env.VITE_API_KEY_POLYGON_2;

export default function StockChart({ symbol, isDarkMode }) {
    const [stockData, setStockData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!symbol) return;

        const fetchChartData = async () => {
            setLoading(true);
            setError("");

            try {
                const today = new Date();

                const from = new Date();
                from.setDate(today.getDate() - 30);

                // Add 1 day to ensure today's bars are included
                const to = new Date();
                to.setDate(to.getDate() + 1);

                const fromDate = from.toISOString().split("T")[0];
                const toDate = to.toISOString().split("T")[0];

                const endpoint =
                    `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/15/minute/${fromDate}/${toDate}?adjusted=true&sort=asc&limit=50000&apiKey=${POLYGON_API_KEY}`;

                console.log(endpoint);

                const response = await fetch(endpoint);

                if (!response.ok) {
                    throw new Error("Failed to fetch chart data");
                }

                const data = await response.json();

                if (!data.results?.length) {
                    throw new Error("No chart data available");
                }

                const timestamps = data.results.map(item => new Date(item.t));

                const closingPrices = data.results.map(item => item.c);

                setStockData({
                    timestamps,
                    closingPrices,
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchChartData();
    }, [symbol]);

    if (loading) {
        return (
            <div className="text-center py-4">
                Loading chart...
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger">
                {error}
            </div>
        );
    }

    if (!stockData) return null;

    const minDate = stockData.timestamps[0];
    const maxDate = stockData.timestamps[stockData.timestamps.length - 1];

    const chartData = {
        labels: stockData.timestamps,
        datasets: [
            {
                label: symbol,
                data: stockData.closingPrices,
                borderColor: "#0dcaf0",
                borderWidth: 1,
                backgroundColor: "rgba(13, 202, 240, 0.15)",
                fill: true,
                tension: 0.1,
                pointRadius: 0,
                pointHoverRadius: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            zoom: {
                pan: {
                    enabled: true,
                    mode: "x",
                },
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true,
                    },
                    mode: "x",
                },
            },
            legend: {
                display: true,
                labels: {
                    color: isDarkMode ? "#fff" : "#000",
                }
            },
        },

        scales: {
            x: {
                type: "time",

                time: {
                    unit: "day",
                },

                ticks: {
                    maxTicksLimit: 8,
                    color: isDarkMode ? "#fff" : "#000",
                    maxRotation: 0,
                    autoSkip: true,
                },
                min: minDate,
                max: maxDate,
                grid: {
                    color: isDarkMode
                        ? "rgba(255,255,255,.1)"
                        : "rgba(0,0,0,.1)",
                },

                border: {
                    color: isDarkMode ? "#fff" : "#000",
                },
            },

            y: {
                beginAtZero: false,
                ticks: {
                    color: isDarkMode ? "#fff" : "#000",
                },
            },
        },
    };

    return (
        <div
            className="card mt-1 rounded-1 mb-4"
            style={{ height: "444px" }}
        >
            <Line data={chartData} options={options} />
        </div>
    );
}