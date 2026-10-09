<div align="center">

# 🌆 Smart City Control Center

### Real-Time IoT Simulation · Predictive Analytics · AI-Assisted City Monitoring

An interactive smart-city dashboard that brings simulated urban sensor data, geospatial visualization, machine-learning insights, and an AI operator assistant into one control center.

![Smart City Control Center dashboard](Screenshot%202026-10-09%20190325.png)

</div>

---

## 📌 Overview

**Smart City Control Center** is a demonstration project for monitoring a simulated urban environment. It combines a Python backend with an interactive map-based frontend to display traffic conditions, environmental readings, energy usage, pollution hotspots, and simulated emergencies.

The backend streams updates to the dashboard using WebSockets. Machine-learning components demonstrate traffic estimation and anomaly detection, while an optional Google Gemini integration lets operators ask questions through a chat interface.

> **Note:** This is a prototype using simulated data. It is intended for learning and demonstration, not for real-world emergency response or city operations.

## ✨ Features

- **Live sensor simulation** — generates sample traffic, environmental, energy, and emergency data.
- **Interactive city map** — visualizes sensor locations, roads, pollution hotspots, and points of interest.
- **Traffic visualization** — colour-coded road segments indicate predicted congestion levels.
- **Environmental monitoring** — highlights sensors with high Air Quality Index (AQI) readings.
- **Emergency markers** — emphasizes simulated incidents with prominent map markers and details.
- **Machine-learning experiments** — demonstrates regression and anomaly detection using scikit-learn.
- **AI operator assistant (optional)** — connects to the Gemini API for natural-language queries.
- **Local development** — the core demo can run locally without an external database.

## 🖥️ Dashboard Legend

| Map indicator | Meaning |
|---|---|
| 🔹 Blue marker | Normal sensor node |
| 🔴 Pulsing red marker | Simulated emergency |
| 🔶 Orange marker | Energy sensor |
| 🟣 Purple marker | Environmental sensor with AQI above 150 |
| 🟢 Green road line | Predicted congestion below 30% |
| 🟡 Yellow road line | Predicted congestion from 30% to below 70% |
| 🔴 Red road line | Predicted congestion of 70% or higher |
| 🟣 Purple circle | Simulated pollution hotspot |
| 🏥 🏫 🚓 | Points of interest such as hospitals, schools, and police stations |

## 🏗️ Architecture

```text
                 ┌─────────────────────────────┐
                 │       FastAPI Backend       │
                 │                             │
                 │  • Simulated IoT data       │
                 │  • ML predictions           │
                 │  • Anomaly scoring          │
                 │  • WebSocket endpoint       │
                 │  • Optional Gemini requests │
                 └──────────────┬──────────────┘
                                │
                          WebSocket / HTTP
                                │
                 ┌──────────────▼──────────────┐
                 │      React Dashboard        │
                 │                             │
                 │  • Leaflet interactive map  │
                 │  • Sensor and road overlays │
                 │  • Pollution/emergency view │
                 │  • Points of interest        │
                 │  • AI chat panel             │
                 └─────────────────────────────┘
```

### How it works

1. The backend generates synthetic sensor readings.
2. Machine-learning components calculate predictions or anomaly scores.
3. FastAPI streams updates to connected browsers through a WebSocket.
4. The frontend updates map markers, road overlays, and other visual elements.
5. If configured, operator questions are sent to the Gemini API and its response is displayed in the chat panel.

## 🧠 Machine-Learning Components

| Model | Purpose |
|---|---|
| `MLPRegressor` | Estimates traffic congestion from synthetic input data. This is a neural-network regressor, not an actual LSTM. |
| `GradientBoostingRegressor` | Supports regression experiments involving energy consumption and environmental trends. |
| `IsolationForest` | Identifies unusual sensor observations using anomaly scores. |

The models use demo data and run in memory. Their outputs are illustrative and should not be treated as validated real-world forecasts.

## 🧰 Tech Stack

| Area | Technologies |
|---|---|
| Backend | Python 3.11, FastAPI, Uvicorn, `asyncio`, WebSockets |
| Machine learning | scikit-learn |
| Frontend | React 18, JavaScript, HTML, CSS |
| Mapping | Leaflet, configured map tile provider |
| AI assistant | Google Gemini API (optional) |
| Async HTTP | `aiohttp` |

## 📂 Project Structure

The structure below follows the project overview. Adjust paths if your local repository differs.

```text
smart-city/
├── server.py
├── backend/
│   └── requirements.txt
└── frontend_v2/
    ├── index.html
    └── js/
        └── bundle.jsx
```

## 🚀 Getting Started

### Prerequisites

- Python 3.11 recommended
- `pip`
- A modern web browser
- Optional: Google Gemini API key for the AI assistant

### 1. Clone the repository

Replace `<YOUR_REPOSITORY_URL>` with your GitHub repository URL.

```bash
git clone <YOUR_REPOSITORY_URL>
cd smart-city
```

If you already have the project locally, open a terminal in the project folder and continue to the next step.

### 2. Create a virtual environment

**Windows PowerShell**

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

**macOS / Linux**

```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 3. Install dependencies

Run this command from the project root:

```bash
pip install -r backend/requirements.txt
```

If the requirements file is in a different location in your repository, use its actual path.

### 4. Configure the optional Gemini API

Set your API key as an environment variable. Never commit API keys to GitHub.

**Windows PowerShell**

```powershell
$env:GOOGLE_API_KEY = "YOUR_GEMINI_API_KEY"
```

**macOS / Linux**

```bash
export GOOGLE_API_KEY="YOUR_GEMINI_API_KEY"
```

This step is optional if you do not need the AI chat feature.

### 5. Run the application

From the project root:

```bash
python server.py
```

Open the local URL shown in your terminal. The project overview expects:

```text
http://localhost:8000
```

If that address does not load, check the server output and the frontend-serving configuration in `server.py`.

## 🛠️ Troubleshooting

- **Dashboard does not load:** Confirm that the backend started successfully and that you are using the correct local URL.
- **Map tiles are blank or blocked:** Check the browser developer tools and network requests. The configured tile provider may be unavailable or may reject requests.
- **Gemini assistant does not respond:** Confirm that `GOOGLE_API_KEY` is set in the same terminal session used to start the server, and check backend logs and API access.
- **Dependencies fail to install:** Verify the Python version and that your virtual environment is active.
- **Port 8000 is already in use:** Stop the other process or configure the app to use a different available port.

## 🔮 Future Improvements

- Connect real or replayed IoT data using MQTT or Kafka.
- Store historical sensor readings in PostgreSQL.
- Evaluate predictive models with held-out data and baseline comparisons.
- Add alert history, operator acknowledgements, and configurable thresholds.
- Add authentication, structured logging, and monitoring.
- Containerize the application for repeatable deployment.
- Ground AI responses in current sensor data and make uncertainty explicit.

## 🔐 Security and Limitations

- This project uses simulated data and is not a certified city-management or emergency-response system.
- Keep API keys and credentials out of source control.
- Follow the usage policy of the selected map tile provider.
- Validate and secure real sensor inputs before adapting this prototype for other environments.

## 🤝 Contributing

Suggestions and improvements are welcome. Create a branch, make a focused change, and open a pull request describing what changed and how it was tested.

## 📄 License

No license was specified in the project overview. Add a `LICENSE` file before presenting the repository as open source.
