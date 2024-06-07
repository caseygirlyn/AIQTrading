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

const CompanyLogo = ({ tickerCP }) => {
    
    const apiKey = import.meta.env.VITE_API_KEY_FMP_1;

    const { data: companyProfile, error, isLoading, isError } = useQuery(
        ['companyProfile', tickerCP],
        () => fetchCompanyProfile(tickerCP, apiKey),
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            {
                companyProfile && companyProfile.length > 0 && (
                    companyProfile.map(stock => (
                        <div key={stock.symbol}>
                            <div className='common-bg-primary-color mb-2 p-1 mb-2 rounded-1 d-inline-block shadow'>
                                <img src={stock.image} height={50} width={50} />
                            </div>
                        </div>
                    ))
                )
            }
        </>
    );
};


export default CompanyLogo
