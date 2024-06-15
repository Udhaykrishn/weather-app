import { Button } from '@/components/ui/button'
import { SignInButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'

export default function Home() {
  const { userId } = auth()
  return (
    <section className='bg-gray-800 py-24 text-white'>
      <div className='container mx-auto px-4'>
        <h1 className='mb-8 text-center text-4xl font-bold'>
          Welcome to the Weather App!
        </h1>
        <p className='mb-6 text-center text-lg'>
          Experience seamless authentication, save your search history, and get
          accurate real-time weather updates for any location.
        </p>
        <div className='rounded-lg bg-gray-700 p-6'>
          <h2 className='mb-4 text-center text-3xl font-semibold'>Features</h2>
          <ul className='space-y-4 text-lg'>
            <li className='flex items-center'>
              <span className='mr-2 inline-block h-4 w-4 rounded-full bg-yellow-400'></span>
              Seamless Authentication: Securely log in and manage your account
              with ease.
            </li>
            <li className='flex items-center'>
              <span className='mr-2 inline-block h-4 w-4 rounded-full bg-yellow-400'></span>
              User Search History: Save your past searches and access them
              anytime.
            </li>
            <li className='flex items-center'>
              <span className='mr-2 inline-block h-4 w-4 rounded-full bg-yellow-400'></span>
              Real-Time Weather Updates: Get accurate and up-to-date weather
              information for any location.
            </li>
            <li className='flex items-center'>
              <span className='mr-2 inline-block h-4 w-4 rounded-full bg-yellow-400'></span>
              Responsive Design: Enjoy a user-friendly interface on any device.
            </li>
            <li className='flex items-center'>
              <span className='mr-2 inline-block h-4 w-4 rounded-full bg-yellow-400'></span>
              Detailed Weather Data: Access temperature, humidity, wind speed,
              and more.
            </li>
          </ul>
        </div>
        <div className='mt-4 text-center'>
          {!userId && (
            <>
              <SignInButton mode='modal'>
                <Button size='default'>Sign in</Button>
              </SignInButton>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
