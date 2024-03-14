import React from 'react'

const PriceChange = (props) => {
    const priceChange = props.priceChange;
    return (
        <>
            {priceChange.map(stock => (
                <table className="table table-striped mt-2 mb-0 rounded-1" key={stock.symbol}>
                    <thead>
                        <tr>
                            <th colSpan={2}>Price Changes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='w-50'>1-day price change</td>
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
        </>
    )
}

export default PriceChange
