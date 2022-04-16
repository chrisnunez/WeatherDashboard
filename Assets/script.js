// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
var button = document.getElementById('searchBtn');
var inputValue = document.getElementById('inputValue');
var cityName = document.querySelector('.cityName');
var tempe = document.querySelector('.temp');
var wind = document.querySelector('.wind');
var humidity = document.querySelector('.humidity');
var uvIndex = document.querySelector('.uvIndex');
var day1 = document.querySelector('.day1')
var wind5 = document.querySelector('.windy');
var humidity0 = document.querySelector('.humidity0')
var temperature = document.querySelector('.temperature0')

// Search button to display All weather
button.addEventListener('click', function(event) {
    
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputValue.value + '&appid=e8c8b48dffef0feabe49e481c93904fa&units=imperial')

    .then(res => res.json())
    .then((data) => {
        console.log(data)

        // Main forecast display variables
        var ciudadName = data.name
        var cityTemp = data['main']['temp']
        var cityWind = data.wind['speed']
        var cityHum = data['main']['humidity']
        var cityLat = data['coord']['lat']
        var cityLon = data['coord']['lon']
        // Main display innerHTML
        cityName.innerHTML += ciudadName;
        tempe.innerHTML += cityTemp + '°F';
        wind.innerHTML += cityWind + ' MPH';
        humidity.innerHTML += cityHum + ' %';


        // 5 day forecast
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + cityLat + '&lon=' + cityLon + '&appid=e8c8b48dffef0feabe49e481c93904fa&units=imperial')
        .then(res => res.json())
        .then(data => {
            console.log(data)


            // 5 day forecast variables
            var date1 = document.querySelector('.date1')
            var icon1 = document.querySelector('.icon1');
            var temp1 = document.querySelector('.temp1');
            var wind1 = document.querySelector('.wind1');
            var humidity1 = document.querySelector('.humidity1');

            // Locate variables
            var date5 = data.daily[0].dt *1000
            var newDate = new Date(date5).toLocaleDateString("en-US")
            var icon = data.daily[0].weather[0].icon;
            var temp5 = data.daily[0].temp.day;
            var wind5 = data.daily[0].wind_speed;
            var humidity5 = data.daily[0].humidity;

            // Display Date
            date1.innerHTML += newDate

            // Display icon img
            var img = document.createElement('img')
            img.setAttribute("src", "http://openweathermap.org/img/wn/" + icon + ".png");
            icon1.appendChild(img);

            // Display Temperature
            temp1.innerHTML += temp5 + '°F'

            // Display Wind
            wind1.innerHTML += wind5 + ' MPH'

            // Display Humidity
            humidity1.innerHTML += humidity5


            
            

        })

        // fetch("http://openweathermap.org/img/wn/" + icon + ".png")
        // .then(res => res.json())
        // .then(data => {
            
        // })

    })
// Adds city under search
addLi();
// Adds city to local storage

event.preventDefault();
})



// Create a function for adding an LI to the search history
function addLi() {
    var ul = document.getElementById('ul');
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(inputValue.value));
    ul.appendChild(li);
    localStorage.setItem('City', inputValue.value)
}




// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index

localStorage.setItem('City', inputValue.value)
localStorage.getItem('City')




// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe










// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity








// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

