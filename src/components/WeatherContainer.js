import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { apiKey } from '../apis/config'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'
import { CITY_LIST } from '../data/CityList'
import { WeatherCard } from './WeatherCard'

export const WeatherContainer = () => {
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)
  const [city, setCity] = useState(null)
  const [data, setData] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  // GET FORECAST BASED ON USER GEOLOCATION (IF THEY ALLOW IT)
  useEffect(() => {
    if (!navigator.geolocation) {
      setCity(CITY_LIST[0].localizedname)
    } else {
      navigator.geolocation.getCurrentPosition(position => {
        setLat(position.coords.latitude)
        setLng(position.coords.longitude)
      })
    }

    const userLocation = {
      method: 'GET',
      url: 'https://community-open-weather-map.p.rapidapi.com/forecast/daily',
      params: {
        lat: `${lat}`,
        lon: `${lng}`,
        cnt: '7',
        units: 'metric',
      },
      headers: {
        'x-rapidapi-key': `${apiKey}`,
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
      },
    }

    axios
      .request(userLocation)
      .then(function (response) {
        setData(response.data)
        setCity(response.data.city.name)
      })
      .catch(function (error) {
        console.error(error)
      })
  }, [lat, lng])

  // SELECT CITY
  const toggle = () => setDropdownOpen(prevState => !prevState)

  function handleClick(e) {
    setCity(e.target.value)
  }

  // GET FORECAST FROM CITY SELECTION
  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://community-open-weather-map.p.rapidapi.com/forecast/daily',
      params: {
        q: `${city}`,
        cnt: '7',
        units: 'metric',
      },
      headers: {
        'x-rapidapi-key': `${apiKey}`,
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
      },
    }

    axios
      .request(options)
      .then(function (response) {
        setData(response.data)
        setCity(response.data.city.name)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [city])

  return (
    <div className="weather-container">
      {/* Select city */}
      <div className="select-city">
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret>{city}</DropdownToggle>
          <DropdownMenu onClick={handleClick}>
            {CITY_LIST.map(city => {
              return (
                <DropdownItem key={city.id} value={city.localizedname}>
                  {city.localizedname}
                </DropdownItem>
              )
            })}
          </DropdownMenu>
        </Dropdown>
      </div>
      {/* Weather cards */}
      {data ? (
        <div className="weather-cards">
          {data.list.map(forecast => {
            return (
              <WeatherCard
                key={forecast.dt}
                img={forecast.weather[0].icon}
                min={forecast.temp.min.toFixed(1)}
                max={forecast.temp.max.toFixed(1)}
                day={forecast.dt}
              />
            )
          })}
        </div>
      ) : (
        'Loading...'
      )}
    </div>
  )
}
