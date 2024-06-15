"use client"
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Weather from '@/components/weather'

const Home = () => {
  const router = useRouter()
  const { userId } = useAuth()

  if (!userId) {
    router.push('/')
    return null
  }

  return (
    <div className='container'>
      <Weather />
    </div>
  )
}

export default Home
