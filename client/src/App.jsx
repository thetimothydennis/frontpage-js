import { useState, useEffect } from "react";
import CurrentWeather from "./sections/CurrentWeather";
import InspoQuote from "./sections/InspoQuote";
import "./stylesheets/App.css";
import axios from "axios";
import Forecast from "./sections/Forecast";
import OnThisDay from "./sections/OnThisDay";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
	const [lat, setLat] = useState();
	const [lon, setLon] = useState();
  const [date, setDate] = useState("");

	async function getCoords() {
		let city = "Fayetteville";
		let state = "US-AR";
		const res = await axios.get(
			`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state}&appid=${API_KEY}`
		);
		setLat(res.data[0].lat);
		setLon(res.data[0].lon);
	}

	useEffect(() => {
		getCoords();
    let now = new Date().toString();
    now = now.split(" ");
    now = now.slice(0,4);
    now = now.join(" ");
    setDate(now)
	}, []);

	return (
		<div className='container' id='root-container'>
			<h1>Daily Frontpage</h1>
      <p id="todays-date">{date}</p>
			<div className='section-container' id='inspo-section-container'>
				<InspoQuote />
			</div>
			<div
				className='section-container'
				id='current-weather-container'
			>
				<CurrentWeather {...{ lat, lon }} />
			</div>
			<div className='section-container' id='forecast-container'>
				<Forecast {...{ lat, lon }} />
			</div>
      <div className='section-container' id="on-this-day-container">
        <OnThisDay />
      </div>
		</div>
	);
}

export default App;
