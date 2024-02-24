import { useState, useEffect } from "react";
import axios from "axios";
import "../stylesheets/forecast.css";

function Forecast({ lat, lon }) {
	const [forecastArr, setForecastArr] = useState([]);
	const [render, setRender] = useState(<></>);

	const getForecast = async () => {
		if (lat != undefined && lon != undefined) {
			const res1 = await axios.get(
				`https://api.weather.gov/points/${lat},${lon}`,
				{ headers: { Accept: "application/ld+json" } }
			);
			const res2 = await axios.get(res1.data.forecast);
			let periods = res2.data.properties.periods;
			setForecastArr(periods);
		}
	};

	useEffect(() => {
		getForecast();
	}, [lat, lon]);

	useEffect(() => {
		console.log(forecastArr);
		let trimmedForecast = forecastArr.slice(0, 5);
		console.log(trimmedForecast);
		setRender(
			<div id='forecast'>
				{trimmedForecast.map((period, x) => (
					<div className='forecast-period' key={x}>
						<h3>{period.name}</h3>
						<img src={period.icon} />
						<p>{period.detailedForecast}</p>
					</div>
				))}
			</div>
		);
	}, [forecastArr]);

	return (
		<div className='page-section' id='forecast-section'>
			<h2>Fayetteville Forecast</h2>
			{render}
		</div>
	);
}

export default Forecast;
