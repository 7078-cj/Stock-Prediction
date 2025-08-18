import React from 'react'
import LineChartComponent from './LineChartComponent'
import TextCard from './TextCard'

function StockPageComponent({ClosingData, OpeningData, LowData, HighData, PredictedClosingData,
                            StockName, CurrentPrice, OpenPrice, ClosePrice, Volume, PredictedClosingPrice}) {


  return (
    <div className='flex flex-col w-full justify-center items-center  p-4 flex-wrap'>
        <div className='w-full bg-gray-100 p-6 rounded-lg shadow-md items-center'>
            
            <section className='flex flex-row  w-full justify-between items-center flex-wrap'>
                
                <TextCard Header="Stock Name" content={StockName}/>
                <TextCard Header="Current Price" content={CurrentPrice}/>
                <TextCard Header ="Open Price" content={OpenPrice}/>
                <TextCard Header="Close Price" content={ClosePrice}/>
                <TextCard Header="Volume" content={Volume}/>
                <TextCard Header="Predicted Closing Price" content={PredictedClosingPrice}/>
                
            </section>
        </div>
        <div className='w-full text-white flex items-center justify-center border-b-2 border-gray-200 mb-4 mt-2 '>
            
            <LineChartComponent ClosingData={ClosingData} OpeningData={OpeningData} LowData={LowData} HighData={HighData} PredictedClosingData={PredictedClosingData}/>
        </div>
    </div>
  )
}

export default StockPageComponent