// Initialize map
let map;
let currentMarker = null;
let satelliteLayer = null;
let terrainLayer = null;

function initMap() {
    // Initialize the map
    map = L.map('map').setView([35.6762, 139.6503], 6); // Center on Japan (JAXA headquarters)

    // Add default tile layer (dark theme)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(map);

    // Add satellite layer (hidden by default)
    satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; <a href="https://www.esri.com/">Esri</a>'
    });

    // Add terrain layer (hidden by default)
    terrainLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a> contributors'
    });

    // Add click event to map
    map.on('click', onMapClick);

    // Custom marker icon
    const defaultIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div class="marker-pin"></div>',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });
    L.Marker.prototype.options.icon = defaultIcon;
}

function onMapClick(e) {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    
    // Remove existing marker
    if (currentMarker) {
        map.removeLayer(currentMarker);
    }

    // Add new marker
    currentMarker = L.marker([lat, lng]).addTo(map);
    
    // Get city name from coordinates
    getCityFromCoordinates(lat, lng);
}

function getCityFromCoordinates(lat, lng) {
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
        .then(response => response.json())
        .then(data => {
            const city = data.address.city || data.address.town || data.address.village || data.address.state;
            if (city) {
                document.getElementById('city').value = city;
                getWeather(city);
            }
        })
        .catch(error => console.error('Error:', error));
}

// Weather form handling
document.getElementById('weatherForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const cityInput = document.getElementById('city');
    const city = cityInput.value;

    if (city) {
        getWeather(city);
    }
});

async function getWeather(city) {
    try {
        const response = await fetch('/weather', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `city=${encodeURIComponent(city)}`
        });

        const data = await response.json();
        
        if (response.ok) {
            displayWeatherInfo(data);
            updateMapMarker(data.coordinates);
        } else {
            alert(data.error || 'Error fetching weather data');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error fetching weather data');
    }
}

function displayWeatherInfo(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.style.display = 'block';
    
    weatherInfo.querySelector('.city-name').textContent = data.city;
    weatherInfo.querySelector('.temperature .value').textContent = `${data.temperature}°C`;
    weatherInfo.querySelector('.description .value').textContent = data.description;
    weatherInfo.querySelector('.humidity .value').textContent = `${data.humidity}%`;
    weatherInfo.querySelector('.wind-speed .value').textContent = `${data.wind_speed} m/s`;
}

function updateMapMarker(coordinates) {
    // Remove existing marker
    if (currentMarker) {
        map.removeLayer(currentMarker);
    }

    // Add new marker
    currentMarker = L.marker([coordinates.lat, coordinates.lon]).addTo(map);
    
    // Center map on marker with smooth animation
    map.flyTo([coordinates.lat, coordinates.lon], 10, {
        duration: 1.5,
        easeLinearity: 0.25
    });
}

// Map layer controls
document.getElementById('toggleSatellite').addEventListener('click', () => {
    if (satelliteLayer) {
        if (map.hasLayer(satelliteLayer)) {
            map.removeLayer(satelliteLayer);
        } else {
            map.addLayer(satelliteLayer);
            if (map.hasLayer(terrainLayer)) {
                map.removeLayer(terrainLayer);
            }
        }
    }
});

document.getElementById('toggleTerrain').addEventListener('click', () => {
    if (terrainLayer) {
        if (map.hasLayer(terrainLayer)) {
            map.removeLayer(terrainLayer);
        } else {
            map.addLayer(terrainLayer);
            if (map.hasLayer(satelliteLayer)) {
                map.removeLayer(satelliteLayer);
            }
        }
    }
});

// Initialize the application
initMap(); 