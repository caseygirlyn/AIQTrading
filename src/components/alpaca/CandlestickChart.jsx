import React, { useState, useEffect } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import { Chart as ChartJS, CategoryScale, LinearScale, TimeScale, Tooltip, Legend } from 'chart.js';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import { Chart } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
  CandlestickController,
  CandlestickElement,
  zoomPlugin
);

const fetchPriceChange = async (tickerCP, apiKey, baseUrl, startDateFormatted, todayFormatted) => {
  const response = await fetch(`${baseUrl}historical-chart/5min/${tickerCP}?from=${startDateFormatted}&to=${todayFormatted}&apikey=${apiKey}`);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();

  if (data.length === 0) {
    throw new Error('No data found');
  }

  return data;
};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

const CandlestickChart = ({ tickerCP, isDarkMode }) => {
  const [candleData, setCandleData] = useState([]);
  let color = (isDarkMode) ? 'rgb(13, 202, 240)' : 'rgb(58, 64, 80)';
  let labelColor = (isDarkMode) ? 'rgb(255, 255, 255)' : 'rgb(58, 64, 80)';
  let bgcolor = (isDarkMode) ? 'rgb(67 202 240 / 10%)' : 'rgb(0 0 0 / 10%)';
  const baseUrl = "https://financialmodelingprep.com/api/v3/";
  const apiKey = import.meta.env.VITE_API_KEY_FMP_3; // Netlify ENV variable

  const today = new Date();
  const startDate = new Date(today);
  const savedStatus = localStorage.getItem('marketStatus');

  if (savedStatus === 'Open' || (savedStatus !== 'Open' && (today.getDay() !== 6 || today.getDay() !== 7))) startDate.setDate(today.getDate());
  else startDate.setDate(today.getDate() - 3);

  let todayFormatted = formatDate(today);
  let startDateFormatted = formatDate(startDate);

  const { data: dataChart, error, isLoading, isError } = useQuery(
    ['dataChart', tickerCP],
    () => fetchPriceChange(tickerCP, apiKey, baseUrl, startDateFormatted, todayFormatted),
  );

  useEffect(() => {
    if (dataChart) {
      const formattedData = dataChart.map(item => ({
        x: new Date(item.date),
        o: item.open,
        h: item.high,
        l: item.low,
        c: item.close,
      }));
      setCandleData(formattedData);
    }
  }, [dataChart]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const dates = candleData.map(d => d.x);
  const minDate = new Date(Math.min(...dates));
  const maxDate = new Date(Math.max(...dates));
  minDate.setMinutes(minDate.getMinutes() - 1);
  maxDate.setMinutes(maxDate.getMinutes() + 1);

  const data = {
    datasets: [
      {
        label: '',
        data: candleData.map(({ x, o, h, l, c }) => ({
          x: new Date(x), o, h, l, c,
        })),
        borderColor: 'black',
        borderWidth: 1,
        barThickness: 5, // Set a fixed bar thickness
        maxBarThickness: 5, // Alternatively, set a maximum bar thickness
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        offset: true,
        min: minDate,
        max: maxDate,
        ticks: {
          major: {
            enabled: true,
          },
          source: 'data',
          maxRotation: 0,
          autoSkip: true,
          autoSkipPadding: 75,
          sampleSize: 100
        },
      },
      y: {
        type: 'linear',
        ticks: {
          color: labelColor
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        display: false,
        intersect: false,
        mode: 'index',
        callbacks: {
          label: function (context) {
            const { o, h, l, c } = context.raw;
            return [
              `Open: $${o.toFixed(2)}`,
              `High: $${h.toFixed(2)}`,
              `Low: $${l.toFixed(2)}`,
              `Close: $${c.toFixed(2)}`
            ];
          }
        }
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'x',
        }
      }
    },
  };

  return (
    <Chart type="candlestick" data={data} options={options} />
  );
};

export default CandlestickChart;
