import React from 'react'

const Loading = () => {
  return (
    <div className='flex items-center justify-center'>
      <div className='h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-gray-900 dark:border-gray-100'></div>
    </div>
  )
}

export default Loading
