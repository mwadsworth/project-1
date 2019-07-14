$(document).ready(function () {

  //setting global variables
  var search = '';
  var lat = '';
  var lon = '';

  //this function will call to the TicketMaster API and display upcoming events and provide a link to purchase tix via TicketMaster.
  function displayTicketMaster() {
    event.preventDefault();

    //setting the search to whatever the user inputs.
    search = $("#search").val();
    var queryURLtm = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + search + "&apikey=Hs5mRXXWOg1wyGYRQsUNEegIcLGW3812";

    //ajax call referring to ticketmaster
    $.ajax({
      url: queryURLtm,
      method: "GET"
    }).then(function (response) {
      console.log(response._embedded);
      console.log(queryURLtm);

      //starts a forloop through the results to add events and display the Event and a URL by appending to the page.
      for (var i = 0; i < response._embedded.events.length; i++) {
        $("#events").append("<h5> Event: " + response._embedded.events[i].name + "</h5>" + "<a href=" + response._embedded.events[i].url +
          ">" + response._embedded.events[i].name + "</a>");
      }
    })
  }

  // This is the start of our Zomato API which will display hot trending restaurants within the area.
  function displayZomato() {
    event.preventDefault();


    //using the Openweather API we created a way to take the search input and convert the city into the latitude and longitude.
    search = $("#search").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + search + ",Burundi&units=imperial&us&mode=json&appid=67bc031d2f43613da054c1c50d4ec84b";

    //Ajax call for Openweather API

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      lat = response.city.coord.lat;
      lon = response.city.coord.lon;

      // we then inserted the lat and lon variables into the Zomato API to get a more accurate result of the location that has been inputted.
    }).then(function () {
      var queryURLz = "https://developers.zomato.com/api/v2.1/collections?lat=" + lat + "&lon=" + lon + "&apikey=9ff7290016f630d99b4d58d9a605925b";


      //ajax call for Zomato API

      $.ajax({
        url: queryURLz,
        method: "GET"
      }).then(function (response) {
        console.log(response.collections);
        console.log(queryURLz);

        //forlooping through the results to append the best restaurants within the area provided and a URL to find out more about the website.

        for (var i = 0; i < response.collections.length; i++) {
          $("#food").append("<h5> Food Description: " + response.collections[i].collection.description + "</h5>" + "<a href=" + response.collections[i].collection.url + ">" + response.collections[i].collection.description + "</a>");
        }
      })
    })
  }

  //this is our weather API that we call to get the latitude and longitude using both Openweather and DarkSky API 
  function displayWeather() {
    event.preventDefault();

    //emptying the search value

    search = $("#search").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + search + ",Burundi&units=imperial&us&mode=json&appid=67bc031d2f43613da054c1c50d4ec84b";

    //ajax call for open weather to grab the lat and lon for a accurate pinpoint location.
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      lat = response.city.coord.lat;
      lon = response.city.coord.lon;

      //calling the lat and lon variables and inserting them into the dark sky api while also incorporating "cors-anywhere" (like a proxy) to ensure the search will happen.
    }).then(function () {
      var queryURLds = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/e3c76d1194d2934de7379284bb366dcd/" + lat + "," + lon;


      // Ajax Call for DarkSky API
      $.ajax({
        url: queryURLds,
        method: "GET"
      })
        .then(function (response) {
          console.log(response);

          // for loop to grab the weather information from the lat and lon that were converted from the user's original search.

          for (var i = 0; i < response.daily.data.length; i++) {
            $("#weather").append("<h4> High: " + response.daily.data[i].temperatureHigh + " </h4>" + "<h4>Low: " + response.daily.data[i].temperatureLow + "</h4>" + "<h3>------------</h3")
          };
        })
    })
  }

  //this will run the following functions when the search button is clicked.
  $("#run-search").on("click", function () {
    displayTicketMaster();
    displayZomato();
    displayWeather();
  });




});
