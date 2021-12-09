const key = "b47da13d814efafbe8799bd565ab5f31";
const formEl = document.querySelector('form');
const details = document.querySelector('.details');

formEL.addEventListener('submit', (e) =>{
    e.preventDefault();
    details.innerHtml = "<h1> Loading...<h1>";
    const location = e.target.location.value;
    weatherApp(location);
    formEl.reset();
});

function weatherAPP(location){
    const result = await fetchAPI (location);
    generateHTML(result);
}

function fetchAPI(location){
    const baseURL = "https://cors-anywhere.herokuapp.com/http://api.weatherstack.com/current?access_key=" + key + "&query=" + location;
};

const res = await fetch(baseURL, {
    headers: {
      "x-requested-with": "text/plain"
    }
  });
  const data = await res.json();
  console.log(data);
  return data;
}

function generateHTML(data) {
  const html = `
  <h1 class="temp">${data.current.temperature}°c</h1>
  <h1 class="status">${data.current.weather_descriptions
    .map((item) => item)
    .join(" ")}</h1>
  <div class="more-info">
    <p>Humidity- ${data.current.humidity}%</p>
    <p>Wind Speed- ${data.current.wind_speed}km/h</p>
    <p>Wind Dir- ${data.current.wind_dir}</p>
    <p>Pressure- ${data.current.pressure}MB</p>
  </div>
  <div class="query">${data.request.query}</div>
  `;
  details.innerHTML = html;
}
