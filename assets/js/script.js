// Declare constant variables
const apiSite = 'https://api.openweathermap.org/data/2.5/forecast?';
const apiLat = 'lat=';
const apiLon = '&lon=';
const apiKey = '&appid=4716e70fcaa2099125ebee1d3f5b0eac';
const city = 'Escanaba';
const lat = 45.7452;
const lon = -87.0646;

var apiCall = '';

//apiCall = apiSite + apiLat + lat + apiLon + lon + apiKey;

fetch(apiCall)
    .then(function (response) {
      return response.json();
      localStorage.setItem('Weather', response);
    }/*)
    .then(function (data) {
      console.log(data)
      //Loop over the data to generate a table, each table row will have a link to the repo url
      for (var i = 0; i < data.length; i++) {
        // Creating elements, tablerow, tabledata, and anchor
        var createTableRow = document.createElement('tr');
        var tableData = document.createElement('td');
        var link = document.createElement('a');

        // Setting the text of link and the href of the link
        link.textContent = data[i].html_url;
        link.href = data[i].html_url;

        // Appending the link to the tabledata and then appending the tabledata to the tablerow
        // The tablerow then gets appended to the tablebody
        tableData.appendChild(link);
        createTableRow.appendChild(tableData);
        tableBody.appendChild(createTableRow);
      }
    }*/);
