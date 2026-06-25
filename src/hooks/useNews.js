// src/hooks/useNews.js

import { useEffect, useState } from 'react';
import { getNews, getFallbackNews } from '../services/newsService';

export const useNews = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const loadNews = async () => {
            try {
                setNews(await getNews());
            } catch {
                try {
                    setNews(await getFallbackNews());
                } catch {
                    setError(true);
                }
            } finally {
                setLoading(false);
            }
        };

        loadNews();
    }, []);

    return { news, loading, error };
};