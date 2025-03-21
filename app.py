from flask import Flask, render_template, request, jsonify
import requests
from dotenv import load_dotenv
import os
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut
import logging

# Setup logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv(override=True)

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'allinyourhand')

# OpenWeatherMap API configuration
OPENWEATHER_API_KEY = os.getenv('OPENWEATHER_API_KEY')
OPENWEATHER_BASE_URL = "http://api.openweathermap.org/data/2.5"

# Log the API key (first few characters only for security)
if OPENWEATHER_API_KEY:
    logger.debug(f"OpenWeather API Key loaded: {OPENWEATHER_API_KEY[:8]}...")
else:
    logger.error("OpenWeather API Key not found in environment variables!")

def get_coordinates(city):
    try:
        geolocator = Nominatim(user_agent="weather_app")
        location = geolocator.geocode(city)
        return location.latitude, location.longitude
    except GeocoderTimedOut:
        return None, None

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/weather', methods=['POST'])
def get_weather():
    city = request.form.get('city')
    if not city:
        return jsonify({'error': 'City name is required'}), 400

    lat, lon = get_coordinates(city)
    if not lat or not lon:
        return jsonify({'error': 'City not found'}), 404

    # Get weather data from OpenWeatherMap API
    weather_url = f"{OPENWEATHER_BASE_URL}/weather"
    params = {
        'lat': lat,
        'lon': lon,
        'appid': OPENWEATHER_API_KEY,
        'units': 'metric'
    }

    try:
        logger.debug(f"Making request to OpenWeather API with params: {params}")
        response = requests.get(weather_url, params=params)
        response.raise_for_status()
        weather_data = response.json()
        
        return jsonify({
            'temperature': weather_data['main']['temp'],
            'humidity': weather_data['main']['humidity'],
            'description': weather_data['weather'][0]['description'],
            'wind_speed': weather_data['wind']['speed'],
            'city': city,
            'coordinates': {'lat': lat, 'lon': lon}
        })
    except requests.RequestException as e:
        logger.error(f"Error fetching weather data: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True) 