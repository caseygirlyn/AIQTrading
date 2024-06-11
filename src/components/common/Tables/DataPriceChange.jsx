import React from 'react';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const fetchCompanyProfile = async (tickerCP, apiKey) => {
    const baseUrl = "https://financialmodelingprep.com/api/v3/";
    const response = await fetch(`${baseUrl}profile/${tickerCP}?apikey=${apiKey}`); // Fetch Company Profile Data

    if (!response.ok) {
        throw new Error('Failed to fetch company profile data');
    }

    const data = await response.json();

    if (data.length === 0) {
        throw new Error('No data found for company profile');
    }

    return data;
};

const fetchPriceChange = async (tickerCP, apiKey) => {
    const baseUrl = "https://financialmodelingprep.com/api/v3/";
    const response = await fetch(`${baseUrl}stock-price-change/${tickerCP}?apikey=${apiKey}`); // Fetch Stock Price Change Data 

    if (!response.ok) {
        throw new Error('Failed to fetch price change data');
    }

    const data = await response.json();

    if (data.length === 0) {
        throw new Error('No data found for price change');
    }

    return data;
};

const formatCurrency = (currency, price) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    });

    return formatter.format(price);
};

const DataPriceChange = ({ tickerCP }) => {
    
    const apiKey = import.meta.env.VITE_API_KEY_FMP_1;
    const apiKey2 = import.meta.env.VITE_API_KEY_FMP_2;

    const { data: priceChange, error, isLoading, isError } = useQuery(
        ['priceChange', tickerCP],
        () => fetchPriceChange(tickerCP, apiKey),
    );

    const { data: companyProfile, error2, isLoading2, isError2 } = useQuery(
        ['companyProfile', tickerCP],
        () => fetchCompanyProfile(tickerCP, apiKey2),
    );

    if (isLoading || isLoading2) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    if (isError2) {
        return <div>Error: {error2.message}</div>;
    }

    return (
        <>
            {
                companyProfile && companyProfile.length > 0 && (
                    companyProfile.map(stock => (
                        <div key={stock.symbol}>
                            <div className='common-bg-primary-color float-start p-2 mb-2 me-3 rounded-2'>
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

                        </div>
                    ))
                )
            }

            {
                priceChange && priceChange.length > 0 && (
                    priceChange.map(stock => (
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
                                        <span className={stock["1D"] > 0 ? 'text-success' : 'text-danger'}>
                                            {stock["1D"].toFixed(2)}%{stock["1D"] > 0 ? <i className="bi bi-arrow-up-short"></i> : <i className="bi bi-arrow-down-short"></i>}
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
                    ))
                )
            }
        </>
    );
};

export default DataPriceChange;
