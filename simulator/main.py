import time
import json
import random
from confluent_kafka import Producer
from faker import Faker

fake = Faker()

# Kafka configuration
conf = {'bootstrap.servers': 'localhost:9092'}

def delivery_report(err, msg):
    if err is not None:
        pass
        # print(f"Message delivery failed: {err}")
    else:
        pass
        # print(f"Message delivered to {msg.topic()} [{msg.partition()}]")

def simulate_sensor_data():
    producer = Producer(**conf)
    topics = ['traffic', 'energy', 'environment']
    
    # Simulate data for 20 nodes in a virtual city
    nodes = [{'id': i, 'lat': float(fake.latitude()), 'lon': float(fake.longitude())} for i in range(1, 21)]

    while True:
        try:
            node = random.choice(nodes)
            topic = random.choice(topics)
            
            data = {
                'node_id': node['id'],
                'lat': node['lat'],
                'lon': node['lon'],
                'timestamp': time.time()
            }

            if topic == 'traffic':
                data['vehicle_count'] = random.randint(0, 100)
                data['avg_speed'] = random.uniform(0, 120) # km/h
            elif topic == 'energy':
                data['consumption_kw'] = random.uniform(10, 500)
            elif topic == 'environment':
                data['aqi'] = random.randint(10, 300) # Air Quality Index
                data['temperature'] = random.uniform(-10, 40)
            
            producer.produce(topic, json.dumps(data).encode('utf-8'), callback=delivery_report)
            producer.poll(0)
            time.sleep(0.5) # simulate frequency
        except Exception as e:
            print(f"Error: {e}")
            time.sleep(1)
        except KeyboardInterrupt:
            break

    producer.flush()

if __name__ == '__main__':
    print("Starting smart city sensor simulator...")
    simulate_sensor_data()
