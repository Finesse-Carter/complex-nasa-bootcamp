let displayWeather = (weather) => {
  return `
  <li>
  <h1 id="name">${weather.name}</h1>
  <h3 id="country">${weather.sys.country}</h3>
  <h2 id="main">${Math.floor(weather.main.temp * 9/5-459.67)}</h2>
  <h2 id="weather">${weather.weather[0].description}</h2>
  </li>`
}
fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`)
  .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
  .then(nasaLocations => {
    console.log(nasaLocations);
    for(let i=0; i < nasaLocations.length; i++){
      let nasaLocation = nasaLocations[i]
      let lat = nasaLocation.location.latitude
      let lon = nasaLocation.location.longitude
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c83c75cbafcd4bc9184f90379531d26c`)
        // api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=
        .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
        .then(response => {
          document.querySelector('ul').innerHTML+=displayWeather(response)

          // document.getElementById('main').textContent = Math.floor(response.main.temp * 9/5-459.67)
          // document.getElementById('name').textContent = response.name
          // document.getElementById('country').textContent= response.sys.country
          // document.getElementById('weather').textContent= response.weather[0].description
        })
        .catch(err => {
          console.log(`error ${err}`)
          alert("sorry, there are no results for your search")
        })
      }
    });
