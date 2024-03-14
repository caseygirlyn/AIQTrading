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

const StockSearch = (props) => {
    const [query, setQuery] = useState('');
    const [parseQuery, setParseQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [priceChange, setPriceChange] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [stockData, setStockData] = useState([]);
    let endPoint = '';

    let color = (props.isDarkMode) ? 'rgb(13, 202, 240)' : 'rgb(58, 64, 80)';
    let labelColor = (props.isDarkMode) ? 'rgb(255, 255, 255)' : 'rgb(58, 64, 80)';
    let bgcolor = (props.isDarkMode) ? 'rgb(67 202 240 / 10%)' : 'rgb(0 0 0 / 10%)';

    const handleChange = event => {
        setQuery(event.target.value.toUpperCase());
    };

    const handleSubmit = async event => {
        setParseQuery('');
        event.preventDefault();
        setError(null);
        setLoading(true);

        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        const todayFormatted = formatDate(today);
        const yesterdayFormatted = formatDate(yesterday);

        const APIKEY = "apikey=MEMq3hGb4CgnNvgWqBSZkhHpSank9EtR";

        try {
            const BASEURL = "https://financialmodelingprep.com/api/v3/profile/";

            //const response = await fetch(BASEURL + query + "?" + APIKEY);
            const response = await fetch(`/AAPL.json`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            setError('An error occurred while fetching data');
        } finally {
            setParseQuery(query);
        }

        try {
            //https://financialmodelingprep.com/api/v3/stock-price-change/AAPL?apikey=MEMq3hGb4CgnNvgWqBSZkhHpSank9EtR

            const BASEURLPC = "https://financialmodelingprep.com/api/v3/stock-price-change/";
            const responsePC = await fetch(BASEURLPC + query + "?" + APIKEY);

            //const responsePC = await fetch(`/AAPL-PC.json`);
            if (!responsePC.ok) {
                throw new Error('Failed to fetch data');
            }
            const dataPC = await responsePC.json();
            setPriceChange(dataPC);
        } catch (error) {
            setError('An error occurred while fetching data');
        }

        try {
            const BASEURLCHART = "https://financialmodelingprep.com/api/v3/historical-chart/5min/";
            const DATERANGE = `?from=${yesterdayFormatted}&to=${todayFormatted}&`

            //let endPoint = BASEURLCHART + query + DATERANGE + APIKEY;
            let endPoint = `/AAPL-5min.json`;
            const responseCHART = await fetch(endPoint);

            if (!responseCHART.ok) {
                throw new Error('Failed to fetch data');
            }
            const dataChart = await responseCHART.json();

            const timestamps = dataChart.map(timestamp => timestamp.date);
            const closingPrices = dataChart.map(timestamp => timestamp.close);
            setStockData({ timestamps, closingPrices });

        } catch (error) {
            setError('An error occurred while fetching data');
        } finally {
            setLoading(false);
            setQuery('');
        }
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

    const chartData = {
        labels: stockData.timestamps,
        datasets: [
            {
                label: parseQuery,
                data: stockData.closingPrices,
                fill: {
                    target: 'origin',
                    above: bgcolor
                },
                borderColor: color,
                pointBorderWidth: 1,
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
        <div className='mb-4'>
            <form onSubmit={handleSubmit} className='searchForm'>
                <div className="input-group mb-2"><h2 className='fs-4 pe-2 mb-0'>Investment Search</h2>
                    <input
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        value={query}
                        name="search"
                        type="text"
                        className="form-control rounded-0 shadow-none"
                        placeholder="AAPL"
                        id="search"
                    />
                    <button className="btn btn-outline-secondary rounded-0" type="submit" id="searchBtn"><i className="bi bi-search"></i></button>
                </div>
            </form>
            
            {loading && <div className="spinner-border text-info mx-auto my-5 d-block" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>}
            {error && <p>{error}</p>}
            {searchResults.length > 0 && (
                <div className={props.isDarkMode ? 'bg-none' : 'bg-light rounded-1'}>
                    <Line data={chartData} options={options} />
                </div>
            )}

            <div className='container'>
                <div className='row'>
                    <div className='col-md-12 px-0'>
                        {searchResults.length > 0 && (
                            <div className='mb-4'>
                                <CompanyProfile searchResults={searchResults} />
                            </div>
                        )}
                    </div>
                    <div className='col-md-12 px-0'>
                        {priceChange.length > 0 && (
                            <div className='mb-4'>
                                <PriceChange priceChange={priceChange} />
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default StockSearch;
