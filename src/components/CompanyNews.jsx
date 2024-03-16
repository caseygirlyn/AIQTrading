import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CompanyNews = (props) => {
    const query = props.parseQuery;
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiKeyNews = import.meta.env.VITE_API_KEY_NEWS; // Netlify ENV variable

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKeyNews}`);
                setNews(response.data.articles);
            } catch (error) {
                try {
                    const fallbackResponse = await axios.get('/newsApi.json');
                    setNews(fallbackResponse.data.articles);
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
        <div className='container news p-2'>
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

export default CompanyNews
