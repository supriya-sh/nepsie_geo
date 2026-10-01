let pointer_map;
let weather_now;
function toggleMenu() { //to open side bar when hamburger is clicked
    document.getElementById("opt").classList.toggle("show");
}
//all the loading of map is done on the basis of the leaflet's loading steps (not direct codings done) 
//from line 7 to 20 
const nepalBounds = [
    [26.347, 80.058], // Southwest boundary
    [30.447, 88.201]  // Northeast boundary
];
const map = L.map('map', {
    maxBounds: nepalBounds,
    maxBoundsViscosity: 1.0, // Prevents panning outside Nepal
    minZoom: 6.8,
    maxZoom: 9
}).setView([28.3949, 84.1240], 6.5); // Centered on Nepal at zoom level 7
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);
map.on('click', onMapClick);

//to change background according to weather
function backgrounds(degrees){
    if (degrees<5){
        document.body.className="cold";
    }
    else if(degrees>=5 && degrees<=22){
        document.body.className="pleasant";
    }
    else if(degrees>=23 && degrees<=30){
        document.body.className="warm";
    }
    else{
        document.body.className="hot";
    }
}

function getWeather(latitude, longitude){
    let url=`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    fetch(url)
    .then(response=>response.json())
    .then(data=>{
        weather_now= data.current_weather.temperature;
        console.log("Weather: ", weather_now);
        document.getElementById("temps").innerHTML= weather_now;
        backgrounds(weather_now);
    })
    .catch(err=> console.error("ERROR ", err))


}

function fahreinheityy(){
    let weather_now_fahrein= (weather_now*1.8)+32;
    let rounded_off= weather_now_fahrein.toFixed(1);//to fixed gives 2 decimal places
    document.getElementById("temps").innerHTML = rounded_off;
    document.getElementById("fahdegrees").innerHTML= "°F";
    if (weather_now === undefined) 
        return;
}

//clicking the map
function onMapClick(e){   
    let lat=e.latlng.lat;
    let long=e.latlng.lng;
    if (pointer_map){ 
        map.removeLayer(pointer_map); 
    }

    pointer_map = L.marker([lat,long]).addTo(map);
    console.log("lat, long: ", lat,long);//tester
    getWeather(lat, long);
}

function celciusssy(){
    document.getElementById("temps").innerHTML =weather_now;
    document.getElementById("fahdegrees").innerHTML= "°C";
    if (weather_now === undefined) 
        return;
}