import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Chart as ChartJS, CategoryScale, LinearScale, TimeScale, Tooltip, Legend, LineElement, PointElement, LineController } from 'chart.js';
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
  LineController,
  LineElement,
  PointElement,
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
};

// Check if a date is within market hours (9:30 AM to 4:00 PM Eastern Time)
const isMarketOpen = (date) => {
  const openHour = 9;
  const openMinute = 30;
  const closeHour = 16;
  const closeMinute = 0;

  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  const openTime = openHour * 60 + openMinute;
  const closeTime = closeHour * 60 + closeMinute;
  const currentTime = hours * 60 + minutes;

  return currentTime >= openTime && currentTime <= closeTime;
};

const CandlestickChart = ({ tickerCP, isDarkMode }) => {
  const [candleData, setCandleData] = useState([]);
  const [range, setRange] = useState('5d'); // Default range
  const [chartType, setChartType] = useState('line'); // Default chart type
  const [weekend, setWeekend] = useState([]);
  const baseUrl = "https://financialmodelingprep.com/api/v3/";
  const apiKey = import.meta.env.VITE_API_KEY_FMP_3; // Netlify ENV variable

  const today = new Date();

  useEffect(() => {
    if (today.getDay() === 0 || today.getDay() === 1) {
      setWeekend(true);
    }
  }, []);

  const calculateStartDate = (range) => {
    const startDate = new Date(today);

    if (startDate.getDay() === 0 || startDate.getDay() === 6) {
      startDate.setDate(today.getDate() - 2);
    } else {
      if (range === '1d') {
        startDate.setDate(today.getDate() - 1);
      } else if (range === '5d') {
        startDate.setDate(today.getDate() - 5);
      } else if (range === '10d') {
        startDate.setDate(today.getDate() - 10);
      }
    }

    return startDate;
  };

  const startDate = calculateStartDate(range);

  let todayFormatted = formatDate(today);
  let startDateFormatted = formatDate(startDate);

  const { data: dataChart, error, isLoading, isError } = useQuery(
    ['dataChart', tickerCP, startDateFormatted],
    () => fetchPriceChange(tickerCP, apiKey, baseUrl, startDateFormatted, todayFormatted),
    { keepPreviousData: true }
  );

  useEffect(() => {
    if (dataChart) {
      const formattedData = dataChart
        .filter(item => isMarketOpen(new Date(item.date))) // Filter out data outside market hours
        .map(item => ({
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

  const candlestickData = {
    datasets: [
      {
        label: '',
        data: candleData.map(({ x, o, h, l, c }) => ({
          x: new Date(x), o, h, l, c,
        })),
        borderColor: 'black',
        borderWidth: 1,
        barThickness: 3, // Set a fixed bar thickness
        maxBarThickness: 3, // Alternatively, set a maximum bar thickness
      },
    ],
  };

  const lineData = {
    labels: candleData.map(d => d.x),
    datasets: [
      {
        label: '',
        data: candleData.map(d => ({ x: d.x, y: d.c })),
        borderColor: 'rgb(13, 202, 240)',
        elements: {
          point: {
            radius: 0
          }
        },
        fill: false,
        tension: 0,
        pointBorderWidth: 0,
        borderWidth: 1,
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
          color: isDarkMode ? 'white' : '#3d4354',
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
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
    <>
      <Chart type={chartType} data={chartType === 'candlestick' ? candlestickData : lineData} options={options} />
      <div className="btn-group btn-group-toggle">
        {!weekend && (
          <>
            <button onClick={() => setRange('1d')} className='btn btn-outline-info btn-sm'>1-day</button>
            <button onClick={() => setRange('5d')} className='btn btn-outline-info btn-sm'>5-day</button>
            <button onClick={() => setRange('10d')} className='btn btn-outline-info btn-sm'>10-day</button>
          </>
        )}
        <button onClick={() => setChartType(chartType === 'candlestick' ? 'line' : 'candlestick')} className='btn btn-outline-info btn-sm'>
          {chartType === 'candlestick' ? 'Line Chart' : 'Candlestick Chart'}
        </button>
      </div>
    </>
  );
};

export default CandlestickChart;