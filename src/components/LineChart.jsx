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

  console.log(new Date().toLocaleString());

  const [stockData, setStockData] = useState([]);
  
  // http://localhost:5173/sample.json 
  // https://financialmodelingprep.com/api/v3/historical-chart/5min/AAPL?from=2024-03-01&to=2024-03-01&apikey=MEMq3hGb4CgnNvgWqBSZkhHpSank9EtR (working final :))

  useEffect(() => {
    fetch(`/AAPL-5min.json`) 
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