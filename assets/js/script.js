// Declare constant variables
const apiSite = ['https://api.openweathermap.org/data/2.5/weather?units=imperial', 'https://api.openweathermap.org/data/2.5/forecast?units=imperial', 'https://api.openweathermap.org/geo/1.0/direct?'];
const apiLat = '&lat=';
const apiLon = '&lon=';
const apiKey = '&appid=4716e70fcaa2099125ebee1d3f5b0eac';
const citySelector = document.getElementById('citySelector');
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
var city;
var state;
var arrCity;
var unique = true;

function current() {
    apiCall = apiSite[0] + apiLat + lat + apiLon + lon + apiKey;
    
    fetch(apiCall)
    .then(function (response) {
      localStorage.setItem('Weather', response);
      return response.json();
    })
    .then(function (data) {
        console.log(data);
        if(city!=null) {
            document.getElementById('city').textContent = city + ", " + state;
        } else {
            document.getElementById('city').textContent = data.name;
        }
    
        weatherEl[0][0].textContent = dayjs.unix(data.dt).format('M/D/YYYY');
        weatherEl[0][1].setAttribute('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png');
        weatherEl[0][1].setAttribute('alt', data.weather[0].description);
        weatherEl[0][2].textContent = 'Temp: ' + data.main.temp + '\xB0F';
        weatherEl[0][3].textContent = 'wind: ' + data.wind.speed + ' MPH';
        weatherEl[0][4].textContent = 'Humidity: ' + data.main.humidity + '%';
    });
}

function fiveDay() {
    apiCall = apiSite[1] + apiLat + lat + apiLon + lon + apiKey;
    
    fetch(apiCall)
    .then(function (response) {
        localStorage.setItem('Weather', response);
        return response.json();
    })
    .then(function (data) {
        for (var i = 1; i < 6; i++) {
            weatherEl[i][0].textContent = dayjs(data.list[i*8-4].dt_txt).format('M/D/YYYY');
            weatherEl[i][1].setAttribute('src', 'http://openweathermap.org/img/w/' + data.list[i*8-4].weather[0].icon + '.png');
            weatherEl[i][1].setAttribute('alt', data.list[i*8-4].weather[0].description);
            weatherEl[i][2].textContent = 'Temp: ' + data.list[i*8-4].main.temp + '\xB0F';
            weatherEl[i][3].textContent = 'wind: ' + data.list[i*8-4].wind.speed + ' MPH';
            weatherEl[i][4].textContent = 'Humidity: ' + data.list[i*8-4].main.humidity + '%';
        }
    });
}

function loadData() {
    if(localStorage.getItem('city') != null) {
        arrCity = localStorage.getItem('city');
        arrCity = arrCity.split(',');
    }
}

function saveData() {
    localStorage.setItem('city', arrCity);
}

searchBtn.addEventListener('click', function() {
    city = '';
    city = document.getElementById('cityInput').value;

    if(arrCity != null) {
        for(var i = 0; i>arrCity.length; i++) {
            if(city == arrCity[0]) {
                state = arrCity[1];
                lat = arrCity[2];
                lon = arrCity[3];
            }
        }
    }
    apiCall = apiSite[2] + 'q=' + city + apiKey;
    
    fetch(apiCall)
    .then(function (response) {
        saveData();
        return response.json();
    })
    .then(function (data) {
        state = data[0].state;
        lat = data[0].lat;
        lon = data[0].lon;
        if(arrCity==null) {
            arrCity = [city, data[0].state, data[0].lat, data[0].lon];
        } else {
            unique = true;
            for(var i = 0; i < arrCity.length; i+=4) {
                if(arrCity[i] == city) {
                    unique = false;
                } else {
                    if(!unique) {
                        unique = false;
                    } else {
                        unique = true;
                    }
                }
            }
            if(unique) {
                arrCity += ',' + [city, data[0].state, data[0].lat, data[0].lon];
                const button = document.createElement('button');
                button.setAttribute('class', 'cityBtn w-100 bg-info text-light mt-2 mb-2 fs-6');
                button.setAttribute('value', city);
                citySelector.appendChild(button);
                button.textContent = city;  
            }
        }
        
        saveData();
        current();
        fiveDay();
        loadData();
    });
});

loadData();

if(arrCity != null) {
    city = arrCity[0];
    state = arrCity[1];
    lat = arrCity[2];
    lon = arrCity[3];

    for(var i = 0; i < arrCity.length; i+=4) {
        const button = document.createElement('button');
        button.setAttribute('class', 'cityBtn w-100 bg-info text-light mt-2 mb-2 fs-6');
        button.setAttribute('value', arrCity[i]);
        citySelector.appendChild(button);
        button.textContent = arrCity[i];  
    }
}

current();
fiveDay();