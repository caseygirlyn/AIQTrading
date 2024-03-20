import React from 'react'

const PriceChange = (props) => {
    const priceChange = props.priceChange;
    return (
        <>
            {priceChange.map(stock => (
                <table className="table table-striped mt-2 mb-0 rounded-1" key={stock.symbol}>
                    <thead>
                        <tr>
                            <th colSpan={2} className='bg-primary-color text-white fs-6'>Price Changes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='w-50'>1-day</td>
                            <td>
                                <span className={stock["1D"] > 0 ? 'text-success' : 'text-danger'}>{stock["1D"].toFixed(2)}%{stock["1D"] > 0 ? <i className="bi bi-arrow-up-short"></i> : <i className="bi bi-arrow-down-short"></i>}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>5-day</td>
                            <td>
                                <span className={stock["5D"] > 0 ? 'text-success' : 'text-danger'}>
                                    {stock["5D"].toFixed(2)}%{stock["5D"] > 0 ? <i className="bi bi-arrow-up-short"></i> : <i className="bi bi-arrow-down-short"></i>}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>MTD</td>
                            <td>
                                <span className={stock["1M"] > 0 ? 'text-success' : 'text-danger'}>
                                    {stock["1M"].toFixed(2)}%{stock["1M"] > 0 ? <i className="bi bi-arrow-up-short"></i> : <i className="bi bi-arrow-down-short"></i>}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>3 MTD</td>
                            <td>
                                <span className={stock["3M"] > 0 ? 'text-success' : 'text-danger'}>
                                    {stock["3M"].toFixed(2)}%{stock["3M"] > 0 ? <i className="bi bi-arrow-up-short"></i> : <i className="bi bi-arrow-down-short"></i>}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>6 MTD</td>
                            <td>
                                <span className={stock["6M"] > 0 ? 'text-success' : 'text-danger'}>
                                    {stock["6M"].toFixed(2)}%{stock["6M"] > 0 ? <i className="bi bi-arrow-up-short"></i> : <i className="bi bi-arrow-down-short"></i>}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>YTD</td>
                            <td>
                                <span className={stock.ytd > 0 ? 'text-success' : 'text-danger'}>
                                    {stock.ytd.toFixed(2)}%{stock.ytd > 0 ? <i className="bi bi-arrow-up-short"></i> : <i className="bi bi-arrow-down-short"></i>}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>1-year</td>
                            <td>
                                <span className={stock["1Y"] > 0 ? 'text-success' : 'text-danger'}>
                                    {stock["1Y"].toFixed(2)}%{stock["1Y"] > 0 ? <i className="bi bi-arrow-up-short"></i> : <i className="bi bi-arrow-down-short"></i>}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>5-years</td>
                            <td>
                                <span className={stock["5Y"] > 0 ? 'text-success' : 'text-danger'}>
                                    {stock["5Y"].toFixed(2)}%{stock["5Y"] > 0 ? <i className="bi bi-arrow-up-short"></i> : <i className="bi bi-arrow-down-short"></i>}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>MAX</td>
                            <td>
                                <span className={stock["max"] > 0 ? 'text-success' : 'text-danger'}>
                                    {stock["max"].toFixed(2)}%{stock["max"] > 0 ? <i className="bi bi-arrow-up-short"></i> : <i className="bi bi-arrow-down-short"></i>}
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
