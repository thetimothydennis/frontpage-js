import { useState, useEffect } from "react";
import axios from "axios";
import "../stylesheets/onthisday.css";

const ACCESS_TOKEN = import.meta.env.VITE_WIKIPEDIA_ACCESS_TOKEN;

function OnThisDay() {
	const [history, setHistory] = useState({});
	const [render, setRender] = useState(<></>);

	async function getHistory() {
		let today = new Date();
		let month = String(today.getMonth() + 1).padStart(2, "0");
		let day = String(today.getDate()).padStart(2, "0");
		let url = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`;
		let res = await axios.get(url, {
			headers: {
				Authorization: `Bearer ${ACCESS_TOKEN}`,
				"Api-User-Agent":
					"Daily Frontpage (timothyddennis@gmail.com)",
			},
		});
		setHistory(res.data);
	}

	const handleSelectedClick = () => {
		let selectedContainer = document.getElementById("day-selected");
		let selectedContainerBtn = document.getElementById("day-selected-btn");
		if (selectedContainer.style.display == "none") {
			selectedContainer.style.display = "block";
			selectedContainerBtn.style.backgroundColor = "hsl(70, 50%, 10%)";
			selectedContainerBtn.style.color = "hsl(140, 80%, 80%)";
			
		} else if (selectedContainer.style.display == "block") {
			selectedContainer.style.display = "none";
			selectedContainerBtn.style.backgroundColor = "hsl(140, 80%, 80%)";
			selectedContainerBtn.style.color = "hsl(70, 50%, 10%)";
		}
	};

	const handleBirthClick = () => {
		let selectedContainer = document.getElementById("day-births");
		let selectedContainerBtn = document.getElementById("day-births-btn");
		if (selectedContainer.style.display == "none") {
			selectedContainer.style.display = "block";
			selectedContainerBtn.style.backgroundColor = "hsl(70, 50%, 10%)";
			selectedContainerBtn.style.color = "hsl(140, 80%, 80%)";
		} else if (selectedContainer.style.display == "block") {
			selectedContainer.style.display = "none";
			selectedContainerBtn.style.backgroundColor = "hsl(140, 80%, 80%)";
			selectedContainerBtn.style.color = "hsl(70, 50%, 10%)";
		}
	};

	const handleDeathsClick = () => {
		let selectedContainer = document.getElementById("day-deaths");
		let selectedContainerBtn = document.getElementById("day-deaths-btn");
		if (selectedContainer.style.display == "none") {
			selectedContainer.style.display = "block";
			selectedContainerBtn.style.backgroundColor = "hsl(70, 50%, 10%)";
			selectedContainerBtn.style.color = "hsl(140, 80%, 80%)";
		} else if (selectedContainer.style.display == "block") {
			selectedContainer.style.display = "none";
			selectedContainerBtn.style.backgroundColor = "hsl(140, 80%, 80%)";
			selectedContainerBtn.style.color = "hsl(70, 50%, 10%)";
		}
	};

	const handleHolidaysClick = () => {
		let selectedContainer = document.getElementById("day-holidays");
		let selectedContainerBtn = document.getElementById("day-holidays-btn");
		if (selectedContainer.style.display == "none") {
			selectedContainer.style.display = "block";
			selectedContainerBtn.style.backgroundColor = "hsl(70, 50%, 10%)";
			selectedContainerBtn.style.color = "hsl(140, 80%, 80%)";
		} else if (selectedContainer.style.display == "block") {
			selectedContainer.style.display = "none";
			selectedContainerBtn.style.backgroundColor = "hsl(140, 80%, 80%)";
			selectedContainerBtn.style.color = "hsl(70, 50%, 10%)";
		}
	};

	useEffect(() => {
		getHistory();
	}, []);

	useEffect(() => {
		console.log(history);
		if (history.selected != undefined) {
			setRender(
				<div id='on-this-day-container'>
					<h2>On This Day...</h2>
					<div className='day-section-container'>
						<h3 id="day-selected-btn" onClick={handleSelectedClick}>
							Selected Events
						</h3>
						<div
							id='day-selected'
							className='day-component'
							style={{ display: "none" }}
						>
							<div
								id='day-selected-container'
								className='day-item-container'
							>
								{history.selected.map((item, x) => (
									<div
										key={x}
										className='day-selected-item'
									>
										<p>
											{item.text} - <span className="item-year">{item.year}</span>
										</p>
									</div>
								))}
								<a href='#on-this-day-container'>
									Back to top
								</a>
							</div>
						</div>
					</div>
					<div className='day-section-container'>
						<h3 id="day-births-btn" onClick={handleBirthClick}>Births</h3>
						<div
							id='day-births'
							className='day-component'
							style={{ display: "none" }}
						>
							<div
								id='day-births-container'
								className='day-item-container'
							>
								{history.births.map((item, x) => (
									<div
										key={x}
										className='day-births-item'
									>
										<p>
											{item.text} - <span className="item-year">{item.year}</span>
										</p>
									</div>
								))}
								<a href='#on-this-day-container'>
									Back to top
								</a>
							</div>
						</div>
					</div>
					<div className='day-section-container'>
						<h3 id="day-deaths-btn" onClick={handleDeathsClick}>Deaths</h3>
						<div
							id='day-deaths'
							className='day-component'
							style={{ display: "none" }}
						>
							<div
								id='day-deaths-container'
								className='day-item-container'
							>
								{history.deaths.map((item, x) => (
									<div
										key={x}
										className='day-deaths-item'
									>
										<p>
											{item.text} - <span className="item-year">{item.year}</span>
										</p>
									</div>
								))}
								<a href='#on-this-day-container'>
									Back to top
								</a>
							</div>
						</div>
					</div>
					<div className='day-section-container'>
						<h3 id="day-holidays-btn" onClick={handleHolidaysClick}>Holdiays</h3>
						<div
							id='day-holidays'
							className='day-component'
							style={{ display: "none" }}
						>
							<div
								id='day-holidays-container'
								className='day-item-container'
							>
								{history.holidays.map((item, x) => (
									<div
										key={x}
										className='day-holidays-item'
									>
										<p>{item.text}</p>
									</div>
								))}
								<a href='#on-this-day-container'>
									Back to top
								</a>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}, [history]);

	return <div>{render}</div>;
}

export default OnThisDay;
