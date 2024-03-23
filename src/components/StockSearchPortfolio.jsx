import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, Filler } from 'chart.js';
import 'chartjs-adapter-date-fns';
import CompanyProfile from './common/Tables/CompanyProfile';
import PriceChange from './common/Tables/PriceChange';

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

const apiKey3 = import.meta.env.VITE_API_KEY_FMP_3; // Netlify ENV variable
const apiKeyNews = import.meta.env.VITE_API_KEY_POLYGON_2; // Netlify ENV variable

const StockSearchPortfolio = (props) => {
    const [query, setQuery] = useState('');
    const [parseQuery, setParseQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [priceChange, setPriceChange] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [stockData, setStockData] = useState([]);

    let color = (props.isDarkMode) ? 'rgb(13, 202, 240)' : 'rgb(58, 64, 80)';
    let labelColor = (props.isDarkMode) ? 'rgb(255, 255, 255)' : 'rgb(58, 64, 80)';
    let bgcolor = (props.isDarkMode) ? 'rgb(67 202 240 / 10%)' : 'rgb(0 0 0 / 10%)';

    const handleChange = event => {
        setQuery(event.target.value.toUpperCase());
    };

    const handleSubmit = async event => {
        event.preventDefault();
        setParseQuery('');
        setError(null);
        setLoading(true);

        const today = new Date();
        const startDate = new Date(today);

        (today.getDay() === 0 || today.getDay() === 1) ? startDate.setDate(today.getDate() - 2) : startDate.setDate(today.getDate() - 1)

        let todayFormatted = formatDate(today);
        let startDateFormatted = formatDate(startDate);

        const baseUrl = "https://financialmodelingprep.com/api/v3/";

        try {
            // Define multiple fetch requests
            // https://financialmodelingprep.com/api/v3/profile/AAPL?apikey={APIKEY}

            const response = await fetch(`${baseUrl}profile/${query}?apikey=${apiKey3}`); // [PROD] Start Fetch Company Profile Data
            const responsePC = await fetch(`${baseUrl}stock-price-change/${query}?apikey=${apiKey3}`); // [PROD] Start Fetch Stock Price Change Data 

            // Make both requests concurrently using Promise.all()
            const [dataResponse, dataResponsePC] = await Promise.all([response, responsePC]);

            // Parse the response data
            const data = await dataResponse.json();
            const dataPC = await dataResponsePC.json();

            if (data.length === 0) {
                throw new Error('Failed to fetch data');
            }

            // Set the response data to the state
            setSearchResults(data);
            setPriceChange(dataPC);

            const searchedStocks = JSON.parse(localStorage.getItem('searchedStocks')) || [];
            const stockInfo = {
                symbol: query,
                name: data[0].companyName,
            };
            const existingIndex = searchedStocks.findIndex(stock => stock.symbol === query);
            if (existingIndex !== -1) {
                // If the symbol exists, remove it from its current position
                searchedStocks.splice(existingIndex, 1);
            }

            searchedStocks.unshift(stockInfo); // Add the new search to the beginning of the array
            searchedStocks.splice(10); // Keep only the last 10 searches
            localStorage.setItem('searchedStocks', JSON.stringify(searchedStocks));

        } catch (error) {
            setError('An error occurred while fetching data');
        } finally {
            setParseQuery(query);
        }

        // Start Fetch Stock Historical Chart Data
        try {
            // https://financialmodelingprep.com/api/v3/historical-chart/1hour/AAPL?from=2023-08-10&to=2023-09-10&apikey={APIKEY}
            // 1min, 5min, 15min, 30min, 1hour, 4hour

            const endPoint = `${baseUrl}historical-chart/15min/${query}?from=${startDateFormatted}&to=${todayFormatted}&apikey=${apiKey3}`; // [PROD] Start Fetch Stock Historical Chart Data
            const responseCHART = await fetch(endPoint);

            if (!responseCHART.ok) {
                throw new Error('Failed to fetch data');
            }

            const dataChart = await responseCHART.json();
            const timestamps = dataChart.map(timestamp => timestamp.date);
            const openingPrices = dataChart.map(timestamp => timestamp.open);
            const closingPrices = dataChart.map(timestamp => timestamp.close);
            const highPrices = dataChart.map(timestamp => timestamp.high);
            const lowPrices = dataChart.map(timestamp => timestamp.low);

            setStockData({ timestamps, openingPrices, closingPrices, highPrices, lowPrices });

        } catch (error) {
            setError('An error occurred while fetching data');
        } finally {
            setLoading(false);
            setQuery('');
        }
        // End Fetch Stock Historical Chart Data
    };

    const handleReload = () => {
        window.location.reload();  // Reload the current route
    };

    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    const formatCurrency = (currency, price) => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        });

        return formatter.format(price);
    };

    const chartData = {
        labels: stockData.timestamps,
        datasets: [
            {
                label: 'Opening Price',
                data: stockData.openingPrices,
                borderColor: '#43caf0',
                pointBorderWidth: 0,
            },
            {
                label: 'Closing Price',
                data: stockData.closingPrices,
                borderColor: '#80c2d1',
                pointBorderWidth: 0,
            },
            {
                label: 'High',
                data: stockData.highPrices,
                borderColor: '#81d584',
                pointBorderWidth: 0,
            },
            {
                label: 'Low',
                data: stockData.lowPrices,
                borderColor: '#f66384',
                pointBorderWidth: 0,
            }
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
                    unit: 'day',
                    displayFormats: {
                        minute: 'HH:mm'
                    }
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

    return (
        <div className='mb-2'>
            <form onSubmit={handleSubmit} className='searchForm mb-4 m-auto'>
                <div className="input-group mb-0"><h2 className='fs-4 pe-2 mb-0'>Investment Search</h2>
                    <input
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        value={query}
                        name="search"
                        type="text"
                        className="form-control rounded-0 shadow-none"
                        placeholder="AAPL"
                        id="search" required
                    />
                    <button className="btn btn-outline-secondary rounded-0" type="submit" id="searchBtn"><i className="bi bi-search"></i></button>
                </div>
            </form>
            {
                (loading) && <div className="spinner-border text-info mx-auto my-5 d-block" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            }
            {error && <p className='text-center'>{error}</p>}
            {
                !loading && searchResults.length > 0 && <div><small className="btn-link text-secondary" role='button' onClick={handleReload}>Clear Search Result</small></div>
            }
            <div className='row'>
                <div className='col-lg-4 my-2'>
                    {searchResults.map(stock => (
                        <div key={stock.symbol}>
                            <div className='common-bg-primary-color float-start p-2 me-3 rounded-2'>
                                <img src={stock.image} height={50} /></div>
                            <div>
                                <span className='fs-5'>
                                    {stock.companyName} ({stock.symbol})
                                </span>
                            </div>
                            <div>
                                <span className='fs-5'>{formatCurrency(stock.currency, stock.price)}</span> <span className={stock.changes > 0 ? 'text-success' : 'text-danger'}>({((stock.changes / stock.price) * 100).toFixed(2)}%) {stock.changes}
                                    {stock.changes > 0 ? <i className="bi bi-arrow-up-short"></i> : <i className="bi bi-arrow-down-short"></i>}
                                </span>
                            </div>

                        </div>
                    ))}

                    {!loading && priceChange.length > 0 && (
                        <div className='mb-4'>
                            <PriceChange priceChange={priceChange} />
                        </div>
                    )}
                </div>
                <div className='col-lg-8'>
                    {
                        !loading && searchResults.length > 0 && (
                            <div className={props.isDarkMode ? 'bg-none' : 'bg-light rounded-1'}>
                                <Line data={chartData} options={options} />
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default StockSearchPortfolio
