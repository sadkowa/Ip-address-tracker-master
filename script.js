//  pobranie danych z HTML  

const form = document.querySelector(".form");
const input = document.querySelector(".form__input");
const ipInfo = document.querySelector('.info__data-ip')
const locationInfo = document.querySelector('.info__data-location')
const timezoneInfo = document.querySelector('.info__data-timezone')
const ispInfo = document.querySelector('.info__data-isp')
let lat;
let lng


// początkowe renderowanie mapy 

const map = L.map('map').setView([51.5, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// funkcja obsługująca wysłanie formularza

const getUserData = (event) => {

    event.preventDefault();

    const ipNumber = event.target[0].value;
    logJSONData(ipNumber);

    // reset input
    input.value = ""
}


// funkcja, która pobiera dane z https://geo.ipify.org/

async function logJSONData(number) {
    const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_mI14Wdw4daxVGSMnVTikmowrPUvuD&ipAddress=${number}`);
    const jsonData = await response.json();

    updateInfo(jsonData)
}


// funkcja, która aktualizuje dane w przeglądarce

const updateInfo = (data) => {
    const ip = data.ip;
    const city = data.location.city;
    const country = data.location.country;
    const postalCode = data.location.postalCode;
    const timezone = "UTC " + data.location.timezone;
    const isp = data.isp;
    lat = data.location.lat;
    lng = data.location.lng;

    ipInfo.innerHTML = ip;
    locationInfo.innerHTML = `${city}, ${country}, ${postalCode}`;
    timezoneInfo.innerHTML = timezone;
    ispInfo.innerHTML = isp;

    mapRender(lat, lng)
}


// funkcja, która zmienia położenie na mapie i dodaje znacznik po wczytaniu danych z Api

const mapRender = (lat, lng) => {

    map.setView([`${lat}`, `${lng}`], 13);

    var myIcon = L.icon({
        iconUrl: './images/icon-location.svg',
        iconSize: [30, 40],
    });

    L.marker([`${lat}`, `${lng}`], { icon: myIcon }).addTo(map)
}


// obsługa formularza

form.addEventListener('submit', getUserData)










