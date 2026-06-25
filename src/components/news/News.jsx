import React from 'react';
import { useNews } from '../../hooks/useNews';
import NewsCard from './NewsCard';

const News = () => {
    const { news, loading, error } = useNews();

    //if (loading) return <Spinner />;
    if (error) return <ErrorMessage />;

    return (
        <><h2 className="fs-4 mb-0">Global Financial News</h2><div className="wrapper card-group pb-3 news">
            {news.slice(0, 8).map(article => (
                <NewsCard
                    key={article.id || article.article_url}
                    article={article} />
            ))}
        </div></>
    );
};

export default News;