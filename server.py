import asyncio
import json
import os
import time
import random
import pandas as pd
from sklearn.neural_network import MLPRegressor
from sklearn.ensemble import GradientBoostingRegressor, IsolationForest
from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse
from faker import Faker

fake = Faker()

# ML Enterprise Pipeline Setup
# 1. Traffic "LSTM" Model (Simulated via Deep MLP for execution constraints)
lstm_model = MLPRegressor(hidden_layer_sizes=(64, 32), max_iter=500)
X_traffic = pd.DataFrame({'vehicle_count': [10, 50, 100], 'avg_speed': [100, 50, 10]})
y_traffic = [0, 50, 100] 
lstm_model.fit(X_traffic.values, y_traffic)

# 2. Energy "XGBoost" Model (Simulated via Gradient Boosting)
xgb_model = GradientBoostingRegressor(n_estimators=100)
X_energy = pd.DataFrame({'temp': [20, 30, 40], 'time_of_day': [8, 14, 20]})
y_energy = [200, 400, 300]
xgb_model.fit(X_energy.values, y_energy)

# 3. Emergency Anomaly Detection
iso_forest = IsolationForest(contamination=0.05, random_state=42)
# Fit on normal traffic/energy states
X_normal = pd.DataFrame({'metric1': [10, 12, 11, 10, 9, 10], 'metric2': [50, 51, 49, 50, 52, 50]})
iso_forest.fit(X_normal.values)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

data_queue = asyncio.Queue()
broadcast_queue = asyncio.Queue()
clients = set()

base_lat = 40.7128
base_lon = -74.0060
manual_emergency = False
traffic_multiplier = 1.0

# SIMULATOR TASK
async def simulate_data():
    global base_lat, base_lon, manual_emergency, traffic_multiplier
    topics = ['traffic', 'energy', 'environment', 'emergency']
    
    print("Simulator started...")
    while True:
        node_id = random.randint(1, 100)
        node = {
            'id': node_id,
            'lat': base_lat + (random.random() - 0.5) * 0.1,
            'lon': base_lon + (random.random() - 0.5) * 0.1
        }
        
        # Stable topic per node id
        topic = topics[node_id % len(topics)]
        data = {
            'node_id': node['id'],
            'lat': node['lat'],
            'lon': node['lon'],
            'timestamp': time.time(),
            'topic': topic,
            'vehicle_count': int(random.randint(0, 100) * traffic_multiplier),
            'avg_speed': max(0, random.uniform(0, 120) - (traffic_multiplier - 1)*20),
            'aqi': random.randint(10, 200),
            'consumption_kw': random.uniform(10, 500)
        }

        if topic == 'environment':
            data['pm25'] = random.uniform(5, 150)
            data['pm10'] = random.uniform(10, 200)
            data['co2'] = random.uniform(300, 600)
            data['noise'] = random.uniform(40, 100)
            data['temperature'] = random.uniform(-10, 40)
        elif topic == 'emergency':
            if manual_emergency:
                data['type'] = random.choice(['Traffic Accident', 'Fire', 'Flood', 'Suspicious Crowding'])
                data['severity'] = random.choice(['High', 'Critical'])
                manual_emergency = False
            else:
                # Use Isolation Forest on random noise to occasionally trigger
                anomaly_score = iso_forest.predict([[random.uniform(0, 20), random.uniform(0, 100)]])[0]
                if anomaly_score == -1 and random.random() < 0.1: # Threshold to reduce spam
                    data['type'] = random.choice(['Sensor Failure', 'Traffic Accident', 'Power Grid Anomaly'])
                    data['severity'] = random.choice(['Low', 'Medium', 'High'])
                else:
                    continue

        await data_queue.put(data)
        await broadcast_queue.put(data)
        await asyncio.sleep(0.3)

async def ml_predictor():
    while True:
        data = await data_queue.get()
        if data['topic'] == 'traffic' and 'vehicle_count' in data and 'avg_speed' in data:
            try:
                pred = lstm_model.predict([[data['vehicle_count'], data['avg_speed']]])[0]
                
                prediction_data = {
                    'node_id': data['node_id'],
                    'lat': data['lat'],
                    'lon': data['lon'],
                    'prediction_type': 'congestion_pct',
                    'value': max(0, min(100, pred)),
                    'timestamp': time.time(),
                    'topic': 'predictions'
                }
                await broadcast_queue.put(prediction_data)
            except Exception as e:
                print("Error predicting traffic:", e)
        
        elif data['topic'] == 'energy' and 'consumption_kw' in data:
            try:
                # Use Gradient Boosting
                pred = xgb_model.predict([[25, 12]])[0]
                # We can broadcast energy predictions if needed
            except Exception as e:
                print("Error predicting energy:", e)

async def broadcaster():
    while True:
        data = await broadcast_queue.get()
        for client in list(clients):
            try:
                await client.send_json(data)
            except:
                clients.remove(client)

from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    asyncio.create_task(simulate_data())
    asyncio.create_task(ml_predictor())
    asyncio.create_task(broadcaster())
    yield

app.router.lifespan_context = lifespan

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    clients.add(websocket)
    global base_lat, base_lon, manual_emergency, traffic_multiplier
    try:
        while True:
            data = await websocket.receive_text()
            try:
                msg = json.loads(data)
                if msg.get('action') == 'set_location':
                    base_lat = float(msg['lat'])
                    base_lon = float(msg['lon'])
                elif msg.get('action') == 'trigger_emergency':
                    manual_emergency = True
                elif msg.get('action') == 'set_traffic':
                    traffic_multiplier = float(msg['multiplier'])
                elif msg.get('action') == 'chat_query':
                    query = msg.get('query', '')
                    await websocket.send_json({'topic': 'chat_response', 'message': 'Thinking...'})
                    
                    # Call Gemini API
                    api_key = os.getenv("GOOGLE_API_KEY")
                    if not api_key:
                        await websocket.send_json({
                            'topic': 'chat_response',
                            'message': 'Gemini API key is not configured. Set GOOGLE_API_KEY and restart the server.'
                        })
                        continue
                    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
                    full_prompt = f"You are the AI operator of a Smart City Control Center. Respond concisely and technically to the operator query: {query}"
                    payload = {"contents": [{"parts": [{"text": full_prompt}]}]}
                    
                    try:
                        import aiohttp
                        async with aiohttp.ClientSession() as session:
                            async with session.post(url, json=payload) as resp:
                                if resp.status == 200:
                                    resp_data = await resp.json()
                                    response = resp_data["candidates"][0]["content"]["parts"][0]["text"]
                                else:
                                    response = f"API Error {resp.status}: {await resp.text()}"
                    except Exception as e:
                        response = f"Connection error: {e}"
                        
                    await websocket.send_json({'topic': 'chat_response', 'message': response})
            except:
                pass
    except:
        clients.remove(websocket)

# Serve static frontend files
app.mount("/frontend", StaticFiles(directory="frontend_v2", html=True), name="frontend")

@app.get("/")
def redirect_to_frontend():
    return RedirectResponse(url="/frontend/")

if __name__ == "__main__":
    import uvicorn
    print("Starting Smart City Backend on http://localhost:8000")
    uvicorn.run(app, host="0.0.0.0", port=8000)
