//  pobranie danych z HTML  

const form = document.querySelector(".form");
const input = document.querySelector(".form__input");
const ipInfo = document.querySelector('.info__data-ip')
const locationInfo = document.querySelector('.info__data-location')
const timezoneInfo = document.querySelector('.info__data-timezone')
const ispInfo = document.querySelector('.info__data-isp')
let lat;
let lng
let map


// pobranie user IP oraz przekazanie IP do funkcji logJSONData w celu renderowania mapy

const text = (url) => {
    return fetch(url).then(res => res.text());
}

text('https://www.cloudflare.com/cdn-cgi/trace').then(data => {
    let ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/
    let ip = data.match(ipRegex)[0];

    logJSONData(ip)
});


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


// funkcja, która renderuje mapę

const mapRender = (lat, lng) => {
    let myIcon = L.icon({
        iconUrl: './images/icon-location.svg',
        iconSize: [30, 40],
    });

    if (!map) {
        map = L.map('map').setView([`${lat}`, `${lng}`], 13);
    } else {
        map.setView([`${lat}`, `${lng}`], 13);
    }

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([`${lat}`, `${lng}`], { icon: myIcon }).addTo(map)
}


// obsługa formularza

form.addEventListener('submit', getUserData)










