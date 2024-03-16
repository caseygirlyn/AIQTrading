import React, { useState, useEffect } from 'react';
import axios from 'axios';

const News = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiKeyNews = import.meta.env.VITE_API_KEY_NEWS; // Netlify ENV variable

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(`https://newsapi.org/v2/everything?q=stocks&apiKey=${apiKeyNews}`);
                setNews(response.data.articles);
            } catch (error) {
                try {
                    const fallbackResponse = await axios.get('/newsApi.json'); 
                    setNews(fallbackResponse.data.articles);
                }catch (error) {
                    setError('An error occurred while fetching data');
                }
            }finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className='container news'>
            <h2 className="fs-4 mb-0">Global Financial News</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className='wrapper card-group pb-3'>
                    {news.slice(0, 12).map((article, index) => (
                        <div className="cardContainer col-md-4 col-sm-12 w-lg-auto py-3" key={index}>
                            <div className="card border-2 rounded-0 w-auto border-0">
                                <div className="card-body caption py-1 px-md-2 px-0">
                                    <p className="card-title mb-0">
                                        <a href={article.url} className="text-decoration-none" target="_blank" rel="noopener noreferrer">{article.title}</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default News;