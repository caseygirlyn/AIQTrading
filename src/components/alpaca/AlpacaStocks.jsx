import React, { useState, useEffect } from 'react';

const AlpacaStocks = () => {
    const [stocks, setStocks] = useState([]);
    const [filteredStocks, setFilteredStocks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const apiKey = import.meta.env.VITE_ALPACA_API_KEY;
    const secretKey = import.meta.env.VITE_ALPACA_SECRET_KEY;

    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const response = await fetch('https://paper-api.alpaca.markets/v2/assets', {
                    method: 'GET',
                    headers: {
                        'APCA-API-KEY-ID': apiKey,
                        'APCA-API-SECRET-KEY': secretKey,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch stocks');
                }

                const data = await response.json();
                setStocks(data);
                setFilteredStocks(data);
                setError(null);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchStocks();
    }, []);

    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);
        if (searchTerm.length > 1) {
            const filtered = stocks.filter(stock =>
                stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                stock.exchange.toLowerCase().includes(searchTerm.toLowerCase()) ||
                stock.class.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredStocks(filtered);
        } else {
            setFilteredStocks([]);
        }
    };

    return (
        <div className='mb-4'>
            <h2>All Available Stocks</h2>
            {error && <p>Error: {error}</p>}
            <input className='form-control rounded-0 shadow-none search'
                type="text"
                placeholder="Search by Symbol or Name"
                value={searchTerm}
                onChange={handleSearch} 
            />
            {searchTerm.length > 1 && filteredStocks.length > 0 && (
                <div style={{maxHeight: '310px', overflowY: 'scroll'}}>
                <table className='table table-striped mb-0 w-100 mb-4'>
                    <thead>
                        <tr>
                            <th className='bg-primary-color text-white fs-6'>Symbol</th>
                            <th className='bg-primary-color text-white fs-6' colSpan={3}>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStocks.map(stock => (
                            <tr key={stock.symbol}>
                                <td>{stock.symbol}</td>
                                <td>{stock.name}</td>
                                <td><button className="btn btn-outline-success" onClick={() => handleTickerSelection(ticker, 'buy')}>Buy</button></td>
                                <td><button className="btn btn-outline-danger" onClick={() => handleTickerSelection(ticker, 'sell')}>Sell</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            )}
        </div>
    );
};

export default AlpacaStocks;
