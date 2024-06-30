import { useCallback, useEffect, useState } from 'react';
import './App.css';

function App() {

  const [city, setCity] = useState('Vadodara');
  const [weatherData, setWeatherData] = useState(null);

  const currentDate = new Date();
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
    'December'
  ];

  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`

  const API_KEY = '1b0e811003c1c4fbb016d1c3d2797ba1';

  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

      const data = await response.json();
      console.log(data);
      setWeatherData(data);
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData();
  },[])

  const handleInputChange = (event) => {
    console.log(event.target.value);
    setCity(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  }
  
  const getWeatherIconUrl = (main) => {
    switch(main) {
      case 'Sun':
        return '/sun.png';
      case 'Clouds':
        return '/cloud.png';
      case 'Rain':
        return '/rain.png';
      case 'Mist':
        return '/mist.png';
      case 'Haze':
        return '/haze.png';
      case 'Snow':
        return '/snow.png';
      case 'Thunder':
        return '/thunder.png';  
      default:
        return null;
    }
  };


  return (
    <div className="App">
      <div className='container'>
      
      {weatherData && (
        <>

        <h1 className='container-date'>{formattedDate}</h1>
        <div className='weather-data'>
          <h2 className='container-city'>{weatherData.name}</h2>

          <img className='container-img' 
          src={getWeatherIconUrl(weatherData.weather[0].main)}
          width='150px'
          alt='Weather Icon' />

          <h2 className='container-degree'>{weatherData.main.temp}</h2>
          <h2 className='container-p'>{weatherData.weather[0].main}</h2>
          <form className='form' onSubmit={handleSubmit}>
            <input type='text' className='input' placeholder='Enter city' onChange={handleInputChange}></input>
            <button type='submit'>Go</button>
          </form>
        </div>

        </>
      )}

      </div>
    </div>
  );
}

export default App;
