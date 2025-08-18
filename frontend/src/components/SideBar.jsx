import React from 'react'

function SideBar({StockList , setIndex}) {
  return (
    <>
        <div className='h-full w-[20%] bg-slate-200 mt-2 mr-2 p-4 rounded-2xl'>
            {StockList.map((stock, index) => (
                <div key={index} onClick={() => setIndex(index)} className='bg-white p-2 m-2 rounded-lg shadow-md hover:bg-gray-100 cursor-pointer'>
                    <h3 className='text-lg font-semibold'>{stock.name}</h3>
                    <p className='text-gray-600'>Current Price:{stock.current_price}</p>
                </div>
            ))}
        </div>
    </>
  )
}

export default SideBar