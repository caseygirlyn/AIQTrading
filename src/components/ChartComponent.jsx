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

const ChartComponent = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(
        //   'https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2024-03-01/2024-03-07?adjusted=true&sort=asc&apiKey=vD_fAjdzVo1HACsGtvyOeAN2m4RDwJMN'
        // );

        const response = await axios.get('http://localhost:5175/sample.json');
        const { results } = response.data;
        const labels = results.map((result) => result.t);
        const prices = results.map((result) => result.c);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'AAPL Stock Price',
              data: prices,
              borderColor: 'blue',
              backgroundColor: 'rgba(0, 0, 255, 0.1)',
              fill: true,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {chartData && (
        <Line
          data={chartData}
          options={{
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'day',
                },
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default ChartComponent;
