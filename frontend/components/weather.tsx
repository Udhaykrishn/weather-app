import { useState, useEffect } from 'react'
import axios from 'axios'
import { WeatherData } from '@/types'
import { useAuth } from '@clerk/nextjs'

const Weather = () => {
  const { userId } = useAuth()
  const [city, setCity] = useState<string>('')
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [storedWeather, setStoredWeather] = useState<WeatherData | null>(null)
  const [defaultCity, setDefaultCity] = useState<string>('')
  const [predefinedLocations] = useState<{ name: string; query: string }[]>([
    { name: 'Bangalore', query: 'Bangalore,IN' },
    { name: 'Delhi', query: 'Delhi,IN' },
    { name: 'Mumbai', query: 'Mumbai,IN' },
    { name: 'Chennai', query: 'Chennai,IN' }
  ])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const apikey = '326d1deaf6384a5791c739efe457f191'
  const apiUrl =
    'https://api.openweathermap.org/data/2.5/weather?units=metric&q='

  useEffect(() => {

    const storedDefaultCity = localStorage.getItem('defaultCity')
    if (storedDefaultCity) {
      setDefaultCity(storedDefaultCity)
    }

    const storedWeatherData = localStorage.getItem('weatherData')
    if (storedWeatherData) {
      setStoredWeather(JSON.parse(storedWeatherData))
    }
  }, [])

  useEffect(() => {
    if (defaultCity) {
      localStorage.setItem('defaultCity', defaultCity)
    }
  }, [defaultCity])

  useEffect(() => {
    if (storedWeather) {
      localStorage.setItem('weatherData', JSON.stringify(storedWeather))
    }
  }, [storedWeather])

  useEffect(() => {
    if (defaultCity) {
      fetchWeather(defaultCity)
    }
  }, [defaultCity])

  const fetchWeather = async (query: string) => {
    setIsLoading(true)
    try {
      const response = await axios.get(apiUrl + query + `&appid=${apikey}`)
      const weatherData = response.data
      setWeather(weatherData)
      setStoredWeather(weatherData)
      sendWeatherToBackend(weatherData)
    } catch (error) {
      console.error('Error fetching the weather data', error)
    }
    setIsLoading(false)
  }

  const sendWeatherToBackend = async (weatherData: WeatherData) => {
    try {
      const response = await axios.post(
        `https://weather-app-backend-8tro.onrender.com/history/${userId}`,
        {
          city: weatherData.name,
          temperature: weatherData.main.temp,
          humidity: weatherData.main.humidity,
          windSpeed: weatherData.wind.speed
        }
      )
      console.log('Weather data sent to backend:', response.data)
    } catch (error) {
      console.error('Error sending weather data to backend', error)
    }
  }

  const handleViewWeather = (query: string) => {
    setDefaultCity(query)
  }

  const clearWeatherData = () => {
    setDefaultCity('')
    setCity('')
    setStoredWeather(null)
    localStorage.removeItem('defaultCity')
    localStorage.removeItem('weatherData')
  }

  return (
    <div className='mx-auto mt-20 w-full max-w-lg px-4 md:px-6 lg:px-8'>
      <div className='rounded-2xl bg-gradient-to-r from-pink-500 to-yellow-300 p-8 text-center text-white shadow-lg dark:from-gray-700 dark:to-gray-900'>
        <div className='mb-4'>
          <input
            type='text'
            placeholder='Enter city name'
            className='w-full max-w-xs rounded-full bg-white p-4 text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-white'
            value={city}
            onChange={e => setCity(e.target.value)}
          />
          <button
            className='mt-4 w-full max-w-xs rounded-full bg-white p-4 text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-white md:mt-0 md:ml-4'
            onClick={() => {
              setDefaultCity('')
              fetchWeather(city)
            }}
          >
            <img src='/images/search.png' alt='search' className='w-4' />
          </button>
          <button
            className='mt-4 w-full max-w-xs rounded-full bg-white p-4 text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-white md:mt-0 md:ml-4'
            onClick={clearWeatherData}
          >
            Clear
          </button>
        </div>
        {isLoading ? (
          <div className='flex justify-center'>
            <div className='h-20 w-20 animate-spin rounded-full border-8 border-t-8 border-white border-t-transparent' />
          </div>
        ) : storedWeather ? (
          <div className='mb-8'>
            <img
              src='/images/rain.png'
              className='mx-auto mb-4 w-40'
              alt='weather icon'
            />
            <h1 className='text-6xl font-light'>
              {Math.round(storedWeather.main.temp)}°c
            </h1>
            <h2 className='mt-2 text-4xl font-medium'>{storedWeather.name}</h2>
            <div className='mt-8 flex flex-wrap justify-around'>
              <div className='flex items-center mb-4 md:mb-0'>
                <img
                  src='/images/humidity.png'
                  alt='humidity'
                  className='mr-2 w-12'
                />
                <div>
                  <p className='text-2xl'>{storedWeather.main.humidity}%</p>
                  <p>Humidity</p>
                </div>
              </div>
              <div className='flex items-center'>
                <img src='/images/wind.png' alt='wind' className='mr-2 w-12' />
                <div>
                  <p className='text-2xl'>{storedWeather.wind.speed} km/h</p>
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          {predefinedLocations.map(location => (
            <div key={location.name} className='rounded-xl p-4 shadow-md'>
              <div className='rounded-xl bg-white p-4 text-gray-700 dark:bg-gray-800 dark:text-white'>
                <p className='mb-2 text-lg font-semibold'>{location.name}</p>
                <button
                  className='rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none'
                  onClick={() => handleViewWeather(location.query)}
                >
                  View Weather
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Weather
