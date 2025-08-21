import React from 'react'

function TextCard({Header, content}) {
  return (
    <div className='bg-white p-4 m-2 w-[15%] shadow-md rounded-lg flex flex-col items-center justify-evenly'>
        <h2 className='text-lg font-semibold'>{Header}</h2>
        <p className='text-gray-600'>{content}</p>
    </div>
  )
}

export default TextCard