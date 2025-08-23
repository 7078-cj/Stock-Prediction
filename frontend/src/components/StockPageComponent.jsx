import React, {useEffect, useState } from 'react'
import LineChartComponent from './LineChartComponent'
import TextCard from './TextCard'


function StockPageComponent({ticker}) {
    

    
    const url = import.meta.env.VITE_API_URL
    const [stockData, setStockData] = useState({
        data:{ 
            dates:[],
            close_data:[],
            open_data:[],
            low_data:[],
            high_data:[],
        },
        prediction: null,
        close_price: null,
        open_price: null,
        volume: null,
        high: null,
        low: null,
        date: null,
        
    });

    const formatData = (data) => {
        return {
            dates: data['7d_data'].map(item => item.Date),
            close_data: data['7d_data'].map(item => item.Close),
            open_data: data['7d_data'].map(item => item.Open),
            low_data: data['7d_data'].map(item => item.Low),
            high_data: data['7d_data'].map(item => item.High),
        };
    }

    const addNextDay = (date) => {
        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
        return nextDay.toISOString().split('T')[0];
    }

    
    
    

    const fetchStockData = async(ticker) => {
        const tokens = JSON.parse(localStorage.getItem("authTokens"));
        const accessToken = tokens?.access;
        if (accessToken){
            const stockData = fetch( url + 'info_prediction/' + ticker,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}` 
                }
            })
                .then(response => response.json())
                .then(data => {
                    
                    const formattedData = formatData(data);
                    formattedData.dates.push(addNextDay(formattedData.dates[formattedData.dates.length - 1]));
                    setStockData({
                        data: formattedData,
                        prediction: data.prediction,
                        close_price: data.info.Close,
                        open_price: data.info.Open,
                        volume: data.info.Volume,
                        high: data.info.High,
                        low: data.info.Low,
                        date: data.info.Date,
                        ticker: data.ticker
                    });
                    
                    
                    
                    
                })
                .catch(error => {
                    console.error('Error fetching stock data:', error);
                });
            }else {
            console.error('No access token found');
        }
        
        }
       
        
    useEffect(() => {
        fetchStockData(ticker);
    }, [ticker]);
   

  return (
    <div className='flex flex-col w-full justify-center items-center  p-4 flex-wrap'>
        <div className='w-full bg-gray-100 p-6 rounded-lg shadow-md items-center'>
            
            <section className='flex flex-row  w-full justify-between items-center flex-wrap'>
                
                <TextCard Header="Stock Ticker" content={stockData.ticker}/>
                <TextCard Header="Date" content={stockData.date}/>
                <TextCard Header="Current Price" content={stockData.close_price}/>
                <TextCard Header ="Open Price" content={stockData.open_price}/>
                <TextCard Header ="Low" content={stockData.low}/>
                <TextCard Header ="High" content={stockData.high}/>
                <TextCard Header="Volume" content={stockData.volume}/>
                <TextCard Header="Predicted Closing Price" content={stockData.prediction}/>
                
            </section>
        </div>
        <div className='w-full text-white flex items-center justify-center border-b-2 border-gray-200 mb-4 mt-2 '>
            
            <LineChartComponent ClosingData={stockData.data.close_data} 
                                OpeningData={stockData.data.open_data} 
                                LowData={stockData.data.low_data} 
                                HighData={stockData.data.high_data} 
                                PredictedClosingData={stockData?.prediction}
                                Dates={stockData.data.dates}/>
        </div>
    </div>
  )
}

export default StockPageComponent