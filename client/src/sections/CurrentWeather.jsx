import {useState, useEffect} from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function CurrentWeather() {
     const [weather, setWeather] = useState({});

     const getWeather = async () => {
          let city = "Fayetteville";
          let state = "AR";
          const res = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`)
      
          
          let data2 = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${res.data[0].lat}&lon=${res.data[0].lon}&appid=${API_KEY}&units=imperial`);
          setWeather(data2.data);
     }

     useEffect(() => {
          getWeather()
     }, [])

     useEffect(() => {
          console.log(weather)
     }, [weather])

     return (
          <div className="page-section" id="current-weather-section">
               
          </div>
     )
}

export default CurrentWeather;