

function getWeather() {
    const apiKey = 'd95f98ef67b4075bedf79ec52ae04cfe'
    const city = document.getElementById('city').value

    // checking to see that city text field has content
    if(!city) {
        alert("Please enter a city");
        return;
    }

    const currentWeatherUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl =`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl) 
        .then(response => response.json())
        .then(data =>{
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayDailyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching 5-day weather data:', error);
            alert('Error fetching 5-day weather data. Please try again.');
        })
    }
function showImage(){
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
}

// take weather data extract relevant information and update HTML elements within the current weather details and display issues if theres a error with the API request
function displayWeather(data) {

    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const dailyForecastDiv = document.getElementById('5-dayForecast');

    //Clear previous existing content
    weatherInfoDiv.innerHTML ='';
    dailyForecastDiv.innerHTML ='';
    tempDivInfo.innerHTML ='';

    
    if(data.cod ==='404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `
        <p>${temperature}°C</p>
        `;
        const weatherHTML = `
            <p>${cityName}</p>
            <p>${description}</p>
        ` ;
        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHTML;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }

    
}

{
    "daily": [
        {
            "dt": 1689897600,
            "temp": {
                "day": 293.15
            },
            "weather": [
                {
                    "icon": "01d"
                }
            ]
        },
        // Additional days
    ]
}
function displayDailyForecast(dailyData) {
    const dailyForecastDiv = document.getElementById('5-dayForecast');
    const next5Days = dailyData.slice(0, 5);
    // Clear the existing content
    dailyForecastDiv.innerHTML = '';

    // Arrays to map day numbers to names
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    next5Days.forEach(item => {
        // Convert Unix timestamp to JavaScript Date object
        const dateTime = new Date(item.dt * 1000);

        // Extract the day of the week from the Date object
        const dayNumber = dateTime.getDay();
        const dayName = dayNames[dayNumber];
        
        const temperature = Math.round(item.main.temp -273.15);
        // Construct icon URL
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        // Build the HTML string for the current daily item
        const dailyItemHTML = `
        <div class="daily-item">
            <span>${dayName}</span>
            <img src="${iconUrl}" alt="Daily Weather Icon">
            <span>${temperature}°C</span>
        </div>
        `;
        
        // Append the daily item HTML to the container
        dailyForecastDiv.innerHTML += dailyItemHTML;
    });
}