import React, { useState, useEffect } from 'react';

const News = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiKeyNews = import.meta.env.VITE_API_KEY_POLYGON; // Netlify ENV variable

    // https://api.polygon.io/v2/reference/news?apiKey=v${apiKeyNews} "5 API Calls / Minute"

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(`https://api.polygon.io/v2/reference/news?apiKey=${apiKeyNews}`); // PROD
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setNews(data.results);
            } catch (error) {
                try {
                    const fallbackResponse = await fetch(`/marketWatch.json`); // Fallback data in case maximum request has been reached :)
                    const fallbackData = await fallbackResponse.json();
                    setNews(fallbackData.results);
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
            <h2 className="fs-4 mb-0">Global Financial News</h2>
            {loading ? (
                <div className="spinner-border text-info mx-auto my-5 d-block" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className='wrapper card-group pb-3'>
                    {news.slice(0, 8).map(newsData => (
                        <div className="cardContainer col-md-6 col-sm-12 w-lg-auto py-3" key={newsData.id}>
                            <a href={newsData.article_url} className="text-decoration-none" target="_blank" rel="noopener noreferrer">
                                <div className="card-body caption py-1 px-md-2 px-0 d-flex align-items-start">
                                    <div className='newsthumb w-25 me-3 shadow' style={{ backgroundImage: `url(${newsData.image_url})` }}></div>
                                    <div className='newsTitle w-75'>
                                        {newsData.title}
                                        <div className='mt-1 text-secondary'><i className="bi bi-calendar3 me-2"></i>{newsData.published_utc.slice(0, 10)}</div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default News