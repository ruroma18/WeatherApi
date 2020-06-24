let input = document.querySelector('#input_text');
let main = document.querySelector('#name');
let temp = document.querySelector('#temp');
let desc = document.querySelector('#desc');
let icon = document.querySelector('#icon')
let feels_like = document.querySelector('#feels_like');
let button= document.querySelector('#submit');

const key = "599c3044e9d97eec0d5a37fb5e023111";
const units = "metric";

// check geolocation support in browser
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    alert("Enter City in the field")
}

// ser user position
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

// show error with geolocation
function showError(error){
    notificationElement.innerHTML = alert(error.message);
}

// get weather from api by geolocation
function getWeather(latitude, longitude){
    fetch('http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&units='+units+'&appid='+key+'')
    .then(response => response.json())
    .then(data => {
      let tempValue = data['main']['temp'];
      let feels_likeValue = data['main']['feels_like'];
      let nameValue = data['name'];
      let descValue = data['weather'][0]['description'];
      let iconValue = data['weather'][0]['icon'];
    
      main.innerHTML = nameValue;
      feels_like.innerHTML = "Feels like: " + feels_likeValue + "<span>°С</span>";
      desc.innerHTML = descValue;
      temp.innerHTML = "Temp: " + tempValue + "<span>°С</span>";
      icon.innerHTML = `<img src="icons/${iconValue}.png"/>`;
    
    })
        .then(function(){
            FindWeather();
        });
}

//get weather from api by search
function FindWeather(){
    button.addEventListener('click', function(name){
      fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&units='+units+'&appid='+key+'')
      .then(response => response.json())
      .then(data => {
        let tempValue = data['main']['temp'];
        let feels_likeValue = data['main']['feels_like'];
        let nameValue = data['name'];
        let descValue = data['weather'][0]['description'];
        let iconValue = data['weather'][0]['icon'];
    
        main.innerHTML = nameValue;
        feels_like.innerHTML = "Feels like: " + feels_likeValue + "<span>°С</span>";
        desc.innerHTML = descValue;
        temp.innerHTML = "Temp: " + tempValue + "<span>°С</span>";
        icon.innerHTML = `<img src="icons/${iconValue}.png"/>`;
        input.value ="";
    
      })
    
      .catch(err => alert("Wrong city name!"));
      })
    
    }