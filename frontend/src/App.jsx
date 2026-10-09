import { useState, useEffect } from 'react'
import CityMap from './components/CityMap'
import Dashboard from './components/Dashboard'
import { Activity, Car, Zap, Wind } from 'lucide-react'

function App() {
  const [sensorData, setSensorData] = useState({})
  const [predictions, setPredictions] = useState({})

  useEffect(() => {
    // Attempt to connect to the backend websocket
    const ws = new WebSocket('ws://localhost:8000/ws')
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        if (data.topic === 'predictions') {
          setPredictions(prev => ({ ...prev, [data.node_id]: data }))
        } else {
          setSensorData(prev => ({ ...prev, [data.node_id]: data }))
        }
      } catch (err) {
        console.error("Failed to parse websocket message", err)
      }
    }

    return () => ws.close()
  }, [])

  return (
    <div className="flex h-screen w-full bg-dark-900 text-white font-sans">
      {/* Sidebar Dashboard */}
      <div className="w-96 flex-shrink-0 z-10 glass-panel m-4 flex flex-col">
        <div className="p-6 border-b border-dark-700/50">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-accent-purple">
            Smart City Twin
          </h1>
          <p className="text-gray-400 text-sm mt-1">Real-time S-Tier Intelligence</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <Dashboard sensorData={sensorData} predictions={predictions} />
        </div>
      </div>

      {/* Main Map View */}
      <div className="flex-1 relative">
        <CityMap sensorData={sensorData} predictions={predictions} />
        
        {/* Overlay Stats */}
        <div className="absolute top-4 right-4 z-[1000] flex gap-4">
          <StatBadge icon={<Car size={18}/>} label="Active Vehicles" value={Object.values(sensorData).reduce((acc, curr) => acc + (curr.vehicle_count || 0), 0)} />
          <StatBadge icon={<Zap size={18}/>} label="Power Grid load" value={Math.round(Object.values(sensorData).reduce((acc, curr) => acc + (curr.consumption_kw || 0), 0)) + ' kW'} />
        </div>
      </div>
    </div>
  )
}

function StatBadge({ icon, label, value }) {
  return (
    <div className="glass-panel px-4 py-2 flex items-center gap-3">
      <div className="text-accent-blue">{icon}</div>
      <div>
        <div className="text-xs text-gray-400 uppercase tracking-wider">{label}</div>
        <div className="font-semibold">{value}</div>
      </div>
    </div>
  )
}

export default App
