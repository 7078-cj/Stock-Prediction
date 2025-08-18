import React, { useEffect, useState } from 'react'

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

function LineChartComponent({ClosingData, OpeningData, LowData, HighData, PredictedClosingData}) {

  const [openLowData, setOpenLowData] = useState(ClosingData.map((value, index) => {
                                                  return [OpeningData[index], value]
                                                })) 

  

  const [lowHighData, setLowHighData] = useState(LowData.map((value, index) => {
                                                  return [value, HighData[index]]
                                                }))
 

  const [predictedData, setPredictedData] = useState([])

  useEffect(() => {
    setPredictedData(Array(ClosingData.length - 1).fill(null))
    setPredictedData(prev => [...prev, ClosingData[ClosingData.length - 1],...PredictedClosingData])
  },[ClosingData, PredictedClosingData])

  useEffect(() => {
    setOpenLowData(ClosingData.map((value, index) => {
      return [OpeningData[index], value]
    }))
  }, [ClosingData, OpeningData]);

  useEffect(() => {
    setLowHighData(LowData.map((value, index) => {
      return [value, HighData[index]]
    }))
  }, [LowData, HighData]);

  

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August', 'September',, 'October', 'November', 'December'],
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
        backgroundColor: 'rgba(0,0,0,0.1)', // transparent fill  
        borderWidth: 2,
        yAxisID: 'y',
      },
       
      {
        type: 'line',
        label: 'Predicted Closing Price',
        data: predictedData, 
        borderColor: 'rgba(138, 43, 226, 1)',   // purple
        backgroundColor: 'rgba(138, 43, 226, 0.3)',
        borderDash: [6, 6], // dashed line
        tension: 0.3,
        yAxisID: 'y',
      }
      
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
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
    <div className='w-full h-full bg-white p-4 shadow-md rounded-lg '>
      <Chart type='bar' data={data} options={options} />
    </div>
  )
}

export default LineChartComponent
