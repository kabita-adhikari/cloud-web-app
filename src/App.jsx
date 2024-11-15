import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'

import './App.css'

import search from './assets/icons/search.svg'
import { useStateContext } from './context'
import {BackgroundLayout,WeatherCard, MiniCard} from './components'
import Chatbot from './Chatbot'

function App() {

  const [input, setInput] = useState('')

  const {weather,thisLocation,values,place,setPlace,airQuality,pollen1,pollen2,pollen3} = useStateContext()
  console.log(weather)
  
  const SubmitCity =() => {
    setPlace(input)
    setInput('')

  }

  return (
    <Router>
    <div className='w-full h-screen text-white px-8'>

      <nav className='w-full p-3 flex justify-between items-center'>
        <h1 className='font-bold tracking-wide text-3xl'>KnowYourWeather.com</h1>

        <div className='bg-white w-[20rem] overflow-hidden shadow-lg rounded-full flex items-center px-4 py-2 gap-2'>

          <img src={search} alt="search" className='w-[2.5rem] h-[2.5rem]' />
          <input onKeyUp={(e) => {
            if (e.key === 'Enter') {
              //submit the form
              SubmitCity()
            }
          }}  type="text" 
          placeholder='Enter the city here' 
          className='focus:outline-none w-full text-[#212121] text-base placeholder-gray-500' 
          value={input} 
          onChange={e=> setInput(e.target.value)} />
          </div>
        <div className='bg-white w-[10rem] overflow-hidden shadow-lg rounded-full flex items-center px-4 py-2 gap-2'>  
        <Link to="/chatbot" className="text-blue-500">Go to Chatbot</Link> 
        </div>
        <div className='bg-white w-[8rem] overflow-hidden shadow-lg rounded-full flex items-center px-4 py-2 gap-2'>
        <Link to="/" className="text-blue-500">Go to Home</Link>
        </div>
        
      </nav>

      <BackgroundLayout></BackgroundLayout>
      <Routes>
      <Route 
        path="/" 
        element={
          <main className='w-full flex flex-col items-center py-8 gap-10'>
            <WeatherCard
              place={thisLocation}
              airQuality={airQuality}
              pollen1 = {pollen1}
              pollen2={pollen2}
              pollen3={pollen3}
              windspeed={weather.wspd}
              uvindex={weather.uvindex}
              temperature={weather.temp}
              iconString={weather.conditions}
              conditions={weather.conditions}
          />

          <div className='flex justify-center gap-6 flex-wrap w-full max-w-7xl'>
            {
              values?.slice(1, 7).map(curr => {
                return (
                  <MiniCard
                    key={curr.datetime}
                    time={curr.datetime}
                    temp={curr.temp}
                    iconString={curr.conditions}
                  />
                )
              })
            }
          </div>

        </main>
      }
      />
      <Route path="/chatbot" element={<Chatbot />} /> {/* Chatbot page */}
      </Routes>

      
    </div>
  </Router>  
  )
}

export default App
