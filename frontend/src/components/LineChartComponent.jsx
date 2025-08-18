import React from 'react'

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function LineChartComponent() {

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        type: 'line',
        label: 'Closing Price',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1,
        yAxisID: 'y',
      },
      {
        type: 'bar',
        label: 'Opening – Closing Range',
        data: [
          [50, 65],
          [40, 59],
          [60, 80],
          [20, 81],
          [30, 56],
          [10, 55],
          [45, 40],
        ],
        backgroundColor: 'rgba(192, 75, 75, 0.5)',
        borderColor: 'rgba(192, 75, 75, 1)',
        borderWidth: 1,
        yAxisID: 'y',
      },
      {
        type: 'bar',
        label: 'Monthly Low – High',
        data: [
          [45, 70],
          [35, 65],
          [55, 90],
          [15, 85],
          [25, 60],
          [5, 58],
          [35, 50],
        ],
        backgroundColor: 'rgba(0,0,0,0.1)', // transparent fill  
        borderWidth: 2,
        yAxisID: 'y',
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const val = context.raw;
            if (Array.isArray(val)) {
              return `${val[0]} – ${val[1]}`;
            }
            return val;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className='w-full h-96 bg-white p-4 shadow-md rounded-lg '>
      <Chart type='bar' data={data} options={options} />
    </div>
  )
}

export default LineChartComponent
