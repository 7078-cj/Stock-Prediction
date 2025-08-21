import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
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

function LineChartComponent({ ClosingData, OpeningData, LowData, HighData, PredictedClosingData, Dates }) {

  
  const openLowData = useMemo(() => 
    ClosingData.map((close, idx) => [OpeningData[idx], close])
  , [ClosingData, OpeningData]);

  const lowHighData = useMemo(() =>
    LowData.map((low, idx) => [low, HighData[idx]])
  , [LowData, HighData]);

  const predictedData = useMemo(() => {
    if (!ClosingData || ClosingData.length === 0) return [];
    return [
      ...Array(ClosingData.length - 1).fill(null),
      ClosingData[ClosingData.length - 1],
      PredictedClosingData
    ];
  }, [ClosingData, PredictedClosingData]);


  const data = useMemo(() => ({
    labels: Dates,
    datasets: [
      {
        type: 'line',
        label: 'Closing Price',
        data: ClosingData,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1,
        yAxisID: 'y',
      },
      {
        type: 'bar',
        label: 'Opening – Closing Range',
        data: openLowData,
        backgroundColor: 'rgba(192, 75, 75, 0.5)',
        borderColor: 'rgba(192, 75, 75, 1)',
        borderWidth: 1,
        yAxisID: 'y',
      },
      {
        type: 'bar',
        label: 'Monthly Low – High',
        data: lowHighData,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderWidth: 2,
        yAxisID: 'y',
      },
      {
        type: 'line',
        label: 'Predicted Closing Price',
        data: predictedData,
        borderColor: 'rgba(138, 43, 226, 1)',
        backgroundColor: 'rgba(138, 43, 226, 0.3)',
        borderDash: [6, 6],
        tension: 0.3,
        yAxisID: 'y',
      }
    ]
  }), [Dates, ClosingData, openLowData, lowHighData, predictedData]);

  const options = useMemo(() => ({
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      tooltip: {
        callbacks: {
          label: context => {
            const val = context.raw;
            return Array.isArray(val) ? `${val[0]} – ${val[1]}` : val;
          }
        }
      }
    },
    scales: { y: { beginAtZero: false } },
  }), []);

  return (
    <div className='w-full h-full bg-white p-4 shadow-md rounded-lg'>
      <Chart type='bar' data={data} options={options} />
    </div>
  );
}

export default LineChartComponent;
