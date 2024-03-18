import React from 'react';

const MostlyOwnedStocksTable = () => {
    // Sample data of mostly owned stocks
    const mostlyOwnedStocks = [
        { id: 1, name: 'NVIDIA Corporation', symbol: 'NVDA' },
        { id: 2, name: 'Meta Platforms, Inc.', symbol: 'META' },
        { id: 3, name: 'Netflix, Inc.', symbol: 'NFLX' },
        { id: 4, name: 'Broadcom Inc.', symbol: 'AVGO' },
        { id: 5, name: 'QUALCOMM Incorporated', symbol: 'QCOM' },
        { id: 6, name: 'Apple Inc.', symbol: 'AAPL' },
        { id: 7, name: 'Microsoft Corporation', symbol: 'MSFT' },
        { id: 8, name: 'Amazon.com Inc.', symbol: 'AMZN' },
        { id: 9, name: 'Alphabet Inc. (Google)', symbol: 'GOOGL' },
        { id: 10, name: 'Facebook, Inc.', symbol: 'META' },
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