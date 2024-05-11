import React from 'react'

const DetailCard = ({field, text}) => {
  return (
    <div className="w-2/5 rounded-lg border-black px-3 py-4">
      <div className="font-bold text-xl rounded-lg text-white text-center py-7 bg-gray-800 lg:w-full w-4/5">{text}</div>
      <p className="text-white text-center pr-8">
        {field}
      </p>
    </div>
  )
}

export default DetailCard;