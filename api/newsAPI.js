import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
let newsData;

const apiKeyNews = process.env.VITE_API_KEY_NEWS;

console.log(apiKeyNews);

const fetchNews = async () => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/everything?q=stocks&apiKey=602085a63c3a4b98b4e7c82ba09ce268`);
    newsData = response.data.articles;
  } catch (error) {
    console.log('An error occurred while fetching data');
  } 
};

fetchNews();
// Middleware to parse JSON bodies

app.use(express.json());

// Sample data
let items = newsData;

// GET all items
app.get('/api/news', (req, res) => {
  res.json(newsData);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});