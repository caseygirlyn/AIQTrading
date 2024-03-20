import React from 'react';

const SearchedStocksTable = () => {

    const searchedStocks = JSON.parse(localStorage.getItem('searchedStocks')) || [];

    return (
        <div className='mb-4 ps-md-5 mx-lg-3'>
            <h2 className='fs-4'>Recently Searched Stocks</h2>
            <table className='table table-striped table-hover mb-0 rounded-1'>
                <thead>
                    <tr>
                        <th className='bg-primary-color text-white fs-6'>SYMBOL</th>
                        <th className='bg-primary-color text-white fs-6'>NAME</th>
                    </tr>
                </thead>
                <tbody>
                    {searchedStocks.map((stock, index) => (
                        <tr key={index}>
                            <td>{stock.symbol}</td>
                            <td>{stock.name}</td>
                        </tr>
                    ))}
                    {searchedStocks.length === 0 && (
                        <tr><td colSpan={2}>No Records Found</td></tr>
                    )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default SearchedStocksTable;