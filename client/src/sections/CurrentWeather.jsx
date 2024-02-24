import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const windArray = [
	"N",
	"NNE",
	"NE",
	"ENE",
	"E",
	"ESE",
	"SE",
	"SSE",
	"S",
	"SSW",
	"SW",
	"WSW",
	"W",
	"WNW",
	"NW",
	"NNW",
	"N",
];

function CurrentWeather({ lat, lon }) {
	const [weather, setWeather] = useState({});
	const [render, setRender] = useState(<></>);

	const getWeather = async () => {
		if (lat != undefined && lon != undefined) {
			let res = await axios.get(
				`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`
			);
			setWeather(res.data);
		}
	};

	useEffect(() => {
		getWeather();
	}, [lat, lon]);

	useEffect(() => {
		if (weather === undefined) {
			setRender(<></>);
		} else {
			if (weather.main === undefined) {
				setRender(<></>);
			} else {
				let sunrise = weather.sys.sunrise;
				let sunset = weather.sys.sunset;
				let sunriseTime = new Date(
					sunrise * 1000
				).toLocaleTimeString();
				let sunsetTime = new Date(
					sunset * 1000
				).toLocaleTimeString();

				let windDirection = weather.wind.deg;
				// 360 / 16 = 22.5
				// divide wind direction by 22.5, then add .5 to get the compass direction, round down and use as index for windArray
				windDirection = Math.floor(windDirection / 22.5 + 0.5);

				setRender(
					<p id='current-conditions'>
						It is currently {weather.main.temp} degrees, and
						it feels like {weather.main.feels_like} degrees.
						<br />
						Conditions are{" "}
						{weather.weather[0].main.toLowerCase()} with{" "}
						{weather.clouds.all}% cloud cover.
						<br />
						The humidity is at {weather.main.humidity}%.
						<br />
						The wind is blowing to the{" "}
						{windArray[windDirection]} at {weather.wind.speed}{" "}
						miles an hour.
						<br />
						Sunrise is at {sunriseTime}, and sunset will be at{" "}
						{sunsetTime}.
					</p>
				);
			}
		}
	}, [weather]);

	return (
		<div className='page-section' id='current-weather-section'>
			<h2>Fayetteville Current Weather</h2>
			{render}
		</div>
	);
}

export default CurrentWeather;
