import React from 'react';

const MostlyOwnedStocksTable = () => {
    // Sample data of mostly owned stocks
    const mostlyOwnedStocks = [
        { id: 1, name: 'Microsoft Corporation', symbol: 'MSFT' },
        { id: 2, name: 'Apple Inc.', symbol: 'AAPL' },
        { id: 3, name: 'NVIDIA Corporation', symbol: 'NVDA' },
        { id: 4, name: 'Alphabet Inc. (Google)', symbol: 'GOOGL' },
        { id: 5, name: 'Amazon.com Inc.', symbol: 'AMZN' },
        { id: 6, name: 'Meta Platforms, Inc.', symbol: 'META' },
        { id: 7, name: 'Tesla, Inc.', symbol: 'TSLA' },
        { id: 8, name: 'Netflix, Inc.', symbol: 'NFLX' },
        { id: 9, name: 'Broadcom Inc.', symbol: 'AVGO' },
        { id: 10, name: 'QUALCOMM Incorporated', symbol: 'QCOM' },
    ];

    return (
        <div className='mb-4 px-2'>
            <h2 className='fs-4'>Most Owned Stocks</h2>
            <table className='table table-striped mb-0'>
                <thead>
                    <tr>
                        <th className='bg-primary-color text-white fs-6'>SYMBOL</th>
                        <th className='bg-primary-color text-white fs-6'>NAME</th>
                    </tr>
                </thead>
                <tbody>
                    {mostlyOwnedStocks.map(stock => (
                        <tr key={stock.id}>
                            <td>{stock.symbol}</td>
                            <td>{stock.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MostlyOwnedStocksTable;