const { useState, useEffect, useRef } = React;

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [sensorData, setSensorData] = useState({});
  const [predictions, setPredictions] = useState({});
  const [emergencies, setEmergencies] = useState([]);
  
  const wsRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws');
    wsRef.current = ws;
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.topic === 'predictions') {
          setPredictions(prev => ({ ...prev, [data.node_id]: data }));
        } else if (data.topic === 'emergency') {
          setEmergencies(prev => [data, ...prev].slice(0, 50));
        } else {
          setSensorData(prev => ({ ...prev, [data.node_id]: data }));
        }
      } catch (err) {}
    };
    
    return () => ws.close();
  }, []);

  const sendWsMessage = (msg) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'home': return <DashboardModule sensorData={sensorData} emergencies={emergencies} predictions={predictions} />;
      case 'map': return <MapModule sensorData={sensorData} predictions={predictions} emergencies={emergencies} sendWsMessage={sendWsMessage} />;
      case 'traffic': return <TrafficModule sensorData={sensorData} predictions={predictions} />;
      case 'pollution': return <PollutionModule sensorData={sensorData} />;
      case 'energy': return <EnergyModule sensorData={sensorData} />;
      case 'emergency': return <EmergencyModule emergencies={emergencies} />;
      case 'admin': return <AdminModule sendWsMessage={sendWsMessage} />;
      default: return <DashboardModule sensorData={sensorData} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-900 text-slate-200 overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-y-auto bg-slate-900 relative">
        {renderContent()}
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
