# Weather Visualization System

An interactive weather visualization application featuring a modern, futuristic interface with real-time weather data and satellite imagery integration.

## Features

- Interactive 3D map visualization
- Real-time weather data search by city
- Futuristic minimalist design
- OpenWeatherMap API integration
- Responsive design
- Multiple map views (Default, Satellite, Terrain)
- Custom location markers with animations
- Detailed weather information display

## Requirements

- Python 3.8+
- Flask
- Geopy
- OpenWeatherMap API key
- Internet connection for API access

## Installation

1. Clone this repository

   ```bash
   git clone https://github.com/repimarisko/Project-Alpha.git
   cd Project-Alpha
   ```

2. Create and activate virtual environment

   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   venv\Scripts\activate     # Windows
   ```

3. Install dependencies

   ```bash
   pip install -r requirements.txt
   ```

4. Copy `.env.example` to `.env` and fill in your credentials:

   ```
   SECRET_KEY=your-secret-key-here
   OPENWEATHER_API_KEY=your-openweather-api-key-here
   ```

5. Run the application
   ```bash
   python app.py
   ```

## Usage

1. Open your browser and navigate to `http://localhost:5000`
2. Enter a city name in the search box
3. Click "Search" to view weather data
4. Interact with the map:
   - Left click + drag: Rotate
   - Right click + drag: Pan
   - Scroll: Zoom
   - Use buttons to toggle between map views

## Project Structure

```
.
├── app.py              # Main Flask application
├── requirements.txt    # Python dependencies
├── .env               # Environment configuration
├── static/
│   ├── css/
│   │   └── style.css  # CSS styling
│   ├── js/
│   │   └── main.js    # JavaScript for interactions
│   └── logo/          # Logo and assets
└── templates/
    └── index.html     # HTML template
```

## API Integration

This project uses the following APIs:

- OpenWeatherMap API for weather data
- OpenStreetMap for base map layer
- ESRI for satellite imagery
- OpenTopoMap for terrain visualization

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenWeatherMap for weather data API
- OpenStreetMap contributors
- ESRI for satellite imagery
- OpenTopoMap contributors
