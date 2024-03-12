import React from 'react';
import { Pie } from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

const PieChart = () => {

  const data = {
    labels: ['Alphabeth', 'Amazon', 'Tesla', 'Alibaba', 'Facebook', 'Vanguard S&P 500 (Dist)'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
          'rgb(255, 159, 64)',
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div>
      <h2 className='fs-4'>Allocations</h2>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;