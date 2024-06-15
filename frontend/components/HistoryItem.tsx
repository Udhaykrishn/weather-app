import React from 'react'

const HistoryItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <>
      <div className='flex justify-between border-b border-gray-100 py-2 dark:border-gray-600'>
        <span className='font-semibold text-gray-700 dark:text-gray-300'>
          {label}:
        </span>
        <span className='text-gray-600 dark:text-gray-400'>{value}</span>
      </div>
    </>
  )
}

export default HistoryItem
