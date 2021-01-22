// Foursquare API Info
const clientId = "W2AGD5Y2PTWTIDSV3H5QV02PDULXQKQHROXTWUDAHOOJODJN";
const clientSecret = "RITFDPMGSQUGQZP1RPDEP0M3M0VWFGCICOSEG0HHBYABCROG";
const url = "https://api.foursquare.com/v2/venues/explore?near=";

// OpenWeather Info
const openWeatherKey = "221da0245ea5e3787bbb07a8e626bc83";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";

// Page Elements
const $input = $("#city");
const $submit = $("#button");
const $destination = $("#destination");
const $container = $(".container");
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Add AJAX functions here:
const getVenues = async () => {
  const city  = $input.val();
  const urlToFetch = `${url + city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20210122`;
  try{
    const response  = await fetch(urlToFetch);
    if(response.ok){
      const jsonResponse = await response.json();
      const venues = jsonResponse.response.groups[0].items.map(item => item.venue);
      console.log(venues);
      console.log(jsonResponse);
      return venues;
    }
  }
  catch(error){
    console.log(error);
  }
};

const getForecast = async () => {
  const urlToFetch = `${weatherUrl}?q=${$input.val()}&APPID=${openWeatherKey}`;
  try {
    const response = await fetch(urlToFetch);
    if(response.ok){
      const jsonResponse = await response.json();
      return jsonResponse;
    }
  } catch (error) {
    console.log(error);
  }
};

// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    // Add your code here:
    const venue = venues[index];
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = venueIcon.prefix + 'bg_64' + venueIcon.suffix;
    // const venueImg = venue.photos;
    // const venueImgSrc = venueImg.prefix + '350x400' + venueImg.suffix;
    let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc,);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
};

function renderForecast(day) {
  // Add your code here:
  let weatherContent = createWeatherHTML(day);
  $weatherDiv.append(weatherContent);
}

function executeSearch() {
  $venueDivs.forEach((venue) => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venues => renderVenues(venues));
  getForecast().then(forecast => renderForecast(forecast));
  return false;
}

$submit.click(executeSearch);
