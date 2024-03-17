import React, { useState, useEffect } from 'react';

const CompanyNews = (props) => {
    const query = props.parseQuery;
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiKeyNews = import.meta.env.VITE_API_KEY_NEWS; // Netlify ENV variable

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKeyNews}`); // PROD
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setNews(data.articles);
            } catch (error) {
                try {
                    const fallbackResponse = await fetch(`/newsApi.json`); // Fallback data in case maximum request has been reached :)
                    const fallbackData = await fallbackResponse.json();
                    setNews(fallbackData.articles);
                } catch (error) {
                    setError('An error occurred while fetching data');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    return (
        <div className='container news'>
            <h2 className="fs-4 mb-0">{query} News</h2>
            {loading ? (
                <div className="spinner-border text-info mx-auto my-5 d-block" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className='wrapper card-group pb-3'>
                    {news.slice(0, 12).map((article, index) => (
                        <div className="cardContainer caption col-md-4 col-sm-12 w-lg-auto py-3" key={index}>
                            <a href={article.url} className="text-decoration-none newsTitle" target="_blank" rel="noopener noreferrer">{article.title}</a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CompanyNews;