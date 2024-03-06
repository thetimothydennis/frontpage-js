import { useState, useEffect } from "react";
import "../stylesheets/inspoquote.css";
import axios from "axios";

const API_KEY = import.meta.env.VITE_QUOTE_API_KEY;

function InspoQuote() {
	const [quote, setQuote] = useState({});

	const getQuote = async () => {
		let newQuote = await axios({
			method: "GET",
			url: `https://api.api-ninjas.com/v1/quotes?category=success`,
			headers: {
				"X-Api-Key": API_KEY,
			},
		});
		setQuote(newQuote.data[0]);
	};

	useEffect(() => {
		getQuote();
	}, []);

	return (
		<div className='page-section' id='quote-section'>
			{quote != {} ? (
				<div id='quote-response'>
					<p
						id='quote-text'
						className='quote-element quote-text'
					>
						{quote.quote}
					</p>
					<h5
						id='quote-author'
						className='quote-element quote-author'
					>
						{quote.author}
					</h5>
					{/* <h6
						id='quote-category'
						className='quote-element quote-category'>
						{quote.category}
					</h6> */}
				</div>
			) : (
				<div id='no-quote'></div>
			)}
		</div>
	);
}

export default InspoQuote;
