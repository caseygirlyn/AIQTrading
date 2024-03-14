import React from 'react';

const SearchedStocksTable = () => {
    const searchedStocks = JSON.parse(localStorage.getItem('searchedStocks')) || [];

    return (
        <div className='mb-4'>
            <h2 className='fs-4'>Recently Searched Stocks</h2>
            <table className='table table-striped table-hover mb-0 rounded-1'>
                <thead>
                    <tr>
                        <th>SYMBOL</th>
                        <th>NAME</th>
                    </tr>
                </thead>
                <tbody>
                    {searchedStocks.map((stock, index) => (
                        <tr key={index}>
                            <td>{stock.symbol}</td>
                            <td>{stock.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SearchedStocksTable;