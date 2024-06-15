'use client'
import { HistoryProps } from '@/types'
import { useAuth } from '@clerk/nextjs'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import HistoryItem from './HistoryItem'
import Loading from './loading'

const HistoryList = () => {
  const { userId } = useAuth()
  const [history, setHistory] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchHistory = async (userId: any) => {
      setIsLoading(true)
      try {
        const result = await axios.get(
          `https://weather-app-backend-8tro.onrender.com/history/${userId}`
        )
        setHistory(result.data)
      } catch (error: any) {
        console.error(error.message)
      }
      setIsLoading(false)
    }
    if (userId) {
      fetchHistory(userId)
    }
  }, [userId])

  return (
    <div className='container mx-auto mt-10 rounded-lg bg-gray-100 p-6 shadow-md dark:bg-gray-800'>
      <h2 className='mb-6 text-center text-2xl font-bold text-gray-900 dark:text-gray-100'>
        Weather History
      </h2>
      {isLoading ? (
        <Loading />
      ) : (
        <ul className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {history.map((data: HistoryProps, index) => (
            <li
              key={index}
              className='rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-600 dark:bg-gray-700'
            >
              <HistoryItem label='City' value={data.city} />
              <HistoryItem
                label='Temperature'
                value={`${data.temperature}°C`}
              />
              <HistoryItem label='Humidity' value={`${data.humidity}%`} />
              <HistoryItem
                label='Wind Speed'
                value={`${data.windSpeed} km/h`}
              />
              <HistoryItem
                label='Date'
                value={new Date(data.updatedAt).toLocaleDateString()}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default HistoryList
