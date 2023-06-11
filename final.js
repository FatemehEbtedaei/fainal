function formatDate(time) {
    let date = new Date(time);
    let hours = date.getHours();
    let minuts = date.getMinutes();
    if (hours < 10 ) {
        hours = `0${hours}`;
    }
     if (minuts < 10 ) {
        minuts = `0${minuts}`;
    }
    let days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday", 
        "Sunday"
     ];
        let day = days[date.getDay()];
        return `${day} ${hours}:${minuts}`;
}
function ShowWeather(response) {
document.querySelector("#city").innerHTML = response.data.city;
celciusTemperature = Math.round(response.data.temperature.current);
document.querySelector("#speed").innerHTML = Math.round(response.data.wind.speed);
document.querySelector("#humidity").innerHTML = Math.round(response.data.temperature.humidity);
document.querySelector("#description").innerHTML = response.data.condition.description;
document.querySelector("#emoji").setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
document.querySelector("#date").innerHTML = formatDate(response.data.time * 1000);
}
 function search(city) {
let apiKey = "fa8f3441ct0o1a377f049a0773e40c7b";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(ShowWeather);
}

function searchWeather(event) {
    event.preventDefault();
    let cityElement = document.querySelector("#cityInput");
    search(cityElement.value);
}


function showCelcius(event){
    event.preventDefault();
    document.querySelector("#temperature").innerHTML = celciusTemperature;
}
function showFarenheit(event){
    event.preventDefault();
    let farenheitTemperature = (celciusTemperature * 9 ) / 5 + 32 ;
    document.querySelector("#temperature").innerHTML = Math.round(farenheitTemperature);
}

let celciusTemperature = null;
document.querySelector("#searchForm").addEventListener("submit", searchWeather);
document.querySelector("#farenheit").addEventListener("click", showFarenheit);
document.querySelector("#celcius").addEventListener("click", showCelcius);
search("Seoul");
