import asyncio
import json
from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from confluent_kafka import Consumer, KafkaError

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

KAFKA_BROKER = "localhost:9092"
TOPICS = ['traffic', 'energy', 'environment', 'predictions']

conf = {
    'bootstrap.servers': KAFKA_BROKER,
    'group.id': 'fastapi-websocket-group',
    'auto.offset.reset': 'latest'
}

clients = set()

async def consume_kafka():
    consumer = Consumer(conf)
    consumer.subscribe(TOPICS)
    
    while True:
        msg = consumer.poll(0.1)
        if msg is None:
            await asyncio.sleep(0.1)
            continue
        if msg.error():
            if msg.error().code() == KafkaError._PARTITION_EOF:
                continue
            else:
                print(msg.error())
                break
        
        try:
            data = json.loads(msg.value().decode('utf-8'))
            data['topic'] = msg.topic()
            disconnected = set()
            for client in clients:
                try:
                    await client.send_json(data)
                except Exception:
                    disconnected.add(client)
            for d in disconnected:
                clients.remove(d)
        except Exception as e:
            print(f"Error processing message: {e}")
            
    consumer.close()

@app.on_event("startup")
async def startup_event():
    # Use create_task to run the background consumer
    asyncio.create_task(consume_kafka())

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    clients.add(websocket)
    try:
        while True:
            await websocket.receive_text()
    except:
        clients.remove(websocket)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
