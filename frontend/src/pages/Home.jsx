import React, { use, useEffect, useState } from 'react'
import Header from '../components/Header'
import StockPageComponent from '../components/StockPageComponent'
import SideBar from '../components/SideBar'


function Home() {
  const [index, setIndex] = useState(0);
  const [stockData, setStockData] = useState([
    {
      name: "Apple Inc. (AAPL)",
      current_price: "$150.00",
      open_price: "$145.00",
      close_price: "$148.00",
      volume: "1,000,000",
      predicted_closing_price: "$180.00",
      close_data:[65, 59, 80, 81, 56, 55, 40],
      open_data:[50, 40, 60, 20, 30, 10, 45],
      low_data:[30, 20, 40, 10, 20, 5, 15],
      high_data:[70, 65, 90, 85, 60, 65, 50],
      predicted_closing_data: [ 45, 60, 75]
    },
    {
      name: "Microsoft Corp. (MSFT)",
      current_price: "$300.00",
      open_price: "$295.00",
      close_price: "$298.00",
      volume: "2,000,000",
      predicted_closing_price: "$320.00",
      close_data:[70, 65, 90, 85, 60, 65, 50],
      open_data:[65, 60, 80, 70, 55, 50, 45],
      low_data:[50, 45, 70, 60, 40, 35, 30],
      high_data:[90, 85, 100, 95, 80, 75, 70],
      predicted_closing_data: [ 50, 70, 90]
    }
  ]);

  const [stockList, setStockList] = useState(stockData.map(stock => {
    return {
      name: stock.name,
      current_price: stock.current_price,
    }
  }));

  const [selectedStock, setSelectedStock] = useState(stockData[index]);



  useEffect(() => {
    setSelectedStock(stockData[index]);
  }, [index, stockData]);
  

  return (
    <div className='flex flex-col h-screen'>
    
      <Header/>
      <div className='flex flex-row h-full justify-self-start items-start'>
        <SideBar StockList={stockList} setIndex={setIndex} index={index}/>
        <StockPageComponent ClosingData={selectedStock.close_data} 
                            OpeningData={selectedStock.open_data} 
                            LowData={selectedStock.low_data} 
                            HighData={selectedStock.high_data} 
                            PredictedClosingData={selectedStock.predicted_closing_data}
                            StockName={selectedStock.name}
                            CurrentPrice={selectedStock.current_price}
                            OpenPrice={selectedStock.open_price}
                            ClosePrice={selectedStock.close_price}
                            Volume={selectedStock.volume}
                            PredictedClosingPrice={selectedStock.predicted_closing_price}
                            />
      </div>
      
    </div>
  )
}

export default Home