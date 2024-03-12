import React, { useState } from 'react';
import axios from "axios";
import LineChart from './LineChart';

const StockSearch = (props) => {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [priceChange, setPriceChange] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = event => {
        setQuery(event.target.value.toUpperCase());
    };

    const handleSubmit = async event => {
        //const BASEURL = "https://financialmodelingprep.com/api/v3/profile/";
        //const APIKEY = "?apikey=MEMq3hGb4CgnNvgWqBSZkhHpSank9EtR";

        event.preventDefault();
        setError(null);
        setLoading(true);

        try {
            //const response = await fetch(BASEURL + query + APIKEY);
            const response = await fetch(`http://localhost:5173/AAPL.json`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            setError('An error occurred while fetching data');
        } finally {
            setLoading(false);
        }

        try {
            //const response = await fetch(BASEURL + query + APIKEY);
            const responsePC = await fetch(`/AAPL-PC.json`);
            if (!responsePC.ok) {
                throw new Error('Failed to fetch data');
            }
            const dataPC = await responsePC.json();
            setPriceChange(dataPC);
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

    const formatCurrency = (currency, price) => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        });

        return formatter.format(price);
    };

    const formatCurrencyShort = (currency, price) => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            notation: 'compact',
            compactDisplay: 'short'
        });

        return formatter.format(price);
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

            {loading && <p className='text-center'><img src='/assets/images/loader.gif' width={80} /></p>}
            {error && <p>{error}</p>}

            <div className={props.isDarkMode ? 'bg-none' : 'bg-light rounded-1'}>
                {searchResults.length > 0 && (
                    <LineChart symbol="AAPL" />
                )}
            </div>

            <div className='container'>
                <div className='row'>
                    <div className='col-md-6'>
                        {searchResults.length > 0 && (
                            <div className='mb-4'>
                                {searchResults.map(stock => (
                                    <table className="table table-striped mt-2 mb-0 rounded-1" key={stock.symbol}>
                                        <thead>
                                            <tr>
                                                <th colSpan={2}>
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
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Year Range</td>
                                                <td>{stock.range} ({stock.currency})</td>
                                            </tr>
                                            <tr>
                                                <td>Market Cap</td>
                                                <td>{formatCurrencyShort(stock.currency, stock.mktCap)}</td>
                                            </tr>
                                            <tr>
                                                <td>Average Volume</td>
                                                <td>{formatCurrencyShort(stock.currency, stock.volAvg)}</td>
                                            </tr>
                                            <tr>
                                                <td>Dividend Yield</td>
                                                <td>{(stock.lastDiv).toFixed(2)}%</td>
                                            </tr>
                                            <tr>
                                                <td>Exchange</td>
                                                <td>{stock.exchangeShortName}</td>
                                            </tr>
                                            <tr>
                                                <td>CEO</td>
                                                <td>{stock.ceo}</td>
                                            </tr>
                                            <tr>
                                                <td>Website</td>
                                                <td><a href={stock.website} target='_blank' className='text-info'>{stock.website}</a></td>
                                            </tr>
                                            <tr>
                                                <td>HQ</td>
                                                <td>{stock.city} {stock.state}</td>
                                            </tr>
                                            <tr>
                                                <td>IPO Date</td>
                                                <td>{stock.ipoDate}</td>
                                            </tr>
                                            <tr>
                                                <td>Total Employees</td>
                                                <td>{stock.fullTimeEmployees.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className='col-md-6'>
                        {priceChange.length > 0 && (
                            <div className='mb-4'>
                                {priceChange.map(stock => (
                                    <table className="table table-striped mt-2 mb-0 rounded-1" key={stock.symbol}>
                                        <tbody>
                                            <tr>
                                                <td>1-day price change</td>
                                                <td>
                                                    <span className={stock["1D"] > 0 ? 'text-success' : 'text-danger'}>{stock["1D"].toFixed(2)}%{stock["1D"] > 0 ? <i className="bi bi-arrow-up-short"></i> : <i className="bi bi-arrow-down-short"></i>}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>5-day price change</td>
                                                <td>
                                                    <span className={stock["5D"] > 0 ? 'text-success' : 'text-danger'}>
                                                        {stock["5D"].toFixed(2)}%{stock["5D"] > 0 ? <i className="bi bi-arrow-up-short"></i> : <i className="bi bi-arrow-down-short"></i>}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>MTD price change</td>
                                                <td>
                                                    <span className={stock["1M"] > 0 ? 'text-success' : 'text-danger'}>
                                                        {stock["1M"].toFixed(2)}%{stock["1M"] > 0 ? <i className="bi bi-arrow-up-short"></i> : <i className="bi bi-arrow-down-short"></i>}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>3 MTD price change</td>
                                                <td>
                                                    <span className={stock["3M"] > 0 ? 'text-success' : 'text-danger'}>
                                                        {stock["3M"].toFixed(2)}%{stock["3M"] > 0 ? <i className="bi bi-arrow-up-short"></i> : <i className="bi bi-arrow-down-short"></i>}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>YTD price change</td>
                                                <td>
                                                    <span className={stock.ytd > 0 ? 'text-success' : 'text-danger'}>
                                                        {stock.ytd.toFixed(2)}%{stock.ytd > 0 ? <i className="bi bi-arrow-up-short"></i> : <i className="bi bi-arrow-down-short"></i>}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>1-year price change</td>
                                                <td>
                                                    <span className={stock["1Y"] > 0 ? 'text-success' : 'text-danger'}>
                                                        {stock["1Y"].toFixed(2)}%{stock["1Y"] > 0 ? <i className="bi bi-arrow-up-short"></i> : <i className="bi bi-arrow-down-short"></i>}
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default StockSearch;
