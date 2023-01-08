// Declare constant variables
const apiSite = ['https://api.openweathermap.org/data/2.5/weather?units=imperial', 'https://api.openweathermap.org/data/2.5/forecast?units=imperial', 'http://api.openweathermap.org/geo/1.0/direct?'];
const apiLat = '&lat=';
const apiLon = '&lon=';
const apiKey = '&appid=4716e70fcaa2099125ebee1d3f5b0eac';
const searchBtn = document.getElementById('searchBtn');
const weatherEl = [[ document.getElementById('date'), document.getElementById('weather'), document.getElementById('temp'), 
            document.getElementById('wind'), document.getElementById('humid') ], 
            [ document.getElementById('dateOne'), 
            document.getElementById('weatherOne'), document.getElementById('tempOne'), document.getElementById('windOne'), 
            document.getElementById('humidOne') ], 
            [ document.getElementById('dateTwo'), document.getElementById('weatherTwo'), document.getElementById('tempTwo'), 
            document.getElementById('windTwo'), document.getElementById('humidTwo') ], 
            [ document.getElementById('dateThree'), document.getElementById('weatherThree'), document.getElementById('tempThree'), 
            document.getElementById('windThree'), document.getElementById('humidThree') ], 
            [ document.getElementById('dateFour'), document.getElementById('weatherFour'), document.getElementById('tempFour'), 
            document.getElementById('windFour'), document.getElementById('humidFour') ], 
            [ document.getElementById('dateFive'), document.getElementById('weatherFive'), document.getElementById('tempFive'), 
            document.getElementById('windFive'), document.getElementById('humidFive') ] ];

//Coordinates for Escanaba Michigan
var lat = 45.7452;
var lon = -87.0646;
var apiCall = '';

apiCall = apiSite[0] + apiLat + lat + apiLon + lon + apiKey;

fetch(apiCall)
.then(function (response) {
  localStorage.setItem('Weather', response);
  return response.json();
})
.then(function (data) {
    console.log(data);
    document.getElementById('city').textContent = data.name;
    console.log(dayjs.unix(data.dt).format('M/D/YYYY'));

    weatherEl[0][0].textContent = dayjs.unix(data.dt).format('M/D/YYYY');
    weatherEl[0][1].setAttribute('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png');
    weatherEl[0][2].textContent = 'Temp: ' + data.main.temp + '\xB0F';
    weatherEl[0][3].textContent = 'wind: ' + data.wind.speed + ' MPH';
    weatherEl[0][4].textContent = 'Humidity: ' + data.main.humidity + '%';
});

apiCall = apiSite[1] + apiLat + lat + apiLon + lon + apiKey;

fetch(apiCall)
.then(function (response) {
    localStorage.setItem('Weather', response);
    return response.json();
})
.then(function (data) {
    console.log(data);
    document.getElementById('city').textContent = data.city.name;
    //Loop over the data to generate a table, each table row will have a link to the repo url
    for (var i = 1; i < 6; i++) {
        console.log(i*8-1);
        console.log(data.list[i*8-1].dt_txt);
        weatherEl[i][0].textContent = dayjs(data.list[i*8-1].dt_txt).format('M/D/YYYY');
        weatherEl[i][1].setAttribute('src', 'http://openweathermap.org/img/w/' + data.list[i*8-1].weather[0].icon + '.png');
        weatherEl[i][2].textContent = 'Temp: ' + data.list[i*8-1].main.temp + '\xB0F';
        weatherEl[i][3].textContent = 'wind: ' + data.list[i*8-1].wind.speed + ' MPH';
        weatherEl[i][4].textContent = 'Humidity: ' + data.list[i*8-1].main.humidity + '%';
    }
});
