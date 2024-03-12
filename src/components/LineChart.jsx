import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
  Legend
);

const LineChart = (props) => {

  const [stockData, setStockData] = useState([]);

  useEffect(() => {

    const symbol = props.symbol;
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    //const endPoint = `https://financialmodelingprep.com/api/v3/historical-chart/5min/${symbol}?from=${formattedDate}&to=${formattedDate}&apikey=MEMq3hGb4CgnNvgWqBSZkhHpSank9EtR`; 
    

    fetch(`/AAPL-5min.json`) // replace this and use your API key :)
      .then(response => response.json())
      .then(data => {
        if (data) {
          const timestamps = data.map(timestamp => timestamp.date);
          const closingPrices = data.map(timestamp => timestamp.close);
          setStockData({ timestamps, closingPrices });
        }
        else {
          console.error('Unexpected response', data);
        }
      })
      .catch(error => {
        console.error('Error fetching stock data', error);
      });
  }, []);

  const chartData = {
    labels: stockData.timestamps,
    datasets: [
      {
        label: props.symbol,
        data: stockData.closingPrices,
        fill: true,
        borderColor: 'rgb(13, 202, 240)',
        pointBorderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {  
      legend: {
        labels: {
          color: 'rgb(13, 202, 240)'
        }
      }
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          displayFormats: {
            minute: 'HH:mm'
          }
        }
      },
      y: {
        ticks: {
          color: 'rgb(13, 202, 240)'
        }
        // Configuration for the y-axis
      }
    }
  };

  return (
      <Line data={chartData} options={options}/>
  );
};

export default LineChart;