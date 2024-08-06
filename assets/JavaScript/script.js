

function getWeather() {
    const apiKey = 'd95f98ef67b4075bedf79ec52ae04cfe'
    const city = document.getElementById('city').value

    // checking to see that city text field has content
    if(!city) {
        alert("Please enter a city");
        return;
    }

    const currentWeatherUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const forecastUrl =`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;/

    fetch(currentWeatherUrl) 
        .then(response => response.json())
        .then(data =>{
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        })
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly weather data:', error);
            alert('Error fetching hourly weather data. Please try again.');
        })
}

function displayWeather(data) {

    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    //Clear previous existing content
    weatherInfoDiv.innerHTML ='';
    hourlyForecastDiv.innerHTML ='';
    tempDivInfo.innerHTML ='';
}