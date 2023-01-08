// Declare constant variables
const apiSite = ['https://api.openweathermap.org/data/2.5/forecast?', 'http://api.openweathermap.org/geo/1.0/direct?'];
const apiLat = 'lat=';
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
            document.getElementById('windFive'), document.getElementById('humidFive') ],
         ]
var city = 'Escanaba'/*document.getElementById('city')*/;
var lat = 45.7452;
var lon = -87.0646;

var apiCall = '';

apiCall = apiSite[0] + apiLat + lat + apiLon + lon + apiKey;

fetch(apiCall)
    .then(function (response) {
      return response.json();
      localStorage.setItem('Weather', response);
    })
    .then(function (data) {
        console.log(data);
        document.getElementById('city').textContent = data.city.name;
        //Loop over the data to generate a table, each table row will have a link to the repo url
        for (var i = 0; i < 5; i++) {
            weatherEl[i+1][0].textContent =  data.list[i*8].dt_txt;
            weatherEl[i+1][1].setAttribute('src', 'http://openweathermap.org/img/w/' + data.list[i*8].weather[0].icon + '.png');
            weatherEl[i+1][2].textContent = 'Temp: ' + data.list[i*8].main.temp + '\xB0F';
            weatherEl[i+1][3].textContent = 'wind: ' + data.list[i*8].wind.speed + ' MPH';
            weatherEl[i+1][4].textContent = 'Humidity: ' + data.list[i*8].main.humidity + '%';
        }
    });
