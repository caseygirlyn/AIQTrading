// src/services/newsService.js

const API_KEY = import.meta.env.VITE_API_KEY_POLYGON;

export const getNews = async () => {
  const response = await fetch(
    `https://api.polygon.io/v2/reference/news?apiKey=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch news');
  }

  const data = await response.json();

  return data.results;
};

export const getFallbackNews = async () => {
  const response = await fetch('/marketWatch.json');

  if (!response.ok) {
    throw new Error('Failed to fetch fallback news');
  }

  const data = await response.json();

  return data.results;
};