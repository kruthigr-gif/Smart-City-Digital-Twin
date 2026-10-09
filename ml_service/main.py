import json
import time
import pandas as pd
from sklearn.linear_model import LinearRegression
from confluent_kafka import Consumer, Producer, KafkaError

# Simplified ML Model to predict traffic congestion based on current count and speed
model = LinearRegression()
# Dummy training data (vehicle_count, avg_speed) -> Congestion percentage
X_train = pd.DataFrame({'vehicle_count': [10, 50, 100], 'avg_speed': [100, 50, 10]})
y_train = [0, 50, 100] 
model.fit(X_train, y_train)

KAFKA_BROKER = "localhost:9092"

consumer_conf = {
    'bootstrap.servers': KAFKA_BROKER,
    'group.id': 'ml-predictor-group',
    'auto.offset.reset': 'latest'
}

producer_conf = {
    'bootstrap.servers': KAFKA_BROKER
}

def predict_traffic():
    consumer = Consumer(consumer_conf)
    consumer.subscribe(['traffic'])
    producer = Producer(producer_conf)
    
    print("Starting ML Predictor Service...")
    while True:
        msg = consumer.poll(1.0)
        if msg is None:
            continue
        if msg.error():
            continue
            
        try:
            data = json.loads(msg.value().decode('utf-8'))
            if 'vehicle_count' in data and 'avg_speed' in data:
                # Predict congestion
                pred = model.predict(pd.DataFrame({'vehicle_count': [data['vehicle_count']], 'avg_speed': [data['avg_speed']]}))[0]
                prediction_data = {
                    'node_id': data['node_id'],
                    'lat': data['lat'],
                    'lon': data['lon'],
                    'prediction_type': 'congestion_pct',
                    'value': max(0, min(100, pred)),
                    'timestamp': time.time()
                }
                producer.produce('predictions', json.dumps(prediction_data).encode('utf-8'))
                producer.poll(0)
        except Exception as e:
            print(f"ML Error: {e}")

if __name__ == "__main__":
    predict_traffic()
