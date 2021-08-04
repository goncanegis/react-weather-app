import React from 'react'
import { days } from '../data/DayList'

export const WeatherCard = props => {
  return (
    <div className="weather-card">
      <div className="weather-day">
        {days[new Date(props.day * 1000).getDay()]}
      </div>
      <div className="weather-icon">
        <img
          src={`https://openweathermap.org/img/wn/${props.img}@2x.png`}
          alt="weather icon"
        />
      </div>
      <div className="weather-temp">
        <div className="temp-max">{props.max}ºC</div>
        <div className="temp-min">{props.min}ºC</div>
      </div>
    </div>
  )
}
