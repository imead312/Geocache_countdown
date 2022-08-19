const getJSON = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(response.statusText);

  return await response.json();
};

const displayWeather = async (data) => {
  let temp = data["main"]["temp"];
  let weather = data["weather"][0];
  let main = weather["main"];
  let description = weather["description"];
  let iconUrl = getIconUrl(weather["icon"]);

  // override description field for testing layout
  // description = "thunderstorm with heavy drizzle"

  document.getElementById("temp").innerHTML =
    Math.floor(temp - 273) + " \u00B0C";
  document.getElementById("weather").innerHTML = description;
  document.getElementById("weatherIcon").setAttribute("src", await iconUrl);
};

const getIconUrl = async (iconID) => {
  return `https://openweathermap.org/img/wn/${iconID}@2x.png`;
};

let apiKey = "4ce4cf62a72d099319391003cfaed376";
let city = "Perth";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

// overide weather API fetch for testing
const preGen = false;

if (preGen) {
  document.getElementById("temp").innerHTML = 16 + " \u00B0C";
  document.getElementById("weather").innerHTML = "broken clouds";
  document
    .getElementById("weatherIcon")
    .setAttribute("src", "localWeatherIMG.png");
} else {
  getJSON(url)
    .then((data) => displayWeather(data))
    .catch((error) => {
      console.error(error);
    });
}
