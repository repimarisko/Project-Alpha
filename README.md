# JAXA Weather Visualization

Aplikasi visualisasi cuaca dengan tema futuristik terinspirasi dari JAXA (Japan Aerospace Exploration Agency). Aplikasi ini menampilkan data cuaca dalam bentuk visualisasi 3D globe interaktif.

## Fitur

- Visualisasi 3D globe bumi interaktif
- Pencarian data cuaca berdasarkan kota
- Tampilan futuristik dengan tema JAXA
- Integrasi dengan OpenWeatherMap API
- Responsive design

## Persyaratan

- Python 3.8+
- Flask
- OpenWeatherMap API key
- VPN (untuk akses data)

## Instalasi

1. Clone repositori ini
2. Buat virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   venv\Scripts\activate     # Windows
   ```
3. Install dependensi:
   ```bash
   pip install -r requirements.txt
   ```
4. Salin file `.env.example` ke `.env` dan isi dengan kredensial Anda:
   ```
   SECRET_KEY=your-secret-key-here
   OPENWEATHER_API_KEY=your-openweather-api-key-here
   ```
5. Jalankan aplikasi:
   ```bash
   python app.py
   ```

## Penggunaan

1. Buka browser dan akses `http://localhost:5000`
2. Masukkan nama kota di kotak pencarian
3. Klik tombol "Search" untuk melihat data cuaca
4. Gunakan mouse untuk mengontrol globe 3D:
   - Klik kiri + drag: Rotasi
   - Klik kanan + drag: Pan
   - Scroll: Zoom

## Struktur Proyek

```
.
├── app.py              # Aplikasi Flask utama
├── requirements.txt    # Dependensi Python
├── .env               # Konfigurasi sensitif
├── static/
│   ├── css/
│   │   └── style.css  # Styling CSS
│   ├── js/
│   │   └── main.js    # JavaScript untuk interaksi
│   └── images/        # Gambar dan aset
└── templates/
    └── index.html     # Template HTML
```

## Lisensi

MIT License
