console.log("hello!!!");

const state = {
  city: "Seattle",
  lat: 47.6038321,
  long: -122.3300624,
  temp: 72,
};

const convertKtoF = (temp) => {
  return (temp - 273.15) * (9 / 5) + 32;
};

const findLatAndLong = () => {
  //let lat, long;
  axios
    .get("https://us1.locationiq.com/v1/search.php", {
      params: {
        key: key,
        q: state.city,
        format: "json",
      },
    })
    .then((response) => {
      state.lat = response.data[0].lat;
      state.long = response.data[0].lon;
      getWeather();
    })
    .catch((error) => {
      console.log("error in findLatAndLong!", error.response);
    });
};

const getWeather = () => {
  axios
    .get("https://api.openweathermap.org/data/2.5/onecall", {
      params: {
        appid: appid,
        lat: state.lat,
        lon: state.long,
      },
    })
    .then((response) => {
      weather = response.data;
      console.log(weather);

      state.temp = Math.round(convertKtoF(weather.current.temp));
      applyTempFormat();
    })
    .catch((error) => {
      console.log("couldn't get the weather:", error.response);
    });
};

const formatTemp = () => {
  let temp = state.temp;
  let color = "red";
  let landscape = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
  if (temp > 80) {
    color = "red";
    landscape = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
  } else if (temp > 70) {
    color = "orange";
    landscape = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
  } else if (temp > 60) {
    color = "yellow";
    landscape = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
  } else if (temp > 50) {
    color = "green";
    landscape = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
  } else {
    color = "teal";
    landscape = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
  }

  const newLandscape = document.querySelector("#garden_landscape");
  newLandscape.textContent = landscape;
  return color;
};

const displaySky = (sky) => {
  let sky_image = "☀️☀️☀️☀️☀️☀️";
  if (sky == "sunny") {
    sky_image = "☀️☀️☀️☀️☀️☀️";
  } else if (sky == "partly_cloudy") {
    sky_image = "🌤 🌤 🌤 🌤 🌤 🌤";
  } else if (sky == "cloudy") {
    sky_image = "☁️☁️☁️☁️☁️☁️";
  } else if (sky == "rainy") {
    sky_image = "🌧️🌧️🌧️🌧️🌧️🌧️";
  }

  const newSky = document.querySelector("#garden_sky");
  newSky.textContent = sky_image;
};

const applyTempFormat = () => {
  const temperature = document.querySelector("#temperature");
  color = formatTemp();
  temperature.className = color;
  temperature.textContent = String(state.temp);
};

const increaseTemp = () => {
  state.temp += 1;
  applyTempFormat();
};

const decreaseTemp = () => {
  state.temp -= 1;
  applyTempFormat();
};

const cityNameChange = () => {
  const name = document.querySelector("#name_input_box");
  const city_name = document.querySelector("#city_name");
  state.city = name.value;
  city_name.textContent = state.city;
  findLatAndLong();
};

const resetCityName = () => {
  const name = document.querySelector("#name_input_box");
  const city_name = document.querySelector("#city_name");
  name.value = "Seattle";
  state.city = name.value;
  city_name.textContent = state.city;
  findLatAndLong();
};

const selectSky = () => {
  const sky_selection = document.querySelector("#sky_selection");
  displaySky(sky_selection.value);
};

const registerEventHandlers = () => {
  findLatAndLong();

  const upButton = document.querySelector("#upButton");
  upButton.addEventListener("click", increaseTemp);

  const downButton = document.querySelector("#downButton");
  downButton.addEventListener("click", decreaseTemp);

  const inputCityName = document.querySelector("#name_input_box");
  inputCityName.addEventListener("input", cityNameChange);

  const resetNameButton = document.querySelector("#city_name_reset");
  resetNameButton.addEventListener("click", resetCityName);

  const skySelector = document.querySelector("#sky_selection");
  skySelector.addEventListener("change", selectSky);
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);
