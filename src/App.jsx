
//App.js

import { Oval } from 'react-loader-spinner';
import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './App.css';

function App() {
    const [input, setInput] = useState('');
    const [weather, setWeather] = useState({
        loading: false,
        data: {},
        error: false,
    });

    const toDateFunction = () => {
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        const WeekDays = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];
        const currentDate = new Date();
        const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]
            }`;
        return date;
    };

    const search = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setInput('City not found');
            setWeather({ ...weather, loading: true });
            const url = 'https://api.openweathermap.org/data/2.5/weather';
            const api_key = 'f00c38e0279b7bc85480c3fe775d518c';
            await axios
                .get(url, {
                    params: {
                        q: input,
                        units: 'metric',
                        appid: api_key,
                    },
                })
                .then((res) => {
                    console.log('res', res);
                    setWeather({ data: res.data, loading: false, error: false });
                })
                .catch((error) => {
                    setWeather({ ...weather, data: {}, error: true });
                    setInput('City not found');
                    console.log('error', error);
                });
        }
    };

    return (
    <div class="bg-blue-500 min-h-screen flex justify-center">
      <h1 className='text-center text-white font-bold text-5xl absolute top-10'>Weather App</h1>
      <form class="mt-4 max-w-xs mx-auto absolute top-20" role="search">
   <div
      class="text-black flex items-center gap-2.5 px-3 py-2.5 relative  rounded-full bg-white  outline-1 -outline-offset-1 outline-slate-300  focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-600">
      <label for="search" class="sr-only ">Search</label>
                <input
                    type="text"
                    className="city-search"
                    placeholder="Enter City Name.."
                    name="query"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyPress={search}
         class="text-sm text-black dark:text-black w-full outline-none pr-10" />
   
                    </div>
</form>
<div className='border border-white border-center w-100 h-100 rounded-xl absolute top-50  flex items-center justify-center text-white'>
{weather.loading && (
                <>
                    <br />
                    <br />
                    <Oval type="Oval" color="black" height={100} width={100} />
                </>
            )}
            {weather.error && (
                <>
                    <br />
                    <br />
                    <span className="error-message">
                        <FontAwesomeIcon icon={faFrown} />
                        <span style={{ fontSize: '20px' }}>City not found</span>
                    </span>
                </>
            )}
            {weather && weather.data && weather.data.main && (
                <div>
                    <div className="absolute top-10 left-20 right-20 text-3xl font-bold">
                        <h2>
                            {weather.data.name}, <span>{weather.data.sys.country}</span>
                        </h2>
                    </div>
                    <div className="absolute top-20 left-25 right-20 text-2xl font-bold">
                        <span>{toDateFunction()}</span>
                    </div>
                    <div className="absolute top-40 left-20 right-0  font-bold">
                       <p className='absolute top-0 left-15 right-30 text-1xl'>{weather.data.weather[0].description}</p>
                        <p className="absolute top-10 left-20 right-40 text-2xl">{Math.round(weather.data.main.temp)}°C</p>
                        <sup className="absolute top-0 left-10 right-30 "></sup>
                    </div>
                    <div className="absolute top-80 left-30 right-20 ">
                        
                        <p>Wind Speed: {weather.data.wind.speed}m/s</p>
                    </div>
                </div>
            )}</div>
                </div>
  )
}

export default App
