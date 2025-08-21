import React, { use, useEffect, useState } from 'react'
import Header from '../components/Header'
import StockPageComponent from '../components/StockPageComponent'
import SideBar from '../components/SideBar'


function Home() {
  const [index, setIndex] = useState(0);

  const stocks = [{ticker:'AAPL',name:'Apple'},{ticker:'MSFT',name:'Microsoft'}]

  const [stockList, setStockList] = useState(stocks.map(stock => {
    return {
      name: stock.name,
      ticker: stock.ticker,
    }
  }));

  const [selectedStock, setSelectedStock] = useState(stocks[index]);

  const setIndexAndStock = (newIndex) => {
    setIndex(newIndex);
    setSelectedStock(stocks[newIndex]);
  }

  return (
    <div className='flex flex-col h-screen'>
    
      <Header/>
      <div className='flex flex-row h-full justify-self-start items-start'>
        <SideBar StockList={stockList} setIndex={setIndex} index={index} setIndexAndStock={setIndexAndStock}/>
        <StockPageComponent ticker={selectedStock.ticker}/>
      </div>
      
    </div>
  )
}

export default Home