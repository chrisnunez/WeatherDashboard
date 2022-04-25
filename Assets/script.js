// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
var button = document.getElementById('searchBtn');
var inputValue = document.getElementById('inputValue');
var cityName = document.querySelector('.cityName');
var temp = document.getElementById('temp');
var wind = document.querySelector('.wind');
var humidity = document.querySelector('.humidity');
var mainDate = document.querySelector('.mainDate');

var arr = localStorage.getItem('City') ? JSON.parse(localStorage.getItem('City')) : [];
addLi();

// Add LI and click for data
function addLi() {
    var ul = document.getElementById('ul');
    var li = document.createElement('button');
    li.className = 'btn btn-secondary btn-block';
    li.appendChild(document.createTextNode(inputValue.value));
    ul.appendChild(li);
    
}


// Search city function
function city() { fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputValue.value + '&appid=e8c8b48dffef0feabe49e481c93904fa&units=imperial')

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
    var cityDate = data.dt * 1000
    var newMainDate = new Date(cityDate).toLocaleDateString("en-US")
    var cityIcon = data.weather[0].icon
    var cityImg = document.createElement('img')
    cityImg.setAttribute("src", "http://openweathermap.org/img/wn/" + cityIcon + ".png");

    // Main display innerHTML
    cityName.innerHTML = ciudadName + ' ' + '(' + newMainDate + ')';
    temp.innerHTML = 'Temp: '+ cityTemp + '°F';
    wind.innerHTML = 'Wind Speed: ' + cityWind + ' MPH';
    humidity.innerHTML = 'Humidity: ' + cityHum + ' %';
    cityName.appendChild(cityImg);
    

    // 5 day forecast
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + cityLat + '&lon=' + cityLon + '&appid=e8c8b48dffef0feabe49e481c93904fa&units=imperial')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        // UV Index variables
        var uvIndex = document.getElementById('uvIndex');
        var getIndex = data.daily[0].uvi;
        uvIndex.innerHTML = getIndex

        // UV Index colors
        if(getIndex < 2) {
            // Red
            uvIndex.style.backgroundColor = 'green';

        } else if(getIndex < 7, getIndex > 3) {
            // Yellow
            uvIndex.style.backgroundColor = "yellow";
        } else {
            // Red
            uvIndex.style.backgroundColor = "red"
        }
        

        for(let i = 1; i < 6; i++) {
            // temperature 5 day loop
            var temp1 = document.getElementById('temp' + i);
            var temp5 = data.daily[i].temp.day;
            temp1.innerHTML = 'Temp: ' + temp5 + '°F'

            // wind 5 day loop
            var wind0 = document.getElementById('wind' + i);
            var wind5 = data.daily[i].wind_speed;
            wind0.innerHTML ='Wind: ' + wind5 + ' MPH'

            // humidity 5 day loop
            var humidity1 = document.getElementById('humidity' + i);
            var humidity5 = data.daily[i].humidity;
            humidity1.innerHTML ='Humidity: ' + humidity5 + '%'

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
            date1.innerHTML = newDate

       }
    })
  })  
  
}



// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city



// Search button to display All weather
button.addEventListener('click', function() {
   
    city();  
    
    localStorage.setItem('City', JSON.stringify(arr));
    arr.push(inputValue.value);
    addLi();
    
})
