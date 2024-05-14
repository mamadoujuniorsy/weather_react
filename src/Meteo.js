import React, { useState, useEffect } from 'react';

const Meteo = () => {
  const [city, setCity] = useState('');
  const [meteoData, setMeteoData] = useState(null);
  const [ready, setReady] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('');

  const API_KEY = '206c534f9b3e2f02887a139679848de5';

  useEffect(() => {
    if (city.trim() !== '') {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        .then(response => response.json())
        .then(data => {
          setMeteoData({
            temperature: data.main.temp,
            feelsLike: data.main.feels_like,
            minTemperature: data.main.temp_min,
            maxTemperature: data.main.temp_max,
            humidity: data.main.humidity,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            windSpeed: data.wind.speed,
            visibility: data.visibility,
            country: data.sys.country,
            sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
            sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString()
          });
          setReady(true);
          // Change background color based on temperature
          if (data.main.temp > 25) {
            setBackgroundColor('bg-red-200');
          } else if (data.main.temp < 20) {
            setBackgroundColor('bg-blue-200');
          } else {
            setBackgroundColor('bg-white');
          }
        })
        .catch(error => console.error('Erreur lors de la récupération des données météo : ', error));
    }
  }, [city]);

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const weatherDetails = [
    { label: 'Température', value: `${meteoData?.temperature}°C` },
    { label: 'Température ressentie', value: `${meteoData?.feelsLike}°C` },
    { label: 'Température minimale', value: `${meteoData?.minTemperature}°C` },
    { label: 'Température maximale', value: `${meteoData?.maxTemperature}°C` },
    { label: 'Humidité', value: `${meteoData?.humidity}%` },
    { label: 'Description', value: meteoData?.description },
    { label: 'Vitesse du vent', value: `${meteoData?.windSpeed} m/s` },
    { label: 'Visibilité', value: `${meteoData?.visibility} m` },
    { label: 'Levé du soleil', value: meteoData?.sunrise },
    { label: 'Couché du soleil', value: meteoData?.sunset }
  ];

  return (
    <div className={`container mx-auto`}>
      <h1 className="text-3xl font-bold mb-6 text-center">Météo App</h1>
      <div className="flex items-center justify-center mb-4">
        <input
          type="text"
          value={city}
          onChange={handleChange}
          placeholder="Entrez le nom de votre ville"
          className="border border-gray-300 p-2 rounded-md mr-2"
        />
        <button
          onClick={() => setCity(city)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Rechercher
        </button>
      </div>
      {ready && meteoData && (
        <div className={`w-[700px] ${backgroundColor} ml-[400px]`}>
          <h2 className="text-xl font-semibold mb-2 text-center">Conditions météo à {city}, {meteoData.country}</h2>
          <div className="flex items-center">
            <img
              src={`http://openweathermap.org/img/wn/${meteoData.icon}.png`}
              alt="Weather Icon"
              className="w-10 h-10 mr-2"
            />
            <div>
              <p className="text-lg">{meteoData.temperature}°C</p>
              <p>{meteoData.description}</p>
            </div>
          </div>
          <div className="mt-4 flex flex-col items-center justify-center">
            {weatherDetails.map((detail, index) => (
              <p key={index}>{detail.label}: {detail.value}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Meteo;
