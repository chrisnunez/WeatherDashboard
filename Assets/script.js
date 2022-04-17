// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
var button = document.getElementById('searchBtn');
var inputValue = document.getElementById('inputValue');
var cityName = document.querySelector('.cityName');
var temp = document.querySelector('.temp');
var wind = document.querySelector('.wind');
var humidity = document.querySelector('.humidity');
var uvIndex = document.querySelector('.uvIndex');


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
        temp.innerHTML += cityTemp + '°F';
        wind.innerHTML += cityWind + ' MPH';
        humidity.innerHTML += cityHum + ' %';


        // 5 day forecast
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + cityLat + '&lon=' + cityLon + '&appid=e8c8b48dffef0feabe49e481c93904fa&units=imperial')
        .then(res => res.json())
        .then(data => {
            console.log(data)

            for(let i = 0; i < 5; i++) {
                // temperature 5 day loop
                var temp1 = document.getElementById('temp' + i);
                var temp5 = data.daily[i].temp.day;
                temp1.innerHTML += temp5 + '°F'
    
                // wind 5 day loop
                var wind0 = document.getElementById('wind' + i);
                var wind5 = data.daily[i].wind_speed;
                wind0.innerHTML += wind5 + ' MPH'

                // humidity 5 day loop
                var humidity1 = document.getElementById('humidity' + i);
                var humidity5 = data.daily[i].humidity;
                humidity1.innerHTML += humidity5

                // icon 5 day loop
                var icon1 = document.getElementById('icon' + i);
                var icon = data.daily[i].weather[0].icon;
                var img = document.createElement('img')
                img.setAttribute("src", "http://openweathermap.org/img/wn/" + icon + ".png");
                icon1.appendChild(img);

                // date 5 day loop
                var date1 = document.getElementById('date' + i)
                var date5 = data.daily[i].dt *1000
                var newDate = new Date(date5).toLocaleDateString("en-US")
                date1.innerHTML += newDate


            }


        })


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

