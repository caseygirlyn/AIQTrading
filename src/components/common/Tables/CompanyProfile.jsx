import React from 'react'

const CompanyProfile = (props) => {
    const searchResults = props.searchResults;
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
        <div>
            {searchResults.map(stock => (
                <div key={stock.symbol}>
                    <table className="table table-striped mt-2 mb-0 rounded-1">
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
                                <td className='w-50'>Year Range</td>
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
                    </table></div>
            ))}
        </div>
    )
}

export default CompanyProfile
