import CurrentWeather from './sections/CurrentWeather'
import InspoQuote from './sections/InspoQuote'
import './stylesheets/App.css'

function App() {

  return (
    <div className="container" id="root-container">
      <h1>Hello world!</h1>
      <div className="section-container" id="inspo-section-container">
        <InspoQuote />
      </div>
      <div className="section-container" id="current-weather-container">
        <CurrentWeather />
      </div>
    </div>
  )
}

export default App
