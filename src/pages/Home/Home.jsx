import { useState, useRef } from 'react'
import './Style.css'
import axios from 'axios'
import WeatherInfo from '../../components/WeatherInfo/WeatherInfo'
import Weather5DaysInfo from '../../components/Weather5DaysInfo/Weather5DaysInfo'

function Home() {
  const [weatherInfo, setWeatherInfo] = useState()
  const [weather5DaysInfo, setWeather5DaysInfo] = useState()

  const inputRef = useRef()

  async function searchCity() {
    const city = inputRef.current.value
    const key = "23476a223b4845c2b99f00a6f91b489e"

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=en&units=metric`

    const url5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=en&units=metric`

    if (city) {
      const weatherDataApi = await axios.get(url)
      const weatherDataApi5Days = await axios.get(url5Days)
      setWeather5DaysInfo(weatherDataApi5Days.data)
      setWeatherInfo(weatherDataApi.data)
      inputRef.current.value = ''
    }
  }

  return (
    <div className='container'>

      <h1>Weather Forecast</h1>

      <div className='inputBox'>
        <input type="text" placeholder='Type your city' ref={inputRef} />
        <button onClick={searchCity}>🔎</button>
      </div>

      {weatherInfo && <WeatherInfo weatherInfo={weatherInfo} />}
      {weatherInfo && <Weather5DaysInfo weather5DaysInfo={weather5DaysInfo} />}
    </div>
  )
}

export default Home
